import * as React from 'react'
import { Component, forwardRef } from 'react'
import { Loader } from '../index'
import * as classNames from 'classnames'

import { InfiniteScrollProps } from './types'
import './index.scss'


/**
 *
 *
 * @export
 * @class InfiniteScroll
 * @extends {Component<InfiniteScrollProps>}
 * @summary https://github.com/CassetteRocks/react-infinite-scroller
 */
export class InfiniteScrollCommon extends Component<InfiniteScrollProps> {
  pageLoaded: any
  options: any
  beforeScrollHeight: number
  beforeScrollTop: number
  defaultRetry: any =
    <button
      key='defaultRetry'
      className={classNames(
        'infinite-scroll__retry-button', { [`${(this.props.className || '').split('__')[0]}__retry-button`]: !!this.props.className },
      )}
      aria-label={this.props.intl.get('Click here to retry')}
      onClick={() => typeof this.props.loadMore === 'function' && this.props.loadMore((this.pageLoaded += 1))}
    >
      {this.props.intl.get('Click here to retry')}
    </button>

  loadMore: boolean
  scrollComponent: any

  public static defaultProps = {
    element        : 'div',
    hasMore        : false,
    initialLoad    : true,
    pageStart      : 0,
    isReverse      : false,
    loader         : null,
    forwardedRef   : null,
    getScrollParent: null,
    threshold      : 250,
    useCapture     : false,
    useWindow      : true,
  }

  constructor (props: InfiniteScrollProps) {
    super(props)

    this.scrollListener = this.scrollListener.bind(this)
    this.eventListenerOptions = this.eventListenerOptions.bind(this)
    this.mousewheelListener = this.mousewheelListener.bind(this)
    this.calculateTopPosition = this.calculateTopPosition.bind(this)
  }

  componentDidMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0
    this.pageLoaded = this.props.pageStart
    this.options = this.eventListenerOptions()
    this.attachScrollListener()
  }

  componentDidUpdate () {
    if (this.props.isReverse && this.loadMore) {
      const parentElement = this.getParentElement(this.scrollComponent)
      parentElement.scrollTop =
        parentElement.scrollHeight -
        this.beforeScrollHeight +
        this.beforeScrollTop
      this.loadMore = false
    }
    this.attachScrollListener()
  }

  componentWillUnmount () {
    this.detachScrollListener()
    this.detachMousewheelListener()
  }

  isPassiveSupported () {
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    let passiveSupported = false

    try {
      const options = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        get passive () {
          // This function will be called when the browser attempts to access the passive property.
          passiveSupported = true
        },
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.addEventListener('test', options, options)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener('test', options, options)
    } catch (err) {
      passiveSupported = false
    }

    return passiveSupported
  }

  eventListenerOptions () {
    let options: any = this.props.useCapture

    if (this.isPassiveSupported()) {
      options = {
        useCapture: this.props.useCapture,
        passive   : true,
      }
    }
    return options
  }

  detachMousewheelListener () {
    let scrollEl = window
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode
    }

    scrollEl.removeEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.options ? this.options : this.props.useCapture,
    )
  }

  detachScrollListener () {
    let scrollEl = window
    if (this.props.useWindow === false) {
      scrollEl = this.getParentElement(this.scrollComponent)
    }

    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture,
    )
    scrollEl.removeEventListener(
      'resize',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture,
    )
  }

  getParentElement (el: any) {
    const scrollParent =
      this.props.getScrollParent && this.props.getScrollParent()
    if (scrollParent != null) {
      return scrollParent
    }
    return el && el.parentNode
  }

  filterProps (props: Record<string, any>) {
    return props
  }

  attachScrollListener () {
    const parentElement = this.getParentElement(this.scrollComponent)

    if (!this.props.hasMore || !parentElement) {
      return
    }

    let scrollEl = window
    if (this.props.useWindow === false) {
      scrollEl = parentElement
    }

    scrollEl.addEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.options ? this.options : this.props.useCapture,
    )
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture,
    )
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture,
    )

    if (this.props.initialLoad) {
      this.scrollListener()
    }
  }

  mousewheelListener (e: any) {
    // Prevents Chrome hangups
    // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
    if (e.deltaY === 1 && !this.isPassiveSupported()) {
      e.preventDefault()
    }
  }

  scrollListener () {
    const el = this.scrollComponent
    const scrollEl = window
    const parentNode = this.getParentElement(el)

    let offset
    if (this.props.useWindow) {
      const doc =
        document.documentElement || document.body.parentNode || document.body
      const scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : doc.scrollTop
      if (this.props.isReverse) {
        offset = scrollTop
      } else {
        offset = this.calculateOffset(el, scrollTop)
      }
    } else if (this.props.isReverse) {
      offset = parentNode.scrollTop
    } else {
      offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight
    }

    // Here we make sure the element is visible as well as checking the offset
    if (
      offset < Number(this.props.threshold) &&
      (el && el.offsetParent !== null)
    ) {
      this.detachScrollListener()
      this.beforeScrollHeight = parentNode.scrollHeight
      this.beforeScrollTop = parentNode.scrollTop
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      // 在前一页加载成功的基础上，才加载这一页的数据
      if (typeof this.props.loadMore === 'function' && this.props.ajaxStatus === 'success') {
        this.props.loadMore((this.pageLoaded += 1))
        this.loadMore = true
      }
    }
  }

  calculateOffset (el: any, scrollTop: number) {
    if (!el) {
      return 0
    }

    return (
      this.calculateTopPosition(el) +
      (el.offsetHeight - scrollTop - window.innerHeight)
    )
  }

  calculateTopPosition (el: any): any {
    if (!el) {
      return 0
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent)
  }

  render () {
    const renderProps: any = this.filterProps(this.props)
    const {
      children,
      element,
      hasMore,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      initialLoad,
      isReverse,
      loader,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      loadMore,
      loaderRetry,
      className,
      ajaxStatus,
      styleMode = 'mobile',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pageStart,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      forwardedRef,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      threshold,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useCapture,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useWindow,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getScrollParent,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      intl,
      ...props
    } = renderProps

    props.ref = (node: any) => {
      this.scrollComponent = node
      // 这里没有什么用
      // if (ref) {
      //   ref(node)
      // }
    }

    const childrenArray = [ children ]

    // 有下一页，且处于加载中/加载成功状态，添加一个 Loader
    if (hasMore && ajaxStatus !== 'error') {
      if (loader) {
        isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader)
      }
    }

    // 有下一页，且处于加载失败状态，添加一个 Retry 按钮
    if (hasMore && ajaxStatus === 'error') {
      if (loaderRetry) {
        isReverse ? childrenArray.unshift(loaderRetry) : childrenArray.push(loaderRetry)
      } else if (this.defaultRetry) {
        isReverse
          ? childrenArray.unshift(this.defaultRetry)
          : childrenArray.push(this.defaultRetry)
      }
    }

    return React.createElement(
      element,
      Object.assign(props, {
        className: classNames(
          `infinite-scroll infinite-scroll--${styleMode}`, { [`${className}`]: !!className }),
      }),
      childrenArray,
    )
  }
}


export const InfiniteScroll = forwardRef(
  (props: InfiniteScrollProps, ref) => {
    return <InfiniteScrollCommon {...props} loader={<Loader key='InfiniteScrollLoaderRes' type='scroll'/>} forwardedRef={ref} />
  }
)

InfiniteScroll.displayName = 'InfiniteScrollRes'
