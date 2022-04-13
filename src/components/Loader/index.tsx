import * as React from 'react'
import * as classNames from 'classnames'
import { LoaderProps } from './types'
import { useIntl } from '@/src/utils'
import './index.scss'

interface Loader extends LoaderProps {
  // 基础类名
  baseClassName?: string
}

export function Loader (props: Loader):JSX.Element{
  const {
    type,
    baseClassName = 'mi-loading',
    extClassNames,
    loaderColor,
    callBackFn,
  } = props

  const intl = useIntl()

  if (loaderColor) {
    // 如果传入自定义颜色，则手动变化
    document.documentElement &&
    document.documentElement.style &&
    document.documentElement.style.setProperty('--background-loader', `${loaderColor}`)
  }

  return (
    <div
      className={
        classNames(`${baseClassName}`, {
          [`${baseClassName}--mask`]  : type === 'mask',
          [`${baseClassName}--inner`] : type === 'inner',
          [`${baseClassName}--scroll`]: type === 'scroll',
          [`${extClassNames}`]        : !!extClassNames,
        })
      }
    >
      <div className={`${baseClassName}__animation`}/>
      {
        !!type && type === 'mask' &&
        <p
          className={`${baseClassName}__title`}
          onClick={(event) => typeof callBackFn === 'function' ? callBackFn(event) : null}
        >
          {intl.get('Loading...')}
        </p>
      }
    </div>
  )
}
