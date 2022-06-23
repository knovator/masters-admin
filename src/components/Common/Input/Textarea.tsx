import React from "react"
import classNames from "classnames"

export interface TextareaProps {
    value?: string | number
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    rest?: any
    label?: string
    error?: string
    disabled?: boolean
    className?: string
}
const Textarea = ({
    onChange,
    onInput,
    value,
    placeholder,
    rest,
    label,
    error,
    disabled,
    className,
}: TextareaProps) => {
    return (
        <div className="kms_input-wrapper">
            <label className="kms_input-label">{label}</label>
            <textarea
                data-testid={`input-textarea-${label}`}
                className={classNames("kms_input", className)}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onInput={onInput}
                disabled={disabled}
                {...rest}
            />
            {error && <p className="kms_input-error">{error}</p>}
        </div>
    )
}

export default Textarea
