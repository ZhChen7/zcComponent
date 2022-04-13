export interface VideoPropsType {
  /** 视频链接 */
  src: string
  /** 海报，视频未加载时展示封面 */
  poster: Poster
  /** 类名 */
  className?: string
  /** 是否自动循环播放，默认循环 */
  isLoop?: boolean
  /** 是否自动播放 */
  isAutoplay?: boolean
  /** 是否静音播放，默认静音 */
  muted?: boolean
  /** 是否展示控件，默认展示 */
  isControls?: boolean
  /** 视频上播放按钮icon，可用于点击时播放视频，否则建议使用poster */
  playBtnImage?: string
}

export interface Poster {
  /** M端封面图 */
  mobile: string
  /** PC封面图 */
  widescreen: string
}

