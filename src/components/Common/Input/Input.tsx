import React from "react"
import classNames from "classnames"

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
    wrapperClassName = "",
}: InputProps) => {
    return (
        <div className={classNames("kms_input-wrapper", wrapperClassName)}>
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
