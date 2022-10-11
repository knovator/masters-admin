import React, { useRef } from "react"
import CSSTransition from "react-transition-group/CSSTransition"

import CloseIcon from "../../../icons/closeIcon"

interface ModalProps extends React.PropsWithChildren {
    open: boolean
    onClose: () => void
    title?: string
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
    const nodeRef = useRef(null)
    return (
        <CSSTransition
            ref={nodeRef}
            in={open}
            timeout={{ enter: 250, exit: 350 }}
            classNames="kms_modal"
            mountOnEnter
            unmountOnExit
        >
            <div className="kms_modal-wrapper-1" ref={nodeRef} data-testid="modal">
                <div className="kms_modal-wrapper-2">
                    <div
                        className="kms_modal-backdrop"
                        role="button"
                        onClick={onClose}
                        onKeyDown={onClose}
                        tabIndex={0}
                    />
                    <div className="kms_modal-container-1">
                        <div className="kms_modal-container-2">
                            <div className="kms_modal-main">
                                <div className="kms_modal-header">
                                    <span className="kms_modal-title">{title}</span>
                                    <button
                                        className="kms_modal-close"
                                        onClick={onClose}
                                        onKeyDown={onClose}
                                        tabIndex={-1}
                                        data-testid="modal-close"
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                                <div className="kms_p-4">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Modal
