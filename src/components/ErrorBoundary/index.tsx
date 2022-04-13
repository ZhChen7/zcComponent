import * as React from 'react'
import { Component } from 'react'

// utils
import {
  sendErrorLog,
  useIntl,
  useScmConfig,
} from '@/src/utils'

// types
import { ErrorBoundaryProps, ErrorBoundaryPureProps } from './types'

interface ErrorBoundaryState {
  hasError: boolean
}

// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
class ErrorBoundaryPure extends Component<ErrorBoundaryPureProps, ErrorBoundaryState> {
  state = { hasError: false }

  componentDidCatch (error: any, _info: any) {
    // 使用 webpack-retry-chunk-load-plugin 自动重试
    // const pattern = /Loading.*chunk (\d)+ failed/g
    // const isChunkLoadFailed = (error.message || '').match(pattern)
    // if (isChunkLoadFailed) {
    //   window.location.reload()
    // }

    this.setState({ hasError: true })

    // !!window.Sentry && window.Sentry.captureException(error, { extra: info })

    return sendErrorLog(this.props.config, error)
  }

  render () {
    if (this.props.renderDomCb && this.state.hasError) {
      return this.props.renderDomCb()
    }

    return this.props.children
  }
}

export function ErrorBoundary (props: ErrorBoundaryProps) {
  const intl = useIntl()
  const scmConfig = useScmConfig()

  return (
    <ErrorBoundaryPure
      {...props}
      config={scmConfig}
      intl={intl}
    />
  )
}
