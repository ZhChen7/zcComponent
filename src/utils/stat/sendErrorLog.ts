/**
 * @author Conan06
 * @description 上报错误数据
 * @tutorial https://docs.google.com/spreadsheets/d/1qQ7ZkY36Q8uvAdhOBMD3kcWUVFEn0njhkT-dASt-rhA/edit#gid=723587489
 * @param {WebScmTypes.SiteScmConfig} scmConfig 站点配置
 * @param {object} error 错误数据
 */
import { WebScmTypes } from '@/src/types'
import { ajax } from 'rxjs/ajax'

// 错误事件埋点
export function sendErrorLog (scmConfig: WebScmTypes.SiteScmConfig, error: any): void {
  if (!error) {
    return // 无错误内容，不上报
  }

  const currentUrl: string = window.location.href
  const userAgent: string = window.navigator.userAgent

  const errorInfo: any = (error && error.stack) || (error && error.type === 'unhandledrejection' && error.reason) || null
  const errorData: string = JSON.stringify(errorInfo)
  const errorContent: string = ('FEerror' + '~' + userAgent + '~' + errorData).substr(0, 496) + ' ...' // 最长500个字符 (496 + 4)

  if (!errorInfo || errorData === '{}') {
    return // 无具体错误信息，不上报
  }

  const isUseBeacon = typeof window.navigator.sendBeacon === 'function'
  const reportUrl = `${scmConfig.buySite.m}/error/errsave`

  if (isUseBeacon) {
    navigator.sendBeacon(
      reportUrl,
      new Blob(
        [ `url=${currentUrl}&content=${errorContent}` ],
        {
          type: 'application/x-www-form-urlencoded',
        }
      )
    )
  } else {
    const ajaxConfig = {
      url    : reportUrl,
      method : 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // 使用FormData
      body   : {
        url    : currentUrl,
        content: errorContent,
      },
      withCredentials: true,
    }

    // 发起 AJAX 网络请求
    ajax(ajaxConfig).subscribe()
  }
}
