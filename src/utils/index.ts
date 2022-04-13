export * from './hooks' // Hooks工具包
export {
  priceFormat,
  numberFormat,
  getPriceNum
} from './tools/priceFormat'

export { getQueryString } from './tools/getQueryString'
export { imageResize } from './tools/imageResize'

export {
  isIosDevice,
  isMacDevice,
  isAndroidDevice,
  isDesktopDevice,
  isWeChat,
  isInsideApp,
  isInsideAndroid,
  isInsideIos,
} from './tools/checkDeviceType'

export {
  outputLogo,
  formatExtGetSettings,
  checkEmail,
  isThirdPartyPage,
  openLinkGateway,
} from './tools/tools' // 工具箱

export {
  miSessionStorage,
  miLocalStorage,
  isLocalStorageSupport,
  isSessionStorageSupport,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './tools/storage' // storage相关工具包

export { getBrowserUrl } from './tools/getBrowserUrl'
export * from './tools/type'
export * from './tools/omit'
export { getUserAgentInfo } from './tools/getUserAgentInfo'
