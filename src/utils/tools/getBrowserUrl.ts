import { isDesktopDevice } from './checkDeviceType'

/**
 * 根据设备返回对应跳转域名
 * @export
 * @param {pcUrl} pcUrl
 * @param {mUrl} [mUrl]
 * @return {*}  {string}
 */
export function getBrowserUrl(pcUrl: string, mUrl?: string):string {
  if (pcUrl && mUrl) {
    return isDesktopDevice() ? pcUrl : mUrl
  } else if (pcUrl && !mUrl) {
    return pcUrl;
  } else if (!pcUrl && mUrl) {
    return mUrl
  } else {
    return ''
  }
}