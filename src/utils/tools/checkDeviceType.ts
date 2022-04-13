import Cookies from 'js-cookie'

/**
 * @export
 * @returns boolean
 * @summary 判断Android IOS
 */
export function isIosDevice (): boolean {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false
  }

  const u = navigator.userAgent
  const ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const iPad = u.indexOf('iPad') > -1
  const iPhone = u.indexOf('iPhone') > -1

  return ios || iPad || iPhone
}

export function isMacDevice (): boolean {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false
  }

  return /Mac/g.test(navigator.platform)
}

export function isAndroidDevice (): boolean {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false
  }

  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

export function isDesktopDevice (): boolean {
  return !isIosDevice() && !isAndroidDevice()
}

export function isWeChat (): boolean {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false
  }

  const u = navigator.userAgent
  return /micromessenger/.test(u)
}

/** 是否在商城APP内 */
export function isInsideAndroid(): boolean {
  return Cookies.get('ISAPP') === '1'
}

/** 是否在商城IOS内 */
export function isInsideIos(): boolean {
  return Cookies.get('ISIOS') === '1'
}

/**
 * @export
 * @param {string} 'android' | 'ios'，需要判断的客户端类型
 * @returns boolean
 * @summary 判断是否商城APP内，或者分别判断APP客户端类型
 */
export function isInsideApp (client?: string): boolean {
  if (client === 'android' && isInsideAndroid()) {
    return true
  }
  if (client === 'ios' && isInsideIos()) {
    return true
  }
  return !client && !!(isInsideAndroid() || isInsideIos())
}
