import * as React from 'react'
import RcDrawer from 'rc-drawer'

// utils
import { useIntl } from '@/src/utils'

import { MiIcon } from '@/src/components'

import './index.scss'

import { DrawerProps } from './types'

export function Drawer(props: DrawerProps): JSX.Element {
  const intl = useIntl()
  const {
    placement = 'right',
    visible = false,
    showMask = true,
    maskClosable = true,
    children,
    onClose,
    width,
    height,
    className,
    showheader = true,
    title = 'Drawer'
  } = props

  const baseClassName = 'mi-drawer'

  return (
    <RcDrawer
      prefixCls={baseClassName}
      className={className}
      placement={placement}
      open={visible}
      level={null}
      handler={false}
      width={width}
      height={height}
      showMask={showMask}
      maskClosable={maskClosable}
      onClose={onClose}
    >
      {
        showheader &&
        <div className='header'>
          <span className='header__title'>{intl.get(title)}</span>
          <MiIcon className='header__close' symbol='clear' onClick={(e) => onClose && onClose(e)}/>
        </div>
      }
      {/* content */}
      <div className='mi-drawer-content__main'>
        { children }
      </div>
    </RcDrawer>
  )
}