import * as React from "react"

export type InputSize = 'large' | 'medium' | 'small'
export type InputType = 'text' | 'textarea'

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'
> {
  size?: InputSize
  type?: InputType
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  className?: string
  fullwidth?: boolean
  disabled?: boolean
}
