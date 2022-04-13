import { FC } from 'react'
import { RadioItem } from './radioItem'
import { RadioGroup } from './radioGroup'
import { RadioProps, RadioGroupProps } from './types'

export type RadioComponent = FC<RadioProps> & {
  Group: FC<RadioGroupProps>
}

const Radio = RadioItem as RadioComponent
Radio.Group = RadioGroup

export default Radio
