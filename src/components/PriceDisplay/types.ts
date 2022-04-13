import { DetailedHTMLProps } from 'react'

export interface PriceDisplayProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** 销售价格 */
  salePrice: string
  /** 划线价格 */
  delPrice?: string
  /** 是否展示 「From」 */
  isShowFrom?: boolean
  /** 活动类型，用于特殊展示 */
  activityType?: number
  /** 是否划线价格置前 */
  isDelPricePre?: boolean
  /** 是否强制隐藏小数部分（一些整数时不隐藏金额小数的市场，需要特殊隐藏的情况下传入 true） */
  isHideDecimal?: boolean
}
