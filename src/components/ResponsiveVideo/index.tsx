import * as React from 'react'
import { useRef, useState } from 'react'
import { useMatchMedia } from '@/src/utils'
import { VideoPropsType } from './types'
import './index.scss'

/**
 * 响应式视频组件
 */
export function ResponsiveVideo (props: VideoPropsType): JSX.Element {
  const {
    src,
    isLoop = true,
    muted = true,
    poster,
    isAutoplay = true,
    isControls = false,
    playBtnImage,
    className
  } = props
  /** 是否展示播放按钮 */
  const [ showIcon, setShowIcon ] = useState(!!playBtnImage)
  /** 是否展示视频原生控件 */
  const [ controls, setControls ] = useState(isControls)
  const videoEl = useRef<HTMLVideoElement>(null)
  const matchMedia = useMatchMedia()

  function handlePlayVideo() {
    videoEl.current?.play()
    setShowIcon(false)
    setControls(true)
  }

  return (
    <section className={`responsive-video ${className || ''}`}>
      <video
        ref={videoEl}
        src={src}
        muted={muted}
        autoPlay={isAutoplay}
        loop={isLoop}
        poster={matchMedia === 'mobile' ? poster?.mobile : poster?.widescreen}
        controls={controls}
        playsInline={true}
      />
      {
        showIcon &&
        <img
          className='responsive-video__button'
          src={ playBtnImage || '//i01.appmifile.com/webfile/globalimg/products/pc/mi11/play-btn.png' }
          onClick={handlePlayVideo}
        />
      }
    </section>
  )
}
