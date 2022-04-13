/**
 * 【翻译高亮组件】
 * 翻译中的文本需要高亮，文本中需要前后标记 #@@#
 * 翻译中的数字部分需要高亮，请传入 type = 'number'，函数会默认给数字部分前后添加 #@@# 标记
 * 翻译中的 #@@# 高亮文本需要添加链接，则对应的链接需要传入 linkArr 数组中
 * @param inputStr 传入的文本，需要高亮的文字前后需要添加#@@#
 * @param linkArr? 传入的链接列表，与高亮文本数量对应
 * @param type? 如果只高亮文本中的数字，不需要添加#@@#包裹，只需传入 type='number' 即可自动处理
 * @param countdown? 倒计时组件参数
 */

import * as React from 'react'
import { Fragment } from 'react'

import { CountDownComp, MiIcon } from '@/src/components'

// TS类型定义
import { StringHighlightProps } from './types'

export function StringHighlight (props: StringHighlightProps): JSX.Element {
  const {
    inputStr,
    linkArr,
    type,
    target,
    onClick,
    countdown,
  } = props

  // 替换倒计时
  const replaceCountDown: any = inputStr.split(/#@cd@#/gi)
  const hasCountDown: boolean = replaceCountDown.length > 1

  if (hasCountDown) {
    // 存在倒计时关键字，处理倒计时组件
    for (let i = 1; i < replaceCountDown.length; i += 2) {
      replaceCountDown[i] = (
        <Fragment key={'highlight-countdown'}>
          {countdown && <CountDownComp {...countdown} />}
        </Fragment>
      )
    }
  }

  // 上述剩余部分，替换图标
  const replaceIcon = replaceCountDown.map((item: any) => {
    if (typeof item === 'string') {
      const stringArr: any = item.split(/#@icon@#/gi)

      for (let i = 1; i < stringArr.length; i += 2) {
        stringArr[i] = (<MiIcon key={`highlight-icon-${i}`} symbol={stringArr[i]}/>)
      }
      return stringArr
    } else {
      // 非字符串类型，已不是文本，可能是倒计时组件，直接返回自身
      return item
    }
  })

  // 处理剩余字符串文本
  const str2Arr = getFlatData(replaceIcon).map((item: any) => {
    if (typeof item === 'string') {
      // 以数字部分做高亮
      const newItem = type === 'number' ? item.replace(/[+-]?(0|([1-9]\d*))(\.\d+)?/g, '#@@#$&#@@#') : item // 将数字部分以分隔符包裹
      const stringArr: any = newItem.split(/#@@#/gi)

      for (let i = 1; i < stringArr.length; i += 2) {
        const linkStr: string = (!!linkArr && linkArr[~~(i / 2)]) || '' // 获取对应的链接
        stringArr[i] = linkStr
          ? ( // 有链接，链接部分前后包裹<a>
              <a target={target} key={`highlight-${i}`} onClick={(e) => typeof onClick === 'function' && onClick(e, linkStr)} href={linkStr}>{stringArr[i]}</a>
            )
          : ( // 无链接，高亮部分前后添加<strong>
              <strong key={`highlight-${i}`}>{stringArr[i]}</strong>
            )
      }
      return stringArr
    } else {
      // 非字符串类型，已不是文本，可能是倒计时组件，直接返回自身
      return item
    }
  })

  function getFlatData (inputArr: unknown[]) {
    return inputArr
      // .flatMap((el: any) => el)
      // 由于 flatMap 在客户端的 WebView 中有兼容问题，因此使用 map + map + reduce 转写
      .map((el: any) => Array.isArray(el) ? [ ...el ] : [ el ])
      .reduce((acc: any, cur: any) => [ ...acc, ...cur.filter((el: any) => typeof el !== 'undefined') ], [])
  }

  return (
    <Fragment>
      {getFlatData(str2Arr)}
    </Fragment>
  )
}
