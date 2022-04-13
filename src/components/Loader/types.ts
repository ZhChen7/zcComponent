export interface LoaderProps {
  /**
   * 展示类型 (默认为page)
   * page(默认): 整个页面DOM渲染前的loading
   * mask: 页面调接口后置于页面之上的loading
   * scroll: 分页下拉的loading
   * inner: 在页面某个区块中DOM渲染前的loading与page对应
   */
  type?: string
  /** 扩展类名 */
  extClassNames?: string
  /** 自定义颜色 */
  loaderColor?: string
  /** 点击回调函数 */
  callBackFn?: (arg0?: unknown) => void
}
