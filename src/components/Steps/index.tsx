import * as React from "react"

import './index.scss'
import { StepItem } from "./stepItem"

interface StepsProps {
  layoutType?: string
  type?: string
  progress: number
  children:JSX.Element[]
  className?: string
}

export const Steps = function(props: StepsProps): JSX.Element {

  const {
    // layoutType,
    // type,
    children,
    progress,
    className
  } = props

  //  处理返回children数据，根据当前进度，进行设置样式
  const cloneChildren = children.map((item, index) => {
    const config = {
      stage: 'done'
    }
    if(index + 1 < progress) {
      config.stage = 'done'
    } else if(index + 1 === progress){
      config.stage = 'active'
    } else {
      config.stage = 'empty'
    }
    return  React.cloneElement(item, config)
  })

  return (
    <div className={`components-steps ${className}`}>
      {/* <div>{layoutType}{type}</div> */}
        {...cloneChildren}
    </div>
  )
}
Steps.item = StepItem