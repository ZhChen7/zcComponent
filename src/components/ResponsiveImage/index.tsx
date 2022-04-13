import * as React from 'react'
import { Fragment } from 'react'
import * as classNames from 'classnames'

// utils
import { matchQueries } from '@/src/utils'
import type { MediaQueries } from '@/src/types'

import './index.scss'

interface ResponsiveImageProps {
  /** 扩展样式名 */
  className?: string

  /** 兜底展示模式 */
  defaultMode?: MediaQueries

  /**
   * 图片资源
   * @example ```js
   * srcSet={{
   *   mobile    : 'small.jpg',
   *   tablet    : 'medium.jpg',
   *   laptop    : 'large.jpg',
   *   desktop   : 'x-large.jpg',
   *   widescreen: 'xx-large.jpg',
   * }}
   * ```
   */
  srcSet: Partial<Record<MediaQueries, string>>

  /** 图片描述信息 */
  alt: string
}

/**
 * 该组件用于不同尺寸下切换图片路径源
 * @see https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
 * 美术设计：当你想为不同布局提供不同剪裁的图片——比如在桌面布局上显示完整的、横向图片，而在手机布局上显示一张剪裁过的、突出重点的纵向图片，可以用 <picture> 元素来实现。
 * 分辨率切换：当你想要为窄屏提供更小的图片时，因为小屏幕不需要像桌面端显示那么大的图片；以及你想为高/低分辨率屏幕提供不同分辨率的图片时，都可以通过 SVG、 srcset 以及 sizes 属性来实现。
 */
export function ResponsiveImage (props: ResponsiveImageProps): JSX.Element {
  const {
    className,
    defaultMode = 'widescreen',
    srcSet,
    alt,
  } = props

  return (
    <picture className={classNames(
      {
        'responsive-image': true,
        [`${className}`]  : !!className,
      }
    )}>
      {
        Object.keys(matchQueries).map((query: MediaQueries, index: number) => {
          if (srcSet[query]) {
            return <source key={index} media={matchQueries[query]} srcSet={srcSet[query]}/>
          } else {
            return <Fragment key={index} />
          }
        })
      }

      {/* 上述 source 资源最后会落在 <img/> 中展示，样式只需定义img即可，同事需要一个兜底图片，否则 <picture/> 不会生效 */}
      <img src={srcSet[defaultMode] || srcSet.widescreen || srcSet.desktop || srcSet.laptop || srcSet.tablet || srcSet.mobile || ''} alt={alt}/>
    </picture>
  )
}
