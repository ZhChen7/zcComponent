import * as React from 'react'
import * as ReactModal from 'react-modal'
import classNames from 'classnames'

import './index.scss'
import { ModalProps } from './types'

interface ModalInterface extends ModalProps {
  styleMode: 'mobile' | 'responsive'   // mobile为底部弹出， responsive为页面居中显示
}

ReactModal.setAppElement('body')

export function Modal (props: ModalInterface): JSX.Element {
  const {
    isModalShow,
    closeModal,
    picture,
    title,
    extra,
    titleLayOut,
    isShowCloseIcon,
    children,
    confirm,
    cancel,
    confirmText,
    cancelText,
    extraClassName,
    styleMode,
    shouldCloseOnOverlayClick = true,
    overlayClassName,
  } = props

  function toggleBodyOverflowHidden(isAdd: boolean) {
    if (isAdd) {
      // 由于滚动条消失，页面会出现偏移，要增加 margin-right 抵消
      document.body && document.body.style && (document.body.style.marginRight = `${window.innerWidth - document.body.offsetWidth}px`)
      // 添加样式，使得页面无法滚动
      document.body && document.body.classList && document.body.classList.add('mi-modal__Body--overflow-hidden')
    } else {
      // 滚动条出现，margin-right 归位
      document.body && document.body.style && (document.body.style.marginRight = `0px`)
      // 移除样式，使页面可以滚改动
      document.body && document.body.classList && document.body.classList.remove('mi-modal__Body--overflow-hidden')
    }
  }

  return (
    <ReactModal
      contentLabel='Modal'
      isOpen={isModalShow}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onAfterOpen={() => toggleBodyOverflowHidden(true)}
      onAfterClose={() => toggleBodyOverflowHidden(false)}
      onRequestClose={() => typeof closeModal === 'function' && closeModal()}
      closeTimeoutMS={200} // 关闭动画时间
      portalClassName={`mi-modal mi-modal--${styleMode}`}
      overlayClassName={classNames('mi-modal__overlay', overlayClassName)}
      className={[ 'mi-modal__content', ...(extraClassName || '').split(' ') ].filter((el: string) => !!el).join(' ')}
    >
      {
        !!picture &&
        <div className='mi-modal__picture'>
          <img className='mi-modal__picture-icon' src={picture || '//i01.appmifile.com/webfile/globalimg/support/modal-picture-demo.png'} alt='picture' />
        </div>
      }
      {
        !!title &&
        <header className='mi-modal__header'>
          <div className='mi-modal__title-wrap'>
            <p
              className={classNames('mi-modal__title', {
                'mi-modal__title--left'  : titleLayOut === 'left',
                'mi-modal__title--center': titleLayOut !== 'left'
              })}
            >
              {title}
            </p>
          </div>
          {
            !!extra &&
            <div className={`mi-modal__extra`}>
              {extra}
            </div>
          }
        </header>
      }
      {
        !!isShowCloseIcon &&
        <i
          className='micon micon-dialog-close'
          aria-label='close'
          onClick={() => {typeof closeModal === 'function' && closeModal()}}
        />
      }

      <main className='mi-modal__main'>
        {children}
      </main>

      {
        (cancel || confirm) &&
        <footer className='mi-modal__footer'>
          {
            cancel &&
            <div
              role='button'
              className='mi-modal__button mi-modal__button--cancel'
              onClick={() => {typeof cancel === 'function' && cancel()}}
            >
              {cancelText || 'Cancel'}
            </div>
          }
          {
            confirm &&
            <div
              role='button'
              className='mi-modal__button mi-modal__button--confirm'
              onClick={() => {typeof confirm === 'function' && confirm()}}
            >
              {confirmText || 'Confirm'}
            </div>
          }
        </footer>
      }
    </ReactModal>
  )
}
