import * as React from 'react'
import { InputHTMLAttributes } from 'react'

export type CheckboxType = 'default' | 'button' | 'card' // 共 3 种按钮类型
export type CheckboxPosition = 'top' | 'right' | 'bottom' | 'left' // 按钮可以在 上/下/左/右 四个位置
export type CheckboxGroupDirection = 'default' | 'horizontal' | 'vertical' // 可以水平排列或垂直排列，默认水平
export type OnChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => void // 用户提供的 callback 函数

interface BaseCheckboxProps {
  className?: string
  cbType?: CheckboxType
  cbPosition?: CheckboxPosition
  checked?: boolean
  disabled?: boolean
  onChange?: OnChangeCallback
  children?: React.ReactNode
  disabledClick?: boolean
}

export type CheckboxProps = BaseCheckboxProps & InputHTMLAttributes<HTMLElement>

export interface CheckboxGroupProps {
  className?: string
  direction?: CheckboxGroupDirection
  cbType?: CheckboxType
  cbPosition?: CheckboxPosition
  children?: JSX.Element[]
}
