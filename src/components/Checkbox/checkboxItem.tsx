import * as React from 'react'
import {
  useState,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'

// types
import { CheckboxProps } from './types'

// css
import './checkboxItem.scss'

export function CheckboxItem (props: CheckboxProps): JSX.Element {
  const {
    className,
    style,
    cbType = 'default',
    cbPosition = 'left',
    disabled = false,
    checked = false,
    disabledClick = false,
    onClick,
    onChange,
    children,
    ...restProps
  } = props

  // className
  const baseClassName = 'mi-checkbox__item'
  const classes = classNames(
    'checkbox-wrapper',
    {
      [`${baseClassName}--${cbType}`]    : !!cbType,
      [`${baseClassName}--${cbPosition}`]: !!cbPosition,
    },
    className,
  )

  // 为 checkbox 定义一个 ref，为了模拟点击 input 元素触发 onChange 事件
  const checkboxRef = useRef<HTMLInputElement>(null)

  // 内部用来控制 checkbox 是否被选中
  // 初始值为用户传入的 checked 的值
  const [ isChecked, setIsChecked ] = useState<boolean>(checked)

  // 每当用户传入的 checked 值变更时，更新内部的 isChecked 值来控制 checkbox 的选中状态
  useEffect(
    () => {
      setIsChecked(checked)
    },
    [ checked ]
  )

  // 当用户点击 checkbox 时，模拟 input 点击行为，更新 checkbox 的选中状态
  // 同时执行用户传入的 onClick 方法（如果有的话）
  function handleCheckboxClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(disabledClick) { return }
    checkboxRef.current?.click()
    setIsChecked(!isChecked)
    onClick && onClick(e)
  }

  // 当 checkbox 选中状态变更时，执行用户传入的 onChange 方法（如果有的话）
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e)
  }

  return (
    <div
      className={baseClassName}
      style={style}
      onClick={e => handleCheckboxClick(e)}
    >
      <input
        type='checkbox'
        className='checkbox__input'
        checked={isChecked}
        disabled={disabled}
        ref={checkboxRef}
        onChange={e => handleCheckboxChange(e)}
        {...restProps}
      />

      <div className={classes}>
        <i
          className={classNames(
            'checkbox__icon',
            'micon',
            'micon-checkbox-unchecked', {
              'micon-checkbox-checked' : !disabled && isChecked,
              'micon-checkbox-disabled': disabled,
            }
          )}
        />
        {
          cbType === 'default'
            ? (
                <span className='checkbox__content'>
                  {children}
                </span>
              )
            : (
                <div className='checkbox__content'>
                  {children}
                </div>
              )
        }
      </div>
    </div>
  )
}
