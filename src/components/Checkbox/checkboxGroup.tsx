import * as React from 'react'
import classNames from 'classnames'

// types
import { CheckboxGroupProps } from './types'

// css
import './checkboxGroup.scss'

export function CheckboxGroup (props: CheckboxGroupProps): JSX.Element {
  const {
    className,
    direction,
    cbType,
    cbPosition,
    children,
  } = props

  const baseClassName = 'mi-checkbox__group'
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
              key       : `checkbox-item-${child.key ? child.key : index}`,
              direction : direction,
              cbType    : cbType,
              cbPosition: cbPosition,
            }
          )
        )
      }
    </div>
  )
}
