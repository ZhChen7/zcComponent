import * as React from 'react'
import classNames from 'classnames'
import {
  MiIcon,
  MiLink,
} from '..'

import { ButtonProps } from './types'

import './index.scss'

export function Button (props: ButtonProps): JSX.Element {
  const {
    btnType,
    withArrow = 'disable',
    size,
    btnTheme = 'light',
    href,
    target,
    className,
    disabled,
    highlight = 'disable',
    children,
    ...restProps
  } = props

  const baseClassName = 'mi-btn'
  const classes = classNames(
    baseClassName,
    {
      [`${baseClassName}--${btnType}`]  : !!btnType,
      [`${baseClassName}--${size}`]     : !!size,
      [`${baseClassName}--${btnTheme}`] : !!btnTheme,
      [`${baseClassName}--disabled`]    : !!disabled,
      [`${baseClassName}--arrow-pc`]    : [ 'enable', 'pc-only' ].includes(withArrow),
      [`${baseClassName}--arrow-m`]     : [ 'enable', 'm-only' ].includes(withArrow),
      [`${baseClassName}--highlight-pc`]: [ 'enable', 'pc-only' ].includes(highlight),
      [`${baseClassName}--highlight-m`] : [ 'enable', 'm-only' ].includes(highlight),
    },
    className,
  )

  // 如果提供了链接，则返回一个 <a> 标签的按钮
  if (href) {
    return (
      <MiLink
        href={href}
        target={target}
        className={classes}
        onClick={e => disabled && e.preventDefault()}
        {...restProps}
      >
        {/* 超长文字如果定义了宽度，会以省略号展示 */}
        {
          typeof children === 'string'
            ? <span className='mi-btn__text'>{children}</span>
            : children
        }

        {/* 文案是否带箭头 */}
        {
          withArrow !== 'disable' &&
          <MiIcon symbol='link-arrow' />
        }
      </MiLink>
    )
  } else {
    // 没有提供链接，返回一个普通 button
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}

        {/* 文案是否带箭头 */}
        {
          withArrow !== 'disable' &&
          <MiIcon symbol='link-arrow' />
        }
      </button>
    )
  }
}

Button.defaultProps = {
  btnType  : 'default',
  size     : 'normal',
  disabled : false,
  highlight: false,
  children : null,
}
