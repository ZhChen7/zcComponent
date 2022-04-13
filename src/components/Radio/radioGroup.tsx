import * as React from 'react'
import classNames from 'classnames'

// types
import { RadioGroupProps } from './types'

// css
import './radioGroup.scss'

export function RadioGroup (props: RadioGroupProps): JSX.Element {
  const {
    name,
    value,
    className,
    direction,
    radioType,
    radioPosition,
    children,
    onChange,
  } = props

  const baseClassName = 'mi-radio__group'
  const classes = classNames(
    baseClassName,
    {
      [`${baseClassName}--vertical`]: direction === 'vertical'
    },
    className,
  )

  return (
    <div className={classes}>
      {
        Array.from(children || []).map(
          (child: JSX.Element, index: number) => React.cloneElement(
            child,
            {
              key          : `radio-item-${child.key ? child.key : index}`,
              name         : name,
              onChange     : onChange,
              selectedValue: value,
              direction    : direction,
              radioType    : radioType,
              radioPosition: radioPosition
            }
          )
        )
      }
    </div>
  )
}

RadioGroup.defaultProps = {
  name: 'radio-group',
}
