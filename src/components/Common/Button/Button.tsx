import React from "react"
import classNames from "classnames"

interface ButtonProps {
    label: string
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
    variant?: "primary" | "secondary"
    size?: "sm" | "md"
}

const Button = ({ label, onClick, disabled, variant = "primary", size = "md" }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={classNames("kms_btn", {
                "kms_btn-primary": variant === "primary",
                "kms_btn-secondary": variant === "secondary",
                "kms_btn-sm": size === "sm",
            })}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button
