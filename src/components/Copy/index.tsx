import * as React from 'react'
import { useEffect } from 'react'
import * as Clipboard from 'clipboard'

interface CopyPorps {
  copyValue: string
  successCopy?: () => void
  errorCopy?: () => void
  children: React.ReactNode
}
/**
 * 复制到粘贴板
 * @param copyValue 要复制的值
 * @param children 复制按钮
 * @param successCopy 可选 复制成功回调操作
 * @param errorCopy 可选 复制失败回调操作
 *
 */
const Copy: React.FC<CopyPorps> = (props:CopyPorps) => {
  const { copyValue, children } = props
  useEffect(() => {
    const clipboard = new Clipboard('.J_copy_btn')
    clipboard.on('success', () => {
      props.successCopy?.()
    })

    clipboard.on('error', () => {
      props.errorCopy?.()
    })
  })
  return (
    <>
      <span className='J_copy_btn' data-clipboard-action='copy' data-clipboard-text={copyValue}>
        {children}
      </span>
    </>
  )
}

export default Copy