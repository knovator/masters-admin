import React from "react"
import CloseIcon from "icons/closeIcon"

interface ModalProps extends React.PropsWithChildren {
  open: boolean
  onClose: () => void
  title?: string
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null
  return (
    <div className="kms_modal-wrapper-1">
      <div className="kms_modal-wrapper-2">
        <div className="kms_modal-backdrop" role="backdrop" onClick={onClose} />
        <div className="kms_modal-container-1">
          <div className="kms_modal-container-2">
            <div className="kms_modal-main">
              <div className="kms_modal-header">
                <span className="kms_modal-title">{title}</span>
                <a href="#" className="kms_modal-close" onClick={onClose}>
                  <CloseIcon />
                </a>
              </div>
              <div className="p-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
