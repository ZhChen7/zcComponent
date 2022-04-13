import * as React from 'react'
import { Fragment } from 'react'
import * as classNames from 'classnames'

import './index.scss'

interface ClipPathImageProps {
  /** 扩展样式名 */
  className?: string

  /** 图片路径 */
  src: string

  /** 图片描述信息 */
  alt: string

  /** 边框粗细，单位px，默认 0 */
  borderWidth?: number

  /**
   * 边框颜色，默认 none
   * 亦可通过给 `${className}__border` 添加样式实现:
   * ```css
   * [`${className}`]__border > g {
   *   stroke: red;
   * }
   * ```
   * */
  borderColor?: string

  /** 是否有边框阴影，默认 false */
  hasBorderShadow?: boolean

  /** 是否有阴影，默认 false */
  hasShadow?: boolean
}

/**
 * 裁剪图片并展示
 */
export function ClipImage (props: ClipPathImageProps): JSX.Element {
  const {
    className = '',
    borderWidth = 0,
    borderColor = 'none',
    hasBorderShadow = false,
    hasShadow = false,
    src,
    alt,
  } = props

  return (
    <Fragment>
      <picture className={classNames(
        {
          'clip-image'        : true,
          'clip-image--shadow': hasShadow,
          [`${className}`]    : !!className,
        }
      )}>
        <img src={src} alt={alt} />

        {
          !!borderWidth &&
          <svg viewBox='0 0 1 1' className={classNames(
            {
              'clip-image__border'        : true,
              'clip-image__border--shadow': hasBorderShadow,
              [`${className}__border`]    : !!className,
            }
          )}>
            <g strokeWidth={borderWidth / 180} stroke={borderColor} fill='none' transform={`scale(${1 - borderWidth / 240}) translate(${borderWidth / 480}, ${borderWidth / 480})`}>
              <use xlinkHref='#svgBasePath'/>
            </g>
          </svg>
        }
      </picture>
    </Fragment>
  )
}
