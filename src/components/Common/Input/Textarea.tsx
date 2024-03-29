import React from "react"
import classNames from "classnames"

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
    isRequired,
}: TextareaProps) => {
    return (
        <div className="kms_input-wrapper">
            {label && (
                <label className="kms_input-label">
                    {label}
                    {isRequired && <span className="kms_required_astrisk"> *</span>}
                </label>
            )}
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
