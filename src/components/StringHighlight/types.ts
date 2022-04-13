import { CountDownCompTypes } from "../CountDownComp/types";

export interface StringHighlightProps {
  /**
   * 翻译文本，需要高亮部分使用「#@@#」包裹
   * e.g. intl.get(`From {price}`, { price: `#@@#HK$123,456.78#@@#` })
   */
  inputStr: string
  /** 匹配替换数量的连接，替换数量为「#@@#」个数的一半 */
  linkArr?: string[]
  /** 类型，默认为空，若设置为'number'，可将文案中的数字部分高亮 */
  type?: string
  /** 超链接跳转方式 */
  target?: string
  /** 倒计时组件参数 */
  countdown?: CountDownCompTypes.CountDownCompProps
  /** 函数参数 */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, linUrl: string) => void
}
