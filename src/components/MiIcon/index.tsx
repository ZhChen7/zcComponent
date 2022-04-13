import * as React from 'react'
import * as classNames from 'classnames'

interface MiIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  symbol: string
}

export function MiIcon(props: MiIconProps): JSX.Element {
  const {
    symbol,
    className,
    ...otherProps
  } = props

  return (
    <i
      className={
        classNames(
          {
            [`micon micon-${symbol}`]: !!symbol,
            [`${className}`]         : !!className,
          }
        )
      }
      {...otherProps}
    />
  )
}
