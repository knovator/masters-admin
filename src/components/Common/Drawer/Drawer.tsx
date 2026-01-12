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
            nodeRef={nodeRef}
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
                                <div className="kms_darwer-content">
                                    {/* Replace with your content */}
                                    {children}
                                    {/* /End replace */}
                                </div>
                                {footerContent && <div className="kms_drawer-footer">{footerContent}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Drawer
