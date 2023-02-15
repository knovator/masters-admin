import React, { forwardRef } from "react"

import { Form, ImageUpload } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { capitalizeFirstLetter, changeToCode } from "../../../utils/util"
import { useProviderState } from "../../../context/ProviderContext"

const SubMasterForm = forwardRef<HTMLFormElement | null, FormContainerProps>(({ schema }, ref) => {
    const { baseUrl } = useProviderState()
    const { onDataSubmit, updateData, formState, canAdd, canUpdate, onImageUpload, t, onImageRemove, imageBaseUrl } = useSubMasterState()
    const defaultSchema: SchemaType[] = [
        {
            label: `${t("name")}*`,
            accessor: "name",
            type: "text",
            placeholder: t("enterName"),
            onInput: handleCapitalize,
            validations: {
                required: t("requiredName"),
            },
        },
        {
            label: `${t("code")}*`,
            accessor: "code",
            type: "text",
            onInput: handleCode,
            editable: false,
            placeholder: t("enterCode"),
            validations: {
                required: t("requiredCode"),
            },
        },
        {
            label: t("webDisplay"),
            accessor: "webDsply",
            type: "text",
            onInput: handleCapitalize,
            placeholder: t("enterWebDisplay"),
        },
        {
            label: t("description"),
            accessor: "desc",
            type: "textarea",
            onInput: handleCapitalize,
            placeholder: t("enterDescription"),
        },
        {
            label: t("cover"),
            accessor: "img",
            Input: ({ field, error, setError }) => (
                <ImageUpload
                    imgId={field.value}
                    maxSize={10_485_760}
                    onError={setError}
                    error={error}
                    setImgId={(value) => {
                        field.onChange(value)
                    }}
                    baseUrl={imageBaseUrl ? imageBaseUrl :baseUrl}
                    text={
                        <>
                            <div className="kms_img-text-wrapper">
                                <label htmlFor="file-upload" className="kms_img-text-label">
                                    <span>{t("uploadFile")}</span>
                                </label>
                                <p className="kms_img-text-1">{t("dragDrop")}</p>
                            </div>
                            <p className="kms_img-text-2">{t("allowedFormat")}</p>
                        </>
                    }
                    onImageUpload={onImageUpload}
                    onImageRemove={onImageRemove}
                    className="kms_img-upload-wrapper-3"
                />
            ),
        },
        {
            label: t("active"),
            accessor: "isActive",
            type: "checkbox",
            defaultValue: true,
        },
    ]
    function handleCapitalize(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.value = capitalizeFirstLetter(event.target.value)
        return event
    }
    function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.value = changeToCode(event.target.value)
        return event
    }
    if (!canAdd && !canUpdate) return null
    return (
        <Form
            schema={schema ? schema : defaultSchema}
            onSubmit={onDataSubmit}
            ref={ref}
            data={updateData}
            isUpdating={formState === "UPDATE"}
        />
    )
})

export default SubMasterForm
