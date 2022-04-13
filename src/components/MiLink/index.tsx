import * as React from 'react'

// type
import { LinkProps } from "./type"

// utils
import { isThirdPartyPage } from '@/src/utils'


export function MiLink(props:LinkProps): JSX.Element {
  const {
    children,
    href = '',
    rel = '',
    target,
    ...restProps
  } = props

  // 是否为第三方链接
  const isThirdPage = isThirdPartyPage(href)

  // 获取rel属性
  function getAnchorRelAttr(): string {
    const cutting = rel.includes(',') ? ',' : ' '
    const relArray = rel.split(cutting)
    const baseRel = isThirdPage ? [ 'noopenner', 'noreferrer', 'nofollow' ] : []
    return Array.from(new Set(baseRel.concat(relArray))).join(' ')
  }

  // 获取target属性
  function getAnchorTargetAttr(): string|undefined {
    return isThirdPage ? '_blank' : target
  }

  return (
    <a
      href={href}
      target={getAnchorTargetAttr()}
      rel={getAnchorRelAttr() || undefined}
      {...restProps}
    >
      {children}
    </a>
  )
}