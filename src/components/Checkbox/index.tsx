import { FC } from 'react'
import { CheckboxItem } from './checkboxItem'
import { CheckboxGroup } from './checkboxGroup'
import { CheckboxProps, CheckboxGroupProps } from './types'

export type CheckboxComponent = FC<CheckboxProps> & {
  Group: FC<CheckboxGroupProps>
}

const Checkbox = CheckboxItem as CheckboxComponent
Checkbox.Group = CheckboxGroup

export default Checkbox
