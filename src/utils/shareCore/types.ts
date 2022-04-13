export type SocialType = 'facebook' | 'twitter' | 'vk' | 'whatsapp' | 'telegram' | 'line' | 'weibo' | 'clipboard'

export type ShareUrlExtend = {
  [props: string]: string
}

export interface ShareParamsNormal {
  /** 分享链接 */
  url: string
  /** 分享文案 */
  text?: string
  /** 站外来源链接标记 */
  utmParams?: Partial<SocialUtmParams>
  /** 链接扩展查询字符串 */
  urlExtend?: ShareUrlExtend
  /** 中转页SEO数据 */
  seoAttr?: SharePageAttribute
}

export interface SharePageAttribute {
  /** 所在市场 */
  buySite: string
  /** 页面标题 */
  title: string
  /** 图片地址 */
  image: string
  /** 描述信息 */
  desc: string
}

export interface ShareParamsTwitter extends ShareParamsNormal {
  /** 话题标签，可以是多个，以逗号划分 */
  hashtag?: string
}

export interface ShareParamsFacebook extends ShareParamsNormal {
  /** 应用的唯一标识符 */
  appId: string
  /** 话题标签，只能是一个 */
  hashtag?: string
  /** 在用户点击对话框按钮后重定向的目标网址 */
  redirectUri?: string
  /**
   * @description 确定如何呈现对话框
   * @param page 使用网址重定向对话框实施方案，则对话框会在 Facebook.com 内全页显示。
   * @param iframe 使用 JavaScript 版 Facebook SDK 方案，并且登录 SDK 的用户，使用内嵌页面的分享框
   * @param async 使用 JavaScript 版 Facebook SDK 方案，在游戏内使用时，选择该参数
   * @param popup 使用 JavaScript 版 Facebook SDK 方案，手动弹出小窗页面，选择该参数
   * @param touch 移动网页应用（web）会默认使用该类型，不管设置成上述的哪一个值
   */
  display?: 'page' | 'iframe' | 'async' | 'popup' | 'touch'
}

export interface ShareParamsWhatsApp extends ShareParamsNormal {
  /** 目标用户电话号码 */
  phone?: string
}

export interface ShareParamsWeibo extends ShareParamsNormal {
  /** 分享附加图片 */
  image?: string
}

export interface ShareParamsClipboard extends ShareParamsNormal {
  /** 需要复制路径的文本框 */
  textAreaEl: HTMLTextAreaElement
}

export type ShareParams<T> = T extends 'twitter' ? ShareParamsTwitter
  : T extends 'facebook' ? ShareParamsFacebook
  : T extends 'whatsapp' ? ShareParamsWhatsApp
  : T extends 'weibo' ? ShareParamsWeibo
  : T extends 'clipboard' ? ShareParamsClipboard
  : ShareParamsNormal

export interface SocialUtmParams {
  utmType: string
  utmChannel: string
  utmCampaign: string
  utmSource: string
  utmMedium: string
  utmTerm: string
  utmContent: string
}
