import * as React from 'react'

// export type type = 'line'
export type tabId = string | number

export interface TabsProps {
  // type: type
  activeId?: tabId
  separator?: boolean
  onTabClick?: (tabId: tabId, e: React.MouseEvent) => void
  className?: string
  children?: React.ReactNode[] | React.ReactNode
}

export interface TabsPaneProps {
  tabId: tabId
  tabTitle: string
  className?: string
  children?: React.ReactNode
}
