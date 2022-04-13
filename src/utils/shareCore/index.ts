/**
 * @author Wang Lifu, Hong Shiwen
 * @description 社媒分享核心功能逻辑
 */

// type
import {
  SocialType,
  SocialUtmParams,
  SharePageAttribute,
  ShareParams,
  ShareUrlExtend
} from './types'

/**
 * 格式化分享链接
 * @param {SocialType} socialType 社媒名称
 * @param {string} link 分享链接
 * @param {SocialUtmParams} utmParams 来源参数
 * @param {SharePageAttribute} seoAttr 构建 SEO 页面所需要的数据
 * @returns 分享链接
 */
function getShareUrl (socialType: SocialType, link: string, urlExtend: ShareUrlExtend, utmParams: Partial<SocialUtmParams>, seoAttr?: SharePageAttribute): string {
  if (!link) {
    return ''
  }

  // 如果分享的链接以 // 开头，要补上协议头
  const targetUrl: URL = new URL(link.substr(0, 4) !== 'http' ? `https:${link}` : link)
  const urlSearchParams: URLSearchParams = new URLSearchParams(targetUrl.search || '')

  // 添加额外的链接查询项（直接覆盖之前值）
  if (!!urlExtend && typeof urlExtend === 'object' && !!Object.keys(urlExtend).length) {
    // 添加用户传入的自定义扩展查询
    Object.keys(urlExtend).forEach((queryKey: string) => {
      urlSearchParams.set(queryKey, urlExtend[queryKey])
    })
  }

  // 配置分享社群媒体 utm 数据（默认数据）
  urlSearchParams.set('utm_channel', 'social')
  urlSearchParams.set('utm_source', socialType)
  urlSearchParams.set('utm_medium', socialType)

  // 复制链接没有来源参数
  if (socialType === 'clipboard') {
    urlSearchParams.delete('utm_source')
  }

  // 添加 utm 扩展查询项（传入数据，直接覆盖上方设定的默认值）
  if (!!utmParams && typeof utmParams === 'object' && !!Object.keys(utmParams).length) {
    // 添加用户传入的 utm 扩展查询
    Object.keys(utmParams).forEach((utmKey: string) => {
      urlSearchParams.set(utmKey.replace(/([A-Z])/g, '_$1').toLowerCase(), utmParams[utmKey])
    })
  }

  // 最终分享链接
  const shareUrl = `${targetUrl.origin}${targetUrl.pathname}?${urlSearchParams.toString()}`

  // 判断是否需要构建 SEO 跳转页面
  if (!!seoAttr && typeof seoAttr === 'object' && !!Object.keys(seoAttr).length) {
    // 取 PC 服务做分享
    const buySitePC = seoAttr.buySite || ''
    const buySite = `${buySitePC.substr(0, 4) !== 'http' ? `https:${buySitePC}` : buySitePC}`

    const searchParams: URLSearchParams = new URLSearchParams('')

    !!seoAttr.title && searchParams.set('title', seoAttr.title)
    !!seoAttr.image && searchParams.set('image', seoAttr.image)
    !!seoAttr.desc && searchParams.set('desc', seoAttr.desc)
    !!shareUrl && searchParams.set('link', shareUrl)

    return `${buySite}/static/toshare?${searchParams.toString()}`
  } else {
    // 直接返回要分享的路径
    return shareUrl
  }
}

/**
 * 替换链接模板中的数据
 * @param {string} template 链接模板
 * @param {object} props 链接参数
 * @returns 最终跳转链接
 */
function getSocialOpenLink<T> (template: string, props: ShareParams<T>): string {
  if (!template) {
    return ''
  }

  const shareUrl: URL = new URL(template)
  const searchParams: URLSearchParams = new URLSearchParams(shareUrl.search || '')

  // 记录未传入的参数
  let uselessParams: string[] = []

  searchParams.forEach(
    (val: string, key: string, self: URLSearchParams) => {
      // 拆分子项 key，兼容 text={{text}}+{{url}} 等特殊模板
      const currPropsKey: string[] = val.replace(/{{(\w+)}}/g, '$1').split(' ')
      const currPropsVal = currPropsKey.map((propKey: string) => props[`${propKey}`] || '')

      // 拼接子项 key 值，去除空属性
      const result = currPropsVal.filter((el: string) => !!el).join(' ')

      // 如果改参数有值，则赋值，没有的话进行标记，之后在循环外统一进行删除
      if (result) {
        self.set(key, result)
      } else {
        uselessParams = [ ...uselessParams, key ]
      }
    },
  )

  // 删除模板中无用的参数
  uselessParams.forEach((key: string) => searchParams.delete(key))

  return `${shareUrl.origin}${shareUrl.pathname}?${searchParams.toString()}`
}

