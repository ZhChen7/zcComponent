// 解决页面中出现多个 portal 元素的问题：https://github.com/reactjs/react-modal/issues/75
// 写法参考 next.js，并略微调整：https://github.com/zeit/next.js/blob/canary/examples/with-portals/components/ClientOnlyPortal.js
import {
  useRef,
  useEffect,
  useState,
  ReactPortal,
} from 'react'
import { createPortal } from 'react-dom'

interface ClientOnlyPortalProps {
  children: JSX.Element
  className: string
}

export function ClientOnlyPortal (props: ClientOnlyPortalProps): ReactPortal | null {
  const {
    children,
    className,
  } = props

  const ref = useRef<any>(null)
  const [ mounted, setMounted ] = useState(false)

  useEffect(
    () => {
      let dom = document.querySelector(`.${className}`)
      const body = document.querySelector('body')

      if (!dom) {
        dom = document.createElement('div')
        dom.setAttribute('class', className)
        body && body.appendChild(dom)
      }

      ref.current = dom
      setMounted(true)
    },
    [ className ],
  )

  return mounted ? createPortal(children, ref.current) : null
}
