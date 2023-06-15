import React, { forwardRef, MutableRefObject, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

import { TRANSLATION_PAIRS_COMMON } from "../../../constants/common"
import { isEmpty } from "../../../utils/util"
import Input from "../Input"

interface FormProps {
    schema: SchemaType[]
    data?: any
    isUpdating?: boolean
    languages?: LanguageType[]
    indicatesRequired?: string
    onSubmit: (data: any) => void
    ref: MutableRefObject<HTMLFormElement | null>
}

const Form = forwardRef<HTMLFormElement | null, FormProps>(
    (
        {
            schema,
            onSubmit,
            data,
            isUpdating = false,
            languages,
            indicatesRequired = TRANSLATION_PAIRS_COMMON.indicatesRequired,
        },
        ref,
    ) => {
        const {
            register,
            formState: { errors },
            control,
            handleSubmit,
            reset,
            setValue,
            setError,
        } = useForm()

        // setting data values
        useEffect(() => {
            if (!isEmpty(data)) {
                schema.forEach((schemaItem) => {
                    setValue(schemaItem.accessor, data[schemaItem.accessor])
                })
            }
        }, [data, reset, schema, setValue])

        // setting default values
        useEffect(() => {
            if (isEmpty(data)) {
                let defaultValues = schema.reduce(
                    (values: Record<string, string | number | boolean>, schemaItem: SchemaType) => {
                        if (typeof schemaItem.defaultValue !== "undefined")
                            values[schemaItem.accessor] = schemaItem.defaultValue
                        return values
                    },
                    {},
                )
                reset(defaultValues)
            }
        }, [data, reset, schema])

        const inputRenderer = (schema: SchemaType) => {
            let input
            if (schema.type) {
                switch (schema.type) {
                    case "checkbox":
                        input = (
                            <Input.Checkbox
                                error={errors[schema.accessor]?.message}
                                label={schema.label}
                                rest={register(schema.accessor, schema.validations || {})}
                                className="kms_block"
                                disabled={isUpdating && typeof schema.editable !== "undefined" && !schema.editable}
                            />
                        )
                        break
                    case "select":
                        input = (
                            <Input.Select
                                options={schema.options}
                                label={schema.label}
                                error={errors[schema.accessor]?.message}
                                rest={register(schema.accessor, schema.validations || {})}
                                className="kms_w-full"
                                disabled={isUpdating && typeof schema.editable !== "undefined" && !schema.editable}
                                isRequired={schema.isRequired}
                            />
                        )
                        break
                    case "textarea":
                        input = (
                            <Input.Textarea
                                error={errors[schema.accessor]?.message}
                                label={schema.label}
                                rest={register(schema.accessor, schema.validations || {})}
                                onInput={schema.onInput}
                                disabled={isUpdating && schema.editable}
                                className="kms_w-full kms_p-2"
                                placeholder={schema.placeholder}
                                isRequired={schema.isRequired}
                            />
                        )
                        break
                    case "text":
                    case "number":
                    default:
                        if (Array.isArray(languages) && languages.length > 0 && schema.accessor === "names") {
                            input = languages.map((lang) => (
                                <Input
                                    key={lang.code}
                                    rest={register(`${schema.accessor}.${lang.code}`, schema.validations || {})}
                                    label={schema.label + " (" + lang.name + ")"}
                                    onInput={schema.onInput}
                                    error={errors[schema.accessor]?.message}
                                    isRequired={schema.isRequired}
                                    // @ts-ignore
                                    type={schema.type}
                                    className="kms_w-full kms_p-2"
                                    placeholder={(schema.placeholder || "") + " (" + lang.name + ")"}
                                    disabled={isUpdating && typeof schema.editable !== "undefined" && !schema.editable}
                                />
                            ))
                        } else
                            input = (
                                <Input
                                    rest={register(schema.accessor, schema.validations || {})}
                                    label={schema.label}
                                    onInput={schema.onInput}
                                    isRequired={schema.isRequired}
                                    error={errors[schema.accessor]?.message}
                                    type={schema.type}
                                    className="kms_w-full kms_p-2"
                                    placeholder={schema.placeholder}
                                    disabled={isUpdating && typeof schema.editable !== "undefined" && !schema.editable}
                                />
                            )
                        break
                }
            } else if (schema.Input) {
                input = (
                    <div className="kms_input-wrapper">
                        <label className="kms_input-label">{schema.label}</label>
                        <Controller
                            control={control}
                            name={schema.accessor}
                            rules={schema.validations}
                            render={({ field }) =>
                                schema.Input!({
                                    field,
                                    error: errors[schema.accessor]?.message,
                                    setError: (msg) =>
                                        setError.call(null, schema.accessor, { type: "custom", message: msg }),
                                })
                            }
                        />
                    </div>
                )
            } else throw new Error(`Please provide Input or type prop to render input Labeled ${schema.label}`)

            return input
        }

        const onFormSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            handleSubmit((data) => {
                let formattedData = schema.reduce(
                    (values: Record<string, string | number | boolean>, schemaItem: SchemaType) => {
                        // Do not add field if editing is disabled for it
                        if (isUpdating && typeof schemaItem.editable !== "undefined" && !schemaItem.editable)
                            return values

                        values[schemaItem.accessor] = data[schemaItem.accessor]
                        return values
                    },
                    {},
                )
                onSubmit(formattedData)
            })()
        }

        return (
            <form onSubmit={onFormSubmit} ref={ref} className="kms_form">
                {schema.map((schema, i) => (
                    <React.Fragment key={i}>{inputRenderer(schema)}</React.Fragment>
                ))}
                <p>
                    <b className="kms_required_astrisk">*</b> {indicatesRequired}
                </p>
            </form>
        )
    },
)

export default Form
