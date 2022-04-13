import { AnchorHTMLAttributes } from 'react'

export interface BaseLinkProps {
  children?: React.ReactNode
}

export type LinkProps = BaseLinkProps & AnchorHTMLAttributes<HTMLElement>