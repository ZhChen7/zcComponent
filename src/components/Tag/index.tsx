import * as React from 'react'
import { useEffect } from 'react'
import classNames from 'classnames'
import {
  PresetColorTypes,
  PresetStatusColorTypes,
  PresetColorType,
  PresetStatusColorType,
} from './color'
import {
  LiteralUnion,
  omit,
  usePrefixCls
} from '@/src/utils'
import './index.scss'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string
  className?: string
  color?: LiteralUnion<PresetColorType | PresetStatusColorType, string>
  visible?: boolean
  style?: React.CSSProperties
  tagName?: string
  icon?: React.ReactNode
}

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`)
const PresetStatusColorRegex = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`)

export type TagType=React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>>
const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    tagName,
    icon,
    color,
    ...props
  }: TagProps,
  ref,
) => {
  const [ visible, setVisible ] = React.useState(true)

  useEffect(() => {
    if ('visible' in props) {
      setVisible(!!props.visible)
    }
  }, [ props.visible ])

  const isPresetColor = (): boolean => {
    if (!color) {
      return false
    }
    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color)
  }

  const tagStyle = {
    backgroundColor: color && !isPresetColor() ? color : undefined,
    ...style,
  }

  const presetColor = isPresetColor()
  const prefixCls = usePrefixCls('tag', customizePrefixCls)
  const tagClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}--${color}`] : presetColor,
      [`${prefixCls}--has-color`]: color && !presetColor,
      [`${prefixCls}--hidden`]   : !visible,
    },
    className
  )
  const tagProps = omit(props as Record<string, unknown>, [ 'visible' ])
  const iconNode = icon || null
  const kids = iconNode
    ? (
        <>
          {iconNode}
          <span className={`${prefixCls}__text`}>{children}</span>
        </>
      )
    : (
        children
      )

  const tagNode = React.createElement(
    tagName || 'span',
    Object.assign({}, {
      ...tagProps,
      ref,
      className: tagClassName,
      style    : tagStyle
    }),
    <span
      className={`${prefixCls}__text ${prefixCls}__text--ellipsis`}
    >
      {kids}
    </span>
  )

  return  tagNode
}

export const Tag = React.forwardRef<unknown, TagProps>(InternalTag) as TagType

