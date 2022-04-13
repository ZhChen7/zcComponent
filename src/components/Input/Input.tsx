import * as React from 'react'
import { useState } from 'react'
import { InputProps } from './types'
import classnames from 'classnames'

import './index.scss'

const BASE_CLASS = 'mi-input'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputPure(
  props: InputProps,
  ref: (instance: HTMLInputElement | null) => React.MutableRefObject<HTMLInputElement> | null
): JSX.Element {

  const [ active, setActive ] = useState(false)
  const [ onHover, setOnHover ] = useState(false)

  const {
    size        = 'medium',
    type        = 'text',
    prefix      = null,       // 在输入框前面的元素
    suffix      = null,       // 在输入框后面的元素
    className   = '',
    fullwidth   = false,
    disabled    = false,
    placeholder = '',
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...restInputProps
  } = props

  const classNames = classnames(
    BASE_CLASS,
    `${BASE_CLASS}--${size}`,
    `${BASE_CLASS}--${type}`,
    {
      [`${className}`]              : className,
      [`${BASE_CLASS}--disabled`]   : disabled,
      [`${BASE_CLASS}--fullwidth`]  : !!fullwidth,
      [`${BASE_CLASS}--active`]     : active,
      [`${BASE_CLASS}--hover`]      : onHover,
      [`${BASE_CLASS}--with-prefix`]: !!prefix,
      [`${BASE_CLASS}--with-suffix`]: !!suffix,
    }
  )

  const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setActive(true)
    onFocus && onFocus(e)
  }

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setActive(false)
    onBlur && onBlur(e)
  }

  const mouseEnterHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setOnHover(true)
    onMouseEnter && onMouseEnter(e)
  }

  const mouseLeaveHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setOnHover(false)
    onMouseLeave && onMouseLeave(e)
  }

  const renderText = ():React.ReactNode => {
    return (
      <input
        ref={ref}
        onFocus={focusHandler}
        onBlur={blurHandler}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete='off'
        { ...restInputProps }
      />
    )
  }

  const renderTextArea = ():React.ReactNode => {
    return (
      <div></div>
    )
  }

  return (
    <div
      className={classNames}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      { prefix && <span className={`${BASE_CLASS}--prefix`}>{ prefix }</span> }
      { type === 'text' ? renderText() : renderTextArea() }
      { suffix && <span className={`${BASE_CLASS}--suffix`}>{ suffix }</span> }
    </div>
  )
}

export const Input = React.forwardRef<
  HTMLInputElement |
  HTMLTextAreaElement |
  null |
  undefined,
  InputProps
>(InputPure)
