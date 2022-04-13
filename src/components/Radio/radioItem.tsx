import * as React from 'react'
import {
  useState,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'

// types
import { RadioProps } from './types'

// css
import './radioItem.scss'

export function RadioItem (props: RadioProps): JSX.Element {
  const {
    className,
    style,
    radioType = 'default',
    radioPosition = 'left',
    name,
    value,
    selectedValue,
    checked = false,
    disabled = false,
    isHideIcon = false,
    onChange,
    children,
    ...restProps
  } = props

  // classnames
  const baseClassName = 'mi-radio__item'
  const classes = classNames(
    'radio-wrapper',
    {
      [`${baseClassName}--${radioType}`]    : !!radioType,
      [`${baseClassName}--${radioPosition}`]: !!radioPosition,
    },
    className,
  )

  // 为 radio button 定义一个 ref，为了模拟点击 input 元素触发 onChange 事件
  const radioRef = useRef<HTMLInputElement>(null)

  // 内部用来控制 radio button 是否被选中
  // 初始值为用户传入的 checked 的值
  const [ isChecked, setIsChecked ] = useState<boolean>(checked)

  // 每当用户传入的 selectedValue 值变更时，更新内部的 isChecked 值来控制 radio button 的选中状态
  useEffect(
    () => {
      setIsChecked(value === selectedValue)
    },
    [ selectedValue ]
  )

  // 当 radio button 从未选中状态变为被选中状态时，触发 onChange 事件
  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e)
  }

  return (
    <div
      className={baseClassName}
      style={style}
      onClick={() => radioRef.current?.click()}
    >
      <input
        type='radio'
        className='radio__input'
        name={name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        ref={radioRef}
        onChange={e => handleRadioChange(e)}
        {...restProps}
      />

      <div className={classes}>
        <i
          className={classNames(
            'radio__icon',
            'micon',
            'micon-radio-unchecked', {
              'micon-radio-checked' : !disabled && isChecked,
              'micon-radio-disabled': disabled,
              'micon-radio--hide'   : isHideIcon,
            }
          )}
        />
        {
          radioType === 'default'
            ? (
                <span className='radio__content'>
                  {children}
                </span>
              )
            : (
                <div className='radio__content'>
                  {children}
                </div>
              )
        }
      </div>
    </div>
  )
}
