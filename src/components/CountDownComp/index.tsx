import * as React from 'react'
import {
  Fragment,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { useObservable } from 'rxjs-hooks'
import * as classNames from 'classnames'

import { timer } from 'rxjs'
import {
  distinctUntilChanged,
  map,
  tap,
  mapTo,
  delayWhen,
  skipWhile,
  filter,
} from 'rxjs/operators'

import { useIntl } from '@/src/utils'

import { CountDown } from '@/src/components'

// TS类型定义
import { CountDownCompTypes } from './types'
import { CountDownResult } from './../CountDown/types'

import './index.scss'

export function CountDownComp (props: CountDownCompTypes.CountDownCompProps): JSX.Element {
  const {
    time = 0,
    className,
    onStart,
    onFinish,
    onTiming,
    isAutoPlay,
    delayTime = 0,
    dataType = 'timeWithDays',
    displayType = 'text',
  } = props

  const intl = useIntl()
  const baseClassName = 'mi-count-down'
  const [ isAuto, setIsAuto ] = useState(isAutoPlay !== false)
  const [ delay, setDelay ] = useState(isAutoPlay !== false ? 0 : delayTime)

  useEffect(
    () => setIsAuto(isAutoPlay !== false),
    [ isAutoPlay ]
  )

  useEffect(
    () => setDelay(isAutoPlay !== false ? 0 : delayTime),
    [ delayTime ]
  )

  // 剩余秒数
  // 如果同时提供了 finishTime/requestTime/serverTime，则使用时间校准的更精确的倒计时。
  // 这里进行时间校准：Math.floor(Date.now() / 1000) - requestTime 表示客户端当前时间相对于请求接口时间过去的时间，+ serverTime表示服务端当前时间，与finishTime的差就是实际服务端倒计时时间。
  const remindSecond: number = useMemo(
    () => {
      return Number.isInteger(time)
        ? (time as number)
        : (time as CountDownCompTypes.TimeProperties).finishTime - (Math.floor(Date.now() / 1000) - (time as CountDownCompTypes.TimeProperties).requestTime + (time as CountDownCompTypes.TimeProperties).serverTime)
    },
    [ time ]
  )

  const [ isCounting ] = useObservable<[boolean], [boolean, number, number]>(
    (_state$, inputs$) => inputs$.pipe(
      distinctUntilChanged((prev, curr) => prev[0] === curr[0] && prev[1] === curr[1]),
      delayWhen(([ _isAuto, delaySeconds ]) => timer(delaySeconds * 1000)),
      map(([ isAutoPlay, delaySeconds ]) => {
        (delaySeconds > 0 || !!isAutoPlay) && typeof onStart === 'function' && onStart()
        return [ isAutoPlay ]
      }),
    ),
    [ false ],
    [ isAuto, delay, remindSecond ]
  )

  const { days, hours, minutes, seconds } = CountDown({
    remainTime: (delay > 0 || isCounting) ? remindSecond * 1000 : 0, // 剩余毫秒数
    delayTime : (delay || 0) * 1000,
    onCallback: () => typeof onFinish === 'function' ? onFinish() : null, // 回调函数
  })

  useObservable<void, [string]>(
    (_state$, inputs$) => inputs$.pipe(
      filter(() => typeof onTiming === 'function'),
      distinctUntilChanged((prev, curr) => prev[0] === curr[0]),
      map(([ seconds ]) => Number(seconds)),
      skipWhile((seconds) => seconds <= 0),
      tap((seconds) => typeof onTiming === 'function' && onTiming(seconds)),
      mapTo(undefined)
    ),
    undefined,
    [ seconds ]
  )

  function getValue (type: CountDownCompTypes.DataType): CountDownResult {
    const numDays    = Number(days)
    const numHours   = Number(hours)
    const numMinutes = Number(minutes)
    const numSeconds = Number(seconds)

    switch(type) {
      case 'seconds':
      case 'secondsWithText': {
        return {
          days   : '0',
          hours  : '00',
          minutes: '00',
          seconds: String(numSeconds + 60 * numMinutes + 60 * 60 * numHours + 60 * 60 * 24 * numDays).padStart(2, '0'),
        }
      }
      case 'timeWithoutDays': {
        return {
          days : '0',
          hours: String(numHours + 24 * numDays).padStart(2, '0'),
          minutes,
          seconds,
        }
      }
      default: {
        return {
          days,
          hours,
          minutes,
          seconds,
        }
      }
    }
  }

  function getStringResult(type: CountDownCompTypes.DataType): JSX.Element {
    switch(type) {
      case 'seconds': {
        return (
          <Fragment>
            {Number(getValue(type).seconds)}
          </Fragment>
        )
      }
      case 'secondsWithText': {
        return(
          <Fragment>
            {intl.get(`{n} seconds`, { n: Number(getValue(type).seconds) })}
          </Fragment>
        )
      }
      case 'timeWithDays': {
        const { days, hours, minutes, seconds } = getValue(type)

        // !!!翻译文本的末尾空格很重要，注意行末的这里「)} `」，不要误删
        // 汉语翻译平台配置结果: {n} days
        // 英语翻译平台配置结果: {n, plural, one {# day} other {# days}}
        // 俄语翻译平台配置结果: {n, plural, one {# day} few {# day} many {# days} other {# days}}
        const daysText = days === '0' ? '' : `${intl.get('{n} days', { n: Number(days) })} `

        return (
          <Fragment>
            {daysText && <strong className={`${baseClassName}__date`}>{daysText}</strong>}
            <strong className={`${baseClassName}__time ${baseClassName}__time--hours`}>{hours}</strong>
            <span className={`${baseClassName}__colon ${baseClassName}__colon--hours`}>:</span>
            <strong className={`${baseClassName}__time ${baseClassName}__time--minutes`}>{minutes}</strong>
            <span className={`${baseClassName}__colon ${baseClassName}__colon--minutes`}>:</span>
            <strong className={`${baseClassName}__time ${baseClassName}__time--seconds`}>{seconds}</strong>
          </Fragment>
        )
      }
      case 'timeWithoutDays': {
        const { hours, minutes, seconds } = getValue(type)

        return (
          <Fragment>
            <strong className={`${baseClassName}__time ${baseClassName}__time--hours`}>{hours}</strong>
            <span className={`${baseClassName}__colon ${baseClassName}__colon--hours`}>:</span>
            <strong className={`${baseClassName}__time ${baseClassName}__time--minutes`}>{minutes}</strong>
            <span className={`${baseClassName}__colon ${baseClassName}__colon--minutes`}>:</span>
            <strong className={`${baseClassName}__time ${baseClassName}__time--seconds`}>{seconds}</strong>
          </Fragment>
        )
      }
      default: {
        return (
          <Fragment/>
        )
      }
    }
  }

  return (
    <div
      className={classNames(
        baseClassName,
        {
          [`${baseClassName}--${displayType}`]: !!displayType,
        },
        className,
      )}
    >
      {getStringResult(dataType)}
    </div>
  )
}
