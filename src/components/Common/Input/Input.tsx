import React from "react"
import classNames from "classnames"

export interface InputProps {
    value?: string | number
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: "number" | "text" | "search" | "checkbox"
    rest?: any
    label?: string
    error?: string
    className?: string
    disabled?: boolean
}

const Input = ({
    onChange,
    onInput,
    disabled,
    value,
    type = "text",
    placeholder,
    rest = {},
    label = "",
    error,
    className,
}: InputProps) => {
    return (
        <div className="kms_input-wrapper">
            {label && <label className="kms_input-label">{label}</label>}
            <input
                data-testid={`input-${type}-${label}`}
                className={classNames("kms_input", className)}
                type={type}
                value={value}
                onInput={onInput}
                placeholder={placeholder}
                {...rest}
                onChange={onChange}
                disabled={disabled}
            />
            {error && <p className="kms_input-error">{error}</p>}
        </div>
    )
}

export default Input
