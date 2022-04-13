
import * as classNames from "classnames"
import * as React from "react"

import './stepItem.scss'

interface StepItemProps {
  itemKey: number
  stage?: string   // 当前步骤的阶段：done，active，empty
  title: string
  descript?: string
  step?: string
}

export function StepItem(props: StepItemProps): JSX.Element {
  const {
    title,
    descript,
    step,
    itemKey,
    stage
  } = props

  const classes = classNames(
    {
      'steps-icon micon'                   : true,
      [`icon-${stage} micon-step-${stage}`]: !!stage,
    }
  )

  return (
    <div className='steps-box'>
      <div>
        <i className={classes}>
          <div className={stage !== 'empty' ? 'line done-line' : 'line empty-line'}></div>
          <span className='icon-text'>{step || itemKey}</span>
          <div className={stage !== 'done' ? 'line empty-line' : 'line done-line'}></div>
        </i>
      </div>
      <div>
        <div className={`steps-title steps-${stage}`}>{title}</div>
        <div className='steps-descript'>{descript}</div>
      </div>
    </div>
  )
}