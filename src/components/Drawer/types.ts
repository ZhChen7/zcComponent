type PlacrmentType = 'top' | 'bottom' | 'right' | 'left'

export interface DrawerProps {
  placement?: PlacrmentType
  visible?: boolean
  showMask?: boolean
  maskClosable?: boolean
  children?: React.ReactNode
  width?:  string | number
  height?: string | number
  onClose?: (e: React.MouseEvent) => void
  className?: string
  showheader?: boolean  // 默认头部
  title?: string // 头部文案
}