import * as React from 'react'
import * as PropTypes from 'prop-types'

interface BreadcrumbItemProps {
  separator?: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>
}

export class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = { separator: '/' }

  static propTypes = {
    separator: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
    href     : PropTypes.string,
  }

  renderBreadcrumbItem = () => {
    const { separator, children, ...restProps } = this.props
    const baseClassName = 'mi-breadcrumbs'
    let link
    if ('href' in this.props) {
      link = (
        <a className={`${baseClassName}-link`} {...restProps}>
          {children}
        </a>
      )
    } else {
      link = (
        <span className={`${baseClassName}-link`} {...restProps}>
          {children}
        </span>
      )
    }

    if (children) {
      return (
        <span>
          {link}
          { !! separator && (
            <span className={`${baseClassName}-separator`}>{separator}</span>
          )}
        </span>
      )
    }
    return null
  }

  render () {
    return this.renderBreadcrumbItem()
  }
}
