import * as React from 'react'
import { Fragment } from 'react'
import * as classNames from 'classnames'

// utils
import {
  priceFormat,
  useIntl,
  useScmConfig,
} from '@/src/utils'

// TS类型定义
import { PriceDisplayProps } from './types'

import './index.scss'

export function PriceDisplay (props: PriceDisplayProps): JSX.Element {
  const {
    salePrice,
    delPrice,
    isShowFrom,
    activityType,
    isHideDecimal,
    isDelPricePre,
    className,
    ...otherProps
  } = props // 父组件传入的参数

  const intl = useIntl()
  const scmConfig = useScmConfig()

  const currencySymbol = scmConfig.currencySymbol // 货币符号
  const currencyPosition = scmConfig.currencyPosition // 货币符号与金额的位置关系(pre 或 post)

  // 金额格式化，货币符号单独样式
  function formatSalePriceDOM () {
    return (
      <strong>
        {
          currencyPosition !== 'post' &&
          <small>{currencySymbol}</small>
        }
        {
          priceFormat(salePrice, scmConfig, Object.assign(
            { style: 'decimal' }, // 取出格式化金额，样式为不带货币符号
            isHideDecimal ? { minimumFractionDigits: 0 } : {}), // 小数部分个数设定为 0，不随 SCM 配置
          )
        }
        {
          currencyPosition === 'post' &&
          <small>{currencySymbol}</small>
        }
      </strong>
    )
  }

  // 给特殊文案加上HTML标签
  function stringToDOM (inputStr: string) {
    const str2Arr: any = inputStr.split(/#@@#/gi)

    // 非港台将“From”展示在金额前
    if (str2Arr[0]) {
      str2Arr[0] = (
        <span key={'from-dom'}>
          {str2Arr[0]}
        </span>
      )
    }

    // 金额部分转为 DOM
    str2Arr[1] = (
      <Fragment key={'sale-price-dom'}>
        {formatSalePriceDOM()}
      </Fragment>
    )

    // 港台的“$xx 起”在金额后
    if (str2Arr[2]) {
      str2Arr[2] = (
        <span key={'from-dom'}>
          {str2Arr[2]}
        </span>
      )
    }

    return (
      <Fragment>
        {str2Arr}
      </Fragment>
    )
  }

  // 划线价渲染
  function renderDelDom () {
    return (
      <Fragment>
        {
          !!delPrice && salePrice !== delPrice && // 划线价格
          <del>
            {
              priceFormat(delPrice, scmConfig, Object.assign(
                isHideDecimal ? { minimumFractionDigits: 0 } : {}), // 小数部分个数设定为 0，不随 SCM 配置
              )
            }
          </del>
        }
      </Fragment>
    )
  }

  // 售价渲染
  function renderSalePriceDom () {
    return (
      <Fragment>
        {
          isShowFrom // 是否展示 From 文案（如果是SPU可以使用此模式）
            ? stringToDOM(
              intl.get('From {price}', { price: '#@@#price#@@#' }), // #@@# 是标记分隔符，用以替换为 HTML 标签
            )
            : formatSalePriceDOM()
        }
      </Fragment>
    )
  }

  // 销售价在前
  function renderDefaultDom () {
    return (
      <Fragment>
        {
          renderSalePriceDom()
        }
        {
          activityType === 3 &&
          <i>{intl.get('(Deposit)')}</i>
        }
        {
          renderDelDom()
        }
      </Fragment>
    )
  }

  // 划线价在前
  function delPricePreDom () {
    return (
      <Fragment>
        {
          renderDelDom()
        }
        <section>
          {
            renderSalePriceDom()
          }
        </section>
      </Fragment>
    )
  }

  return (
    <div
      className={
        classNames(
          {
            [`mi-price`]    : true,
            [`${className}`]: !!className,
          }
        )
      }
      {...otherProps}
    >
      {isDelPricePre ? delPricePreDom() : renderDefaultDom()}
    </div>
  )
}
