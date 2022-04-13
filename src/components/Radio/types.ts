import * as React from 'react'
import { InputHTMLAttributes } from 'react'

export type RadioType = 'default' | 'button' | 'card' // 共 3 种单选按钮类型
export type RadioPosition = 'top' | 'right' | 'bottom' | 'left' // 单选按钮可以在 上/下/左/右 四个位置
export type RadioGroupDirection = 'default' | 'horizontal' | 'vertical' // 单选框可以水平排列或垂直排列，默认水平
export type RadioChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => void // 用户提供的 callback 函数

interface BaseRadioProps {
  className?: string
  radioType?: RadioType
  radioPosition?: RadioPosition
  value?: unknown // radio 项的值，可能是 number, string, boolean 等，这里定义为 unknown
  selectedValue?: unknown // radio group 选中项的值
  checked?: boolean
  disabled?: boolean
  onChange?: RadioChangeCallback
  children?: React.ReactNode
  isHideIcon?: boolean
}

export type RadioProps = BaseRadioProps & InputHTMLAttributes<HTMLElement>

export interface RadioGroupProps {
  className?: string
  direction?: RadioGroupDirection
  radioType?: RadioType
  radioPosition?: RadioPosition
  name?: string
  value?: string // radio group 选中项的值
  onChange?: RadioChangeCallback
  children?: JSX.Element[]
}
