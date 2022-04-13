import * as React from 'react'
import { Component } from 'react'
import * as PropTypes from 'prop-types'
import * as classNames from 'classnames'
import { BreadcrumbItem } from './BreadcrumbItem'

import './index.scss'

interface BreadcrumbsProps {
  separator?: React.ReactNode
  className?: string
}

export class Breadcrumbs extends Component<BreadcrumbsProps, any> {
  static Item: typeof BreadcrumbItem

  // static Separator: typeof BreadcrumbSeparator

  static defaultProps = { separator: '/' }

  static propTypes = { separator: PropTypes.node }

  renderBreadcrumb = () => {
    const {
      className,
      separator,
      children,
    } = this.props
    const baseClassName = 'mi-breadcrumbs'
    const crumbs = React.Children.map(children, (element: any, index) => {
      if (!element) {
        return element
      }
      return React.cloneElement(element, {
        separator,
        key: index, // eslint-disable-line react/no-array-index-key
      })
    })
    return (
      <div
        className={classNames(baseClassName, className)}
      >
        <div className='container'>
          {crumbs}
        </div>

      </div>
    )
  }

  render () {
    return <div>{this.renderBreadcrumb()}</div>
  }
}
Breadcrumbs.Item = BreadcrumbItem
