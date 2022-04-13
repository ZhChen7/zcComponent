// import * as Cookies from 'js-cookie'

import Cookies from "js-cookie"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWin: any = window

function isInsideApp (): boolean {
  if (Cookies.get('ISAPP') === '1' || Cookies.get('ISIOS') === '1') {
    return true
  }
  return false
}


// 米家、社区不使用micommand方法调用老方法
// Android、IOS版本号区分是否调用micommand方法
function isUseMiCommand (): boolean {
  return Cookies.get('request_from') !== 'community_sdk' && Cookies.get('request_from') !== 'mihome_sdk' && (Number(Cookies.get('APPVERSION')) >= 31800 || Number(Cookies.get('IOSVERSION')) >= 31300)
}

// 获取坐标位置
let directLocation = ''

// 打开谷歌地图
export function openGoogleMapWebView (direct: string): boolean {
  if (isInsideApp()) {
    if (isUseMiCommand()) {
      const params = encodeURIComponent(JSON.stringify({ uri: direct }))
      const url = 'xiaomi://MiCommonCommand?action=openGoogleMap&params=' + params + '&callback=isOpenMap'
      directLocation = direct
      window.location.assign(url)
      return true
    } else {
      if (!!globalWin.WE && !!globalWin.WE.isGoogleMapInstalled && typeof globalWin.WE.isGoogleMapInstalled === 'function') {
        globalWin.WE.openGoogleMap(direct)
        return true
      } else {
        return false
      }
    }
  }
  return false
}

// 调用openGoogleMapWebView micommand方法的回调函数
const isOpenMap = function (data: any): any {
  if (data.code !== 0) {
    const query = directLocation.replace('geo:', '').split('?')[0]
    const url = 'https://www.google.com/maps/search/?api=1&query=' + query

    window.open(url)
    return false
  } else {
    return true
  }
}
globalWin.isOpenMap = isOpenMap

// 获取位置
export function requestLocationPermissionWebView (): boolean {
  if (isInsideApp()) {
    if (isUseMiCommand()) {
      const url = 'xiaomi://MiCommonCommand?action=requestLocationPermission'
      window.location.assign(url)
      return true
    } else {
      if (!!globalWin.WE && !!globalWin.WE.requestLocationPermission && typeof globalWin.WE.requestLocationPermission === 'function') {
        globalWin.WE.requestLocationPermission()
        return true
      }
    }
  }
  return false
}

// 限制 Android、IOS版本号大于等于40000
function isUseMiCommandGa (): boolean {
  return Cookies.get('request_from') !== 'community_sdk' && Cookies.get('request_from') !== 'mihome_sdk' && (Number(Cookies.get('APPVERSION')) > 40001 || Number(Cookies.get('IOSVERSION')) >= 40100)
}

// gaInstanceId保存到window：由于客户端调用该callback是异步后调用的，不能及时得到instanceId
const getInstanceId = function (instanceId: string) {
  globalWin.gaInstanceId = instanceId || ''
}

globalWin.getInstanceId = getInstanceId

// 获取客户端 ga InstanceId（安卓，ios大于等于4.0.0版本才有ga）
export function getInstanceIdWebView () {
  if (isUseMiCommandGa()) {
    const url = 'xiaomi://MiCommonCommand?action=getAppInstanceId&callback=getInstanceId'
    window.location.assign(url)
  }
}
