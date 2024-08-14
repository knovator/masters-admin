import React, { useCallback, useRef, useState } from "react"
import ReactSelect from "react-select/async"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { MultiValue, SingleValue } from "react-select"

type OptionType = { label: string; value: string }

interface ReactSelectProps {
    onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: any) => void
    label?: string
    error?: string
    className?: string
    disabled?: boolean
    value?: string
    id?: string
    isMulti?: boolean
    isRequired?: boolean
    selectedOptions?: MultiValue<OptionType> | SingleValue<OptionType>
    isSearchable?: boolean
    placeholder?: string
    data: any
}

const MergeInput = ({
    onChange,
    label,
    error,
    isMulti = true,
    selectedOptions: initialSelectedOptions = [],
    isRequired,
    isSearchable = true,
    placeholder,
    data,
}: ReactSelectProps) => {
    const callerRef = useRef<NodeJS.Timeout | null>(null)
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType> | SingleValue<OptionType>>(
        initialSelectedOptions,
    )

    const { getSubMastersList } = useSubMasterState()
    const loadSubMasterOptions = useCallback(
        (inputValue: string, callback: (options: OptionType[]) => void) => {
            if (callerRef.current) clearTimeout(callerRef.current)

            callerRef.current = setTimeout(async () => {
                try {
                    getSubMastersList({ search: inputValue, all: false, exclude: data?._id }, (subMasters) => {
                        const options =
                            subMasters?.map((item: any) => ({
                                label: item.names.en,
                                value: item._id,
                            })) || []
                        callback(options)
                    })
                } catch (error) {
                    console.error("Error loading submaster options:", error)
                }
            }, 300)
        },
        [getSubMastersList],
    )

    return (
        <div className="kms_input-wrapper">
            {label && <label className="kms_input-label">{label}</label>}
            <ReactSelect
                data-testid={`input-select-${label}`}
                value={selectedOptions}
                onChange={(newValue, actionMeta) => {
                    setSelectedOptions(newValue)
                    if (onChange) {
                        onChange(newValue, actionMeta)
                    }
                }}
                isMulti={isMulti}
                defaultOptions
                isSearchable={isSearchable}
                loadOptions={loadSubMasterOptions}
                placeholder={placeholder}
                isDisabled={false}
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
            {error && <p className="khb_input-error">{error}</p>}
        </div>
    )
}

export default MergeInput
