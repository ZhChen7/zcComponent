import { useObservable } from 'rxjs-hooks'

// RxJS
import {
  of,
  timer,
  EMPTY,
} from 'rxjs'
import {
  distinctUntilChanged,
  expand,
  filter,
  map,
  tap,
  skipWhile,
  delayWhen,
  switchMap,
} from 'rxjs/operators'

import type { CountDownProps, CountDownResult } from './types'

export function CountDown (props: CountDownProps): CountDownResult {
  const {
    remainTime,
    delayTime = 0,
    onCallback,
  } = props

  /** 秒与毫秒比例 */
  const INTERVAL_TIMES = 1000

  /** 误差校准秒数 */
  const OFFSET_SECONDS = 1

  /**
   * countdownMillisecond 倒计时初始剩余毫秒数，方便控制误差
   * startMillisecond 倒计时开始时间戳，用于计算误差
   */
  const [ countdownMillisecond, startMillisecond ] = useObservable<[number, number], [number, number]>(
    (_state$, inputs$) => inputs$.pipe(
      map((val) => [ 0, 0, ...val ]),
      delayWhen(([ _countdown, _startTime, _remainTime, delayTime ]) => timer(delayTime)),
      map(([ _countdown, _startTime, remainTime, _delayTime ]) => remainTime),
      map((remainTime) => [ Number(remainTime > 0 ? remainTime : 0), Date.now() ]),
    ),
    [ 0, 0 ],
    [ remainTime, delayTime ]
  )

  // 剩余: 天/时/分/秒
  const [ days, hours, minutes, seconds ] = useObservable<[string, string, string, string], [number, number]>(
    (_state$, inputs$) => inputs$.pipe(
      skipWhile(([ countdownMillisecond ]) => countdownMillisecond < 0), // 防止数据进入时为空
      /** 处理倒计时时间、开始时间戳，转为 [ 开始时间戳, 剩余毫秒, 等待间隔 ] */
      map(([ countdownMillisecond, startMillisecond ]) => [ countdownMillisecond - INTERVAL_TIMES, startMillisecond, 1, INTERVAL_TIMES ]),
      filter(([ countdownMillisecond ]) => countdownMillisecond > 0),
      switchMap(
        (data) => of(data).pipe(
          expand(
            (data) => {
              const [ remainMillisecond ] = data
              return remainMillisecond <= 0
                ? EMPTY // 停止循环
                : of(data).pipe(
                  map(([ remainMillisecond, startTimestamp, intervalCount, _intervalTime ]) => {
                    const currentRemainMillisecond = remainMillisecond - INTERVAL_TIMES
                    const currentIntervalCount = intervalCount + 1
                    const currentOffsetTime = Date.now() - (startTimestamp + currentIntervalCount * INTERVAL_TIMES) // 计算误差
                    const offsetTime = currentOffsetTime <= 0 ? 0 : currentOffsetTime
                    const nextTimestamp = INTERVAL_TIMES - offsetTime // 记录下次开始时间，消除误差
                    const nextIntervalTime = nextTimestamp < 0 ? 0 : nextTimestamp > INTERVAL_TIMES ? INTERVAL_TIMES : nextTimestamp

                    // 如果误差大于 5 秒，则立即矫正，避免出现连续多次加速现象
                    const delaySeconds = (nextIntervalTime === 0 && (offsetTime >= OFFSET_SECONDS * INTERVAL_TIMES)) ? Math.floor(offsetTime / INTERVAL_TIMES) : 0
                    const nextRemainMillisecond = currentRemainMillisecond - (delaySeconds * INTERVAL_TIMES)
                    const nextIntervalCount = currentIntervalCount + delaySeconds

                    return [
                      nextRemainMillisecond >= 0 ? nextRemainMillisecond : 0,
                      startTimestamp,
                      nextIntervalCount,
                      nextIntervalTime
                    ]
                  }),
                  distinctUntilChanged((prev, curr) => prev.map((el, idx) => curr[idx] === el).every((el) => el === true)),
                  delayWhen(([ _remainMillisecond, _startTimestamp, _intervalCount, intervalTime ]) => timer(intervalTime)), // 指定时间后重启
                )
            }
          ),
        )
      ),
      map(([ remainMillisecond, _startTimestamp, _intervalCount, _intervalTime ]) => remainMillisecond),
      distinctUntilChanged(),
      map((remainMillisecond) => remainMillisecond / INTERVAL_TIMES),
      tap((remainTime) => remainTime <= 0 && typeof onCallback === 'function' && onCallback()),
      map((remainTime) => {
        const days    = String( Math.floor(remainTime / (24 * 60 * 60)) )
        const hours   = String( Math.floor(remainTime / (60 * 60) % 24) ).padStart(2, '0')
        const minutes = String( Math.floor(remainTime / 60 % 60)        ).padStart(2, '0')
        const seconds = String( Math.floor(remainTime % 60)             ).padStart(2, '0')

        return [ days, hours, minutes, seconds ]
      }),
    ),
    [ '0', '00', '00', '00' ],
    [ countdownMillisecond, startMillisecond ]
  )

  return { days, hours, minutes, seconds }
}
