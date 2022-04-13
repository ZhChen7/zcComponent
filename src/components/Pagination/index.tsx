import * as React from 'react'
import { Component } from 'react'
import RcPagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import './index.scss'
import classNames from 'classnames'

/**
 *
 *
 * @class Pagination
 * @extends {Component<any, any>}
 * @summary 分页
 *
 */
interface PaginationProps {
  total?: number
  defaultCurrent?: number
  disabled?: boolean
  current?: number
  defaultPageSize?: number
  pageSize?: number
  onChange?: (page: number, pageSize?: number) => void
  hideOnSinglePage?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: string[]
  onShowSizeChange?: (current: number, size: number) => void
  showQuickJumper?: boolean | { goButton?: React.ReactNode }
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  size?: string
  simple?: boolean
  style?: React.CSSProperties
  locale?: Record<string, any>
  className?: string
  prefixCls?: string
  selectPrefixCls?: string
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>,
  ) => React.ReactNode
  role?: string
  showLessItems?: boolean
}

const prefixCls = 'mi-pagination'

export class Pagination extends Component<PaginationProps, unknown> {
  getIconsProps = () => {
    const prevIcon = (
      <a className={`${prefixCls}-item-link`}>
        <i className='micon micon-fill-arrow-left' />
      </a>
    )
    const nextIcon = (
      <a className={`${prefixCls}-item-link`}>
        <i className='micon micon-fill-arrow-right' />
      </a>
    )
    const jumpPrevIcon = (
      <a className={`${prefixCls}-item-link`}>
        {/* You can use transition effects in the container :) */}
        <div className={`${prefixCls}-item-container`}>
          <span className={`${prefixCls}-item-ellipsis`}>...</span>
        </div>
      </a>
    )
    const jumpNextIcon = (
      <a className={`${prefixCls}-item-link`}>
        {/* You can use transition effects in the container :) */}
        <div className={`${prefixCls}-item-container`}>
          <span className={`${prefixCls}-item-ellipsis`}>...</span>
        </div>
      </a>
    )
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon,
    }
  }

  render () {
    const {
      className,
      size,
      ...restProps
    } = this.props

    const isSmall = size === 'small'

    const localeInfo = {
      // Options.jsx
      items_per_page : '/ page',
      jump_to        : 'Goto',
      jump_to_confirm: 'confirm',
      page           : '',

      // Pagination.jsx
      prev_page: 'Previous Page',
      next_page: 'Next Page',
      prev_5   : 'Previous 5 Pages',
      next_5   : 'Next 5 Pages',
      prev_3   : 'Previous 3 Pages',
      next_3   : 'Next 3 Pages',
    }

    return (
      <div>
        <RcPagination
          {...restProps}
          prefixCls={prefixCls}
          {...this.getIconsProps()}
          className={classNames(className, { mini: isSmall })}
          locale={localeInfo}
        />
      </div>
    )
  }
}
