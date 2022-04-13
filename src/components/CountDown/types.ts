export interface CountDownProps {
  /** 倒计时秒数，单位：毫秒(ms) */
  remainTime: number
  /** 延迟开始秒数，单位：毫秒(ms) */
  delayTime?: number
  /** 倒计时结束后的回调函数 */
  onCallback?: () => void
}

export interface CountDownResult {
  /** 剩余天数 */
  days: string
  /** 剩余小时 */
  hours: string
  /** 剩余分钟 */
  minutes: string
  /** 剩余秒数 */
  seconds: string
}
