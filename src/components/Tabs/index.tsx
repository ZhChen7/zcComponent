import * as React from 'react'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import './index.scss'

// types
import { TabsProps, TabsPaneProps } from './types'

const isArrayChildren = (children: React.ReactNode) => {
  if (!Array.isArray(children)) {
    return [ children ]
  }else {
    return children
  }
}

function TabsPane(props: TabsPaneProps): JSX.Element {
  const {
    children
  } = props

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

function Tabs(props: TabsProps): JSX.Element {
  const {
    // type = 'line',
    activeId: activeIdProps,
    separator = false,
    onTabClick,
    className = '',
    children
  } = props

  const [ activeId, setActiveId ] = useState(activeIdProps)

  const baseClassname = 'mi-tabs'
  const tabPaneClassName = 'mi-tabs-pane'

  const handleClick = (tabId: string | number, event: React.MouseEvent) => {
    if (tabId !== activeId) {
      setActiveId(tabId)
    }
    onTabClick && onTabClick(tabId, event)
  }

  useEffect(() => {
    setActiveId(activeIdProps)
  }, [ activeIdProps ])

  return (
    <div className='mi-tabs'>
      <ul className={`${baseClassname}__header ${className}`}>
        {
          isArrayChildren(children).map((child: React.ReactElement, index: number) => {
            const { tabId, tabTitle } = child.props
            return (
              <li className={
                classNames({
                  [`${baseClassname}__item`]          : !separator,
                  [`${baseClassname}__item-separator`]: separator,
                  [`${baseClassname}--active`]        : activeId ? (activeId === tabId) : !index
                })}
              key={tabId}
              onClick={(e) => { handleClick(tabId, e) }}
              >
                {tabTitle}
              </li>
            )
          })
        }
      </ul>
      <div className={`${tabPaneClassName}`}>
        {
          isArrayChildren(children).map((child: React.ReactElement, index: number) => {
            const { tabId } = child.props
            const isActive = activeId ? (activeId === tabId) : !index
            return (
              <div key={tabId} className={
                classNames(`${tabPaneClassName}__item`, {
                  [`${tabPaneClassName}--active`]: isActive
                })
              }>
                { child }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


Tabs.Pane = TabsPane

export { Tabs }
