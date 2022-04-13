interface GetSettingsData {
  viewTip: string
  instanceId: string
  refTip: string
  sessionId: string
  lastSource: string
  utmType: string
  utmChannel: string
  utmCampaign: string
  utmSource: string
  utmMedium: string
  utmTerm: string
  utmContent: string
}
/**
 * 获取后端埋点接口cart/add加购事件所需参数
 */
export function formatExtGetSettings (getSettingsData: GetSettingsData, tipData: string): any {
  if (!getSettingsData) {
    return {}
  }

  return {
    view_tip    : tipData || '',
    instance_id : getSettingsData.instanceId || '',
    ref_tip     : getSettingsData.refTip || '',
    session_id  : getSettingsData.sessionId || '',
    lastsource  : getSettingsData.lastSource || '',
    utm_type    : getSettingsData.utmType || '',
    utm_channel : getSettingsData.utmChannel || '',
    utm_campaign: getSettingsData.utmCampaign || '',
    utm_source  : getSettingsData.utmSource || '',
    utm_medium  : getSettingsData.utmMedium || '',
    utm_term    : getSettingsData.utmTerm || '',
    utm_content : getSettingsData.utmContent || '',
  }
}

// 输出LOGO与Version
export function outputLogo (): void {
  // const source = [
  //   [``],
  //   [`   MMMMMMMMMMMMMMMMMm     IIII`],
  //   [`   MMMMMMMMMMMMMMMMMMMm   IIII`],
  //   [`   MMMM           mMMMM   IIII`],
  //   [`   MMMM    MMMM    MMMM   IIII`],
  //   [`   MMMM    MMMM    MMMM   IIII`],
  //   [`   MMMM    MMMM    MMMM   IIII`],
  //   [`   MMMM    MMMM    MMMM   IIII`],
  //   [`   MMMM    MMMM    MMMM   IIII`],
  //   [`   MMMM    MMMM    MMMM   IIII`],
  //   [` `],
  // ]
  // const base64Data = btoa(JSON.stringify(source))
  // console.log(base64Data)
  const base64Data = 'W1siIl0sWyIgICBNTU1NTU1NTU1NTU1NTU1NTW0gICAgIElJSUkiXSxbIiAgIE1NTU1NTU1NTU1NTU1NTU1NTU1tICAgSUlJSSJdLFsiICAgTU1NTSAgICAgICAgICAgbU1NTU0gICBJSUlJIl0sWyIgICBNTU1NICAgIE1NTU0gICAgTU1NTSAgIElJSUkiXSxbIiAgIE1NTU0gICAgTU1NTSAgICBNTU1NICAgSUlJSSJdLFsiICAgTU1NTSAgICBNTU1NICAgIE1NTU0gICBJSUlJIl0sWyIgICBNTU1NICAgIE1NTU0gICAgTU1NTSAgIElJSUkiXSxbIiAgIE1NTU0gICAgTU1NTSAgICBNTU1NICAgSUlJSSJdLFsiICAgTU1NTSAgICBNTU1NICAgIE1NTU0gICBJSUlJIl0sWyIgIl1d'
  const miLogoContent = JSON.parse(window.atob(base64Data) || '[]')
  const miLogoVersion = JSON.parse(window.atob(process.env.PKG_VER || '') || '[]')
  const miLogoStyle = [
    'color:#ff6700',
  ]
  console.log('%c%s', miLogoStyle.join(';'), miLogoContent.concat(miLogoVersion).join('\n'))
}

/*
 * 验证Email邮箱地址
 * @param email Email邮箱地址
 * @return 验证结果
 */
export function checkEmail (email: string): boolean {
  const regExp = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  return !!regExp.test(email)
}

/**
 * 判断是否为第三方页面地址
 *
 * @export
 * @param {string} url URL地址
 * @return {boolean}  {boolean} 返回值
 */
export function isThirdPartyPage(url: string): boolean {
  const hostReg = /^((((ht|f)tps?):)?\/\/)?(([\w-]+\.)+)?mi\.com?(\.id)?/
  return !hostReg.test(url)
}

/**
 * 业务逻辑打开链接
 * @description 判断连接类型，并触发连接跳转行为
 * @param url 要跳转的链接
 */
export function openLinkGateway(url: string): void {
  const isThirdPartUrl = isThirdPartyPage(url)

  if (isThirdPartUrl) {
    window.open(url)
  } else {
    window.location.assign(url)
  }
}
