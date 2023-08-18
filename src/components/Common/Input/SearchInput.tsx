import React from "react"
import classNames from "classnames"

const Input = ({
    onChange,
    onInput,
    disabled,
    value,
    placeholder,
    rest = {},
    className,
    wrapperClassName = "",
}: InputProps) => {
    return (
        <div className={classNames("kms_search-input-wrapper", wrapperClassName)}>
            <div className="kms_search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14.314" height="14.314" viewBox="0 0 16.314 16.314">
                    <path
                        d="M14.874,13.739l3.44,3.439-1.136,1.136-3.439-3.44a7.229,7.229,0,1,1,1.136-1.136Zm-1.611-.6a5.619,5.619,0,1,0-.12.12l.12-.12Z"
                        transform="translate(-2 -2)"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <input
                type="text"
                className={classNames("kms_search-input", className)}
                value={value}
                onInput={onInput}
                placeholder={placeholder}
                {...rest}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

export default Input
