import { IntlType, NationConfigProps } from '@/src/types'

export interface ErrorBoundaryProps {
  renderDomCb?: () => JSX.Element
  children: React.ReactNode
}

export interface ErrorBoundaryPureProps extends ErrorBoundaryProps, NationConfigProps {
  intl: IntlType
}
