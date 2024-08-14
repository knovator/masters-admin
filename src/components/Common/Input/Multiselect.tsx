import React, { KeyboardEventHandler } from "react"
import CreatableSelect from "react-select/creatable"

interface Option {
    label: string
    value: string
}

interface MultiSelectProps {
    value: string[]
    onChange: (newValue: string[]) => void
    rest?: React.HTMLAttributes<HTMLDivElement>
    label?: string
    error?: string
    className?: string
    isRequired?: boolean
    disabled?: boolean
}

const components = {
    DropdownIndicator: null,
}

const createOption = (label: string): Option => ({
    label,
    value: label,
})

const Multiselect: React.FC<MultiSelectProps> = ({ onChange, label, error, isRequired, disabled, value }) => {
    const [inputValue, setInputValue] = React.useState<string | undefined>("")
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (!inputValue) return
        switch (event.key) {
            case "Enter":
            case "Tab":
                if (value === undefined) {
                    onChange([inputValue])
                    setInputValue("")
                    break
                }
                const updatedValue = [...value, inputValue]
                onChange(updatedValue)
                setInputValue("")
                event.preventDefault()
                break
        }
    }

    return (
        <div className="kms_input-wrapper">
            {label && <label className="kms_input-label">{label}</label>}
            <CreatableSelect
                isMulti
                isClearable
                components={components}
                inputValue={inputValue}
                menuIsOpen={false}
                onKeyDown={handleKeyDown}
                onInputChange={setInputValue}
                onChange={(newData) => {
                    onChange(newData.map((option) => option.value))
                }}
                placeholder="Enter Synonyms"
                value={value?.map(createOption)}
                isDisabled={disabled}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        border: "1px solid #94A3B8",
                        paddingTop: "0.1rem",
                        paddingBottom: "0.1rem",
                        borderRadius: "0.5rem",
                        outline: "4px solid transparent",
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: "#9CA3AF",
                        marginLeft: "0px",
                    }),
                }}
            />
            {error && <p className="kms_input-error">{error}</p>}
        </div>
    )
}

export default Multiselect