/**
 * 分享弹窗逻辑
 * @param { SocialType } socialType 分享平台
 * @param { ShareParams<SocialType> } shareParams 分享数据
 */
function openShareWindow<T extends SocialType> (socialType: T, linkTemplate: string, shareParams: ShareParams<T>): void {
  // 将格式化后的 url 进行替换
  const shareData = Object.assign({}, shareParams, { url: getShareUrl(socialType, shareParams.url, shareParams.urlExtend || {}, shareParams.utmParams || {}, shareParams.seoAttr) })

  // 定义弹窗位置
  const popWidth = 600
  const popHeight = 480
  const left = window.innerWidth / 2 - popWidth / 2 + window.screenX
  const top = window.innerHeight / 2 - popHeight / 2 + window.screenY

  // 打开弹窗
  const newWindow: Window | null = window.open(
    getSocialOpenLink<T>(linkTemplate, shareData),
    `${socialType}-window`,
    `width=${popWidth}, height=${popHeight}, top=${top}, left=${left}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
  )

  // 弹窗前置显示
  if (newWindow && newWindow.focus) {
    newWindow.focus()
  }
}

/**
 * facebook 分享
 * @param {ShareParamsFacebook} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareFacebook (
  shareData: Omit<ShareParams<'facebook'>, 'appId'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'facebook'

  typeof afterShareCallback === 'function' && afterShareCallback()

  // 从页面中获取当前站点的 AppId
  const appId = document?.querySelector('meta[property=\'fb:app_id\']')?.getAttribute('content') || ''
  const redirectUri = shareData.redirectUri || ''

  openShareWindow(
    TYPE,
    appId
      ? 'https://www.facebook.com/dialog/share?app_id={{appId}}&href={{url}}&quote={{text}}&redirect_uri={{redirectUri}}&display={{display}}&hashtag={{hashtag}}'
      : 'https://www.facebook.com/sharer.php?u={{url}}&quote={{text}}&redirect_uri={{redirectUri}}&display={{display}}&hashtag={{hashtag}}',
    {
      appId      : appId,
      url        : shareData.url,
      text       : shareData.text,
      hashtag    : shareData.hashtag ? `#${shareData.hashtag}` : '',
      display    : shareData.display || (redirectUri ? 'page' : 'popup'), // 如果有重定向页面，默认使用 page 的形式展示，其他则是 popup 弹窗
      redirectUri: (!!redirectUri && redirectUri.substr(0, 4) !== 'http') ? `https:${redirectUri}` : redirectUri,
      utmParams  : shareData.utmParams,
      urlExtend  : shareData.urlExtend,
      seoAttr    : shareData.seoAttr,
    },
  )
}

