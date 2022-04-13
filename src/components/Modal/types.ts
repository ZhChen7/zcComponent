export interface ModalProps {
  // 是否显示弹框
  isModalShow: boolean
  // 隐藏弹框
  closeModal: () => void
  // 头图链接
  picture?: string
  // 标题
  title?: string
  // 副标题/附加信息
  extra?: React.ReactNode
  // 标题居中 center 居左 left (默认居中)
  titleLayOut?: string
  // 是否显示关闭按钮
  isShowCloseIcon?: boolean
  // 弹框内容
  children: React.ReactNode
  // 确认 cb
  confirm?: () => void
  // 取消 cb
  cancel?: () => void
  // 确认文案
  confirmText?: string
  // 取消文案
  cancelText?: string
  // 额外的样式类名
  extraClassName?: string
  // 点击遮罩层是否需要关闭弹窗框
  shouldCloseOnOverlayClick?: boolean
  // 遮罩层className
  overlayClassName?: string
}
