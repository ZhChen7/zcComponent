import { HTMLAttributes } from 'react'

export declare namespace CountDownCompTypes {
  export interface CountDownCompProps extends HTMLAttributes<HTMLDivElement> {
    /** 倒计时秒数（时间戳单位秒），或者使用更精确的系统时间 */
    time: number | TimeProperties
    /** 开始倒计时执行的方法 */
    onStart?: () => void
    /** 结束倒计时执行的方法 */
    onFinish?: () => void
    /** 每一秒都会执行的方法 */
    onTiming?: (remindSeconds: number) => void
    /** 是否自动开始倒计时 */
    isAutoPlay?: boolean
    /**
     * 延迟对应秒数后开始倒计时
     * @description isAutoPlay 设置为 false 才生效
     */
    delayTime?: number
    /**
     * 数据展示模式
     * timeWithDays 展示「日期」与「时间」并附带文案 （默认）
     * timeWithoutDays 展示「时间」并附带文案
     * seconds 只展示数字「秒」
     * secondsWithText 只展示「秒」并附带文案
     */
    dataType?: DataType
    /**
     * 样式展示模式
     * text 纯文本 （默认）
     * icon 带底图
     */
    displayType?: DisplayType
  }

  export interface TimeProperties {
    /** 倒计时结束时间（时间戳单位秒），用于更精确的倒计时 */
    finishTime: number
    /** 接口数据请求时客户端的时间（时间戳单位秒），用于更精确的倒计时 */
    requestTime: number
    /** 接口数据响应返服务端的时间（时间戳单位秒），用于更精确的倒计时 */
    serverTime: number
  }

  export type DataType = 'seconds' | 'secondsWithText' | 'timeWithDays' | 'timeWithoutDays'
  export type DisplayType = 'text' | 'icon'
}
