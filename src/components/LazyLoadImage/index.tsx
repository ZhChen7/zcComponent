/**
 * TODO
 */
import * as React from 'react'
import { useRef } from 'react'

interface LazyLoadImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  /** 是否为服务端渲染 */
  isServerSide?: boolean

  /** 配置参数 */
  settings?: IntersectionObserverInit
}

/**
 * 延迟加载图片
 * @param props {LazyLoadImageProps}
 * @returns HTMLImageElement
 * @example ```tsx
 * <LazyLoadImage alt='test' src='123' />
 * ```
 */
export function LazyLoadImage (props: LazyLoadImageProps): JSX.Element {
  const {
    isServerSide,
    settings,
    src,
    ...otherProps
  } = props

  const ref = useRef<HTMLImageElement>(null)

  // 取出图片的资源地址，并且置空<img/>中的路径
  if (isServerSide) {
    return (
      <img data-src={src} {...otherProps} />
    )
  }

  // 判断客户端是否支持 IntersectionObserver
  if (typeof IntersectionObserver === 'function') {
    const options = {
      // 目标元素的父级元素。如果为null，则为浏览器视窗
      root: settings?.root || null,

      // 该属性值是用作root元素和target发生交集时候的计算交集的区域范围，使用该属性可以控制root元素每一边的收缩或者扩张
      rootMargin: settings?.rootMargin || '0px',

      // 该值为1.0含义是当target完全出现在root元素中时候回调才会被执行。0 则是有 1px 出现在展示区域则执行
      // 注意：在实际使用时，如果设置为 1，会受到 css 影响，可能存在全部展示时比例为 0.95 的情形，因此要谨慎设置该参数，避免造成上报遗漏
      threshold: typeof settings?.threshold === 'undefined' ? 0.0 : settings?.threshold,
    }

    // 创建可视区域观察实例
    const observer = new IntersectionObserver(
      function (observerDoms: IntersectionObserverEntry[]) {
        observerDoms.forEach(function (observerDom: IntersectionObserverEntry) {
          if (observerDom.intersectionRatio <= 0) {
            // 元素完全不可见，即当前未在指定观察区域内展示
            return
          }

          if (!observerDom.isIntersecting) {
            // 如果观察元素与区域交集正在减少，不重复上报（避免进入和离开分别上报两次）
            return
          }

          // 找到当前被观察到曝光的DOM元素
          const observerTarget: HTMLImageElement = observerDom.target as HTMLImageElement

          if (!!observerTarget && !observerTarget.src) {
            observerTarget.src = `${observerTarget.dataset.src}`
            observerTarget.removeAttribute('data-src')
          }

          // 在第一次曝光后就停止观察
          observer.unobserve(observerTarget)
        })
      },
      options,
    )

    ref.current && observer.observe(ref.current)

    return (
      <img ref={ref} data-src={src} {...otherProps} />
    )
  } else {
    return (
      <img src={src} {...otherProps} />
    )
  }
}
