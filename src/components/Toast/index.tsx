import * as React from 'react'
import { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ClientOnlyPortal } from '../ClientOnlyPortal'
import * as classNames from 'classnames'

import './index.scss'

export type ToastType = 'success' | 'error' | 'none'
export interface ToastProps {
  className?: string
  /** 提示内容 */
  msg: string
  /** 类型 */
  type?: ToastType
  /** 回调函数 */
  callback?: () => void
  /** 显示关闭按钮 */
  showCloseBtn?: boolean
}

/**
 * @param {string} msg Toast显示的文案
 */

export function Toast (props: ToastProps):JSX.Element {
  const {
    msg,
    callback,
    className
  } = props

  const [ isShow, setIsShow ] = useState<boolean>(!!msg)
  const [ timer, setTimer ] = useState<NodeJS.Timeout>()

  useEffect(
    () => setIsShow(!!msg), // 更新本地 state
    [ msg ],
  )

  useEffect(
    () => {
      if (isShow && timer) {
        clearTimeout(timer)
      }

      if (isShow === true) {
        const fadeTime = (msg || '').length / 50 * 1000 // 根据文案长度设置消失时间
        const newTimer = setTimeout(
          () => {
            setIsShow(false)
            typeof callback === 'function' && callback()
          },
          fadeTime < 3000 ? 3000 : ~~fadeTime,
        )

        setTimer(newTimer)
      } else {
        !!timer && clearTimeout(timer)
      }

      return () => {
        !!timer && clearTimeout(timer)
      }
    },
    [ isShow ],
  )

  return (
    <ClientOnlyPortal className='mi-toast'>
      <TransitionGroup component={null}>
        {
          isShow &&
          <CSSTransition
            classNames='mi-toast__wrapper'
            timeout={500}
          >
            <div
              className={
                classNames('mi-toast__main', className)
              }>
              <div className='mi-toast__content'>
                <p>{msg}</p>
              </div>

            </div>

          </CSSTransition>
        }
      </TransitionGroup>
    </ClientOnlyPortal>
  )
}