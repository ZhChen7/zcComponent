import { ReactNode } from 'react'
export interface IntlType {
  get: (arg0: string, arg1?: Record<string, number | string>) => string
}
export interface InfiniteScrollProps {
  children?: ReactNode
  element?: ReactNode
  /** 是否有下一页 */
  hasMore?: boolean
  initialLoad?: boolean
  pageStart?: number
  isReverse?: boolean
  loader?: ReactNode
  loaderRetry?: ReactNode
  className?: string
  /** 服务状态 */
  ajaxStatus: string
  loadMore?: (arg0?: unknown) => void
  forwardedRef?: any
  getScrollParent?: () => void
  threshold?: number
  useCapture?: boolean
  useWindow?: boolean
  /** intl */
  intl: IntlType
}