/**
 * twitter 分享
 * @param {ShareParamsTwitter} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareTwitter (
  shareData: ShareParams<'twitter'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'twitter'

  typeof afterShareCallback === 'function' && afterShareCallback()

  openShareWindow(
    TYPE,
    'https://twitter.com/intent/tweet?url={{url}}&text={{text}}&hashtags={{hashtag}}',
    {
      url      : shareData.url,
      text     : shareData.text,
      hashtag  : shareData.hashtag,
      utmParams: shareData.utmParams,
      urlExtend: shareData.urlExtend,
      seoAttr  : shareData.seoAttr,
    },
  )
}

/**
 * vk 分享
 * @param {ShareParamsNormal} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareVk (
  shareData: ShareParams<'vk'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'vk'

  typeof afterShareCallback === 'function' && afterShareCallback()

  openShareWindow(
    TYPE,
    'https://vk.com/share.php?url={{url}}&title={{text}}',
    {
      url      : shareData.url,
      text     : shareData.text,
      utmParams: shareData.utmParams,
      urlExtend: shareData.urlExtend,
      seoAttr  : shareData.seoAttr,
    },
  )
}

/**
 * what's app 分享
 * @param {ShareParamsWhatsApp} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareWhatsApp (
  shareData: ShareParams<'whatsapp'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'whatsapp'

  typeof afterShareCallback === 'function' && afterShareCallback()

  openShareWindow(
    TYPE,
    'https://api.whatsapp.com/send?text={{text}}+{{url}}',
    {
      url      : shareData.url,
      text     : shareData.text,
      phone    : shareData.phone,
      utmParams: shareData.utmParams,
      urlExtend: shareData.urlExtend,
      seoAttr  : shareData.seoAttr,
    },
  )
}

/**
 * telegram 分享
 * @param {ShareParamsNormal} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareTelegram (
  shareData: ShareParams<'telegram'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'telegram'

  typeof afterShareCallback === 'function' && afterShareCallback()

  openShareWindow(
    TYPE,
    'https://telegram.me/share/url?url={{url}}&text={{text}}',
    {
      url      : shareData.url,
      text     : shareData.text,
      utmParams: shareData.utmParams,
      urlExtend: shareData.urlExtend,
      seoAttr  : shareData.seoAttr,
    },
  )
}

/**
 * line 分享
 * @param {ShareParamsNormal} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareLine (
  shareData: ShareParams<'line'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'line'

  typeof afterShareCallback === 'function' && afterShareCallback()

  openShareWindow(
    TYPE,
    // 'https://social-plugins.line.me/lineit/share?url={{url}}',
    'https://lineit.line.me/share/ui?url={{url}}&text={{text}}',
    {
      url      : shareData.url,
      text     : shareData.text,
      utmParams: shareData.utmParams,
      urlExtend: shareData.urlExtend,
      seoAttr  : shareData.seoAttr,
    },
  )
}

/**
 * weibo 分享
 * @param {ShareParamsWeibo} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function shareWeibo (
  shareData: ShareParams<'weibo'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'weibo'

  typeof afterShareCallback === 'function' && afterShareCallback()

  openShareWindow(
    TYPE,
    'http://service.weibo.com/share/share.php?url={{url}}&title={{text}}&pic={{image}}',
    {
      url      : shareData.url,
      text     : shareData.text,
      image    : shareData.image,
      utmParams: shareData.utmParams,
      urlExtend: shareData.urlExtend,
      seoAttr  : shareData.seoAttr,
    },
  )
}

/**
 * 复制链接分享
 * @param {ShareParamsClipboard} shareData 分享数据
 * @param {Function} afterShareCallback 分享回调
 */
export function copyToClipboard (
  shareData: ShareParams<'clipboard'>,
  afterShareCallback?: () => void,
): void {
  const TYPE = 'clipboard'
  const textAreaElement = shareData.textAreaEl

  if (!textAreaElement) {
    return
  }

  textAreaElement.value = `${shareData.text}\n${getShareUrl(TYPE, shareData.url, shareData.urlExtend || {}, shareData.utmParams || {}, shareData.seoAttr)}`

  // 隐藏表单
  textAreaElement.style.width = '0px'
  textAreaElement.style.height = '0px'
  textAreaElement.style.position = 'absolute'
  textAreaElement.style.bottom = '-10px'
  textAreaElement.style.padding = '-0'
  textAreaElement.style.resize = 'none'

  // ios不支持textarea selected() 所以需要做处理来选中内容
  if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    const oldContentEditable = textAreaElement.contentEditable
    const oldReadOnly = textAreaElement.readOnly
    const range = document.createRange()

    textAreaElement.contentEditable = 'true'
    textAreaElement.readOnly = false
    range.selectNodeContents(textAreaElement)

    const s: Selection | null = window.getSelection()

    if (s) {
      s.removeAllRanges()
      s.addRange(range)
    }

    textAreaElement.setSelectionRange(0, textAreaElement.value.length) // 修正iOS下复制不全的问题

    textAreaElement.contentEditable = oldContentEditable
    textAreaElement.readOnly = oldReadOnly
  } else {
    // 非ios直接select()
    textAreaElement.select()
  }

  document.execCommand('copy')

  // 取消textarea文本选中
  textAreaElement.blur()

  typeof afterShareCallback === 'function' && afterShareCallback()
}
