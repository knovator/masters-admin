import React, { ReactNode } from "react"

const Tooltip = ({ message, children }: { message: string; children: ReactNode }) => {
    return (
        <div className="kms_tooltip">
            {children}
            <div className="kms_tooltip-side">
                <span className="kms_tooltip-content">{message}</span>
                <div className="kms_tooltip-block"></div>
            </div>
        </div>
    )
}

export default Tooltip
