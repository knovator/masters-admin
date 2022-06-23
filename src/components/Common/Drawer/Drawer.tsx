import React, { useRef } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import CloseIcon from "../../../icons/closeIcon"

interface DrawerProps extends React.PropsWithChildren {
    open: boolean
    onClose: () => void
    title?: string
    footerContent?: React.ReactNode
}

const Drawer = ({ children, open, onClose, title, footerContent }: DrawerProps) => {
    const nodeRef = useRef(null)
    return (
        <CSSTransition
            ref={nodeRef}
            in={open}
            timeout={{ enter: 250, exit: 350 }}
            classNames="kms_drawer"
            mountOnEnter
            unmountOnExit
        >
            <div
                className="kms_drawer-wrapper-1"
                aria-labelledby="modal"
                role="dialog"
                aria-modal="true"
                ref={nodeRef}
                data-testid="drawer"
            >
                <div className="kms_drawer-wrapper-2">
                    <div
                        className="kms_drawer-backdrop"
                        role="button"
                        onClick={onClose}
                        onKeyDown={onClose}
                        tabIndex={0}
                    />
                    <div className="kms_drawer-container-1">
                        <div className="kms_drawer-container-2">
                            <div className="kms_drawer-close-section">
                                <button
                                    type="button"
                                    className="kms_drawer-close-btn"
                                    onClick={onClose}
                                    data-testid="drawer-close"
                                >
                                    <span className="kms_sr-only">Close panel</span>
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="kms_drawer-main">
                                <div className="kms_drawer-header">
                                    <p className="kms_drawer-header-title">{title}</p>
                                </div>
                                <div className="relative flex-1 px-6 py-6 overflow-auto">
                                    {/* Replace with your content */}
                                    {children}
                                    {/* /End replace */}
                                </div>
                                {footerContent && (
                                    <div className="flex items-center justify-end gap-3 px-4 py-4 border-t modal-footer bg-slate-50 border-light-gray">
                                        {footerContent}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Drawer
