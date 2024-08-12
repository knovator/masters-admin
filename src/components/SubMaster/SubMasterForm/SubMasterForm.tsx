import React, { forwardRef } from "react"

import { Form, ImageUpload } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { capitalizeFirstLetter, changeToCode } from "../../../utils/util"
import { useProviderState } from "../../../context/ProviderContext"

const SubMasterForm = forwardRef<HTMLFormElement | null, FormContainerProps>(({ schema }, ref) => {
    const { baseUrl, commonTranslations } = useProviderState()
    const {
        onDataSubmit,
        updateData,
        formState,
        languages,
        canAdd,
        canUpdate,
        onImageUpload,
        submasterTranslations,
        onImageRemove,
        imageBaseUrl,
    } = useSubMasterState()
    const defaultSchema: SchemaType[] = [
        ...(Array.isArray(languages) && languages.length > 0
            ? [
                  {
                      label: commonTranslations.name,
                      accessor: "names",
                      type: "text",
                      placeholder: commonTranslations.namePlaceholder,
                      onInput: handleCapitalize,
                      isRequired: true,
                      validations: {
                          required: commonTranslations.nameRequired,
                      },
                  } as SchemaType,
              ]
            : [
                  {
                      label: commonTranslations.name,
                      accessor: "name",
                      type: "text",
                      placeholder: commonTranslations.namePlaceholder,
                      onInput: handleCapitalize,
                      isRequired: true,
                      validations: {
                          required: commonTranslations.nameRequired,
                      },
                  } as SchemaType,
              ]),
        {
            label: commonTranslations.code,
            accessor: "code",
            type: "text",
            isRequired: true,
            onInput: handleCode,
            editable: false,
            placeholder: commonTranslations.codePlaceholder,
            validations: {
                required: commonTranslations.codeRequired,
            },
        },
        {
            label: "Synonym",
            accessor: "synonym",
            type: "multiselect",
            isRequired: true,
            placeholder: "Enter Synonyms",
        },
        {
            label: commonTranslations.webDisplay,
            accessor: "webDsply",
            type: "text",
            onInput: handleCapitalize,
            placeholder: commonTranslations.enterWebDisplay,
        },
        {
            label: commonTranslations.description,
            accessor: "desc",
            type: "textarea",
            onInput: handleCapitalize,
            placeholder: commonTranslations.enterDescription,
        },
        {
            label: submasterTranslations.cover,
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
                    baseUrl={imageBaseUrl ? imageBaseUrl : baseUrl}
                    text={
                        <>
                            <div className="kms_img-text-wrapper">
                                <label htmlFor="file-upload" className="kms_img-text-label">
                                    <span>{submasterTranslations.uploadFile}</span>
                                </label>
                                <p className="kms_img-text-1">{submasterTranslations.dragDrop}</p>
                            </div>
                            <p className="kms_img-text-2">{submasterTranslations.allowedFormat}</p>
                        </>
                    }
                    onImageUpload={onImageUpload}
                    onImageRemove={onImageRemove}
                    className="kms_img-upload-wrapper-3"
                />
            ),
        },
        {
            label: commonTranslations.active,
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
            languages={languages}
            data={updateData}
            isUpdating={formState === "UPDATE"}
        />
    )
})

export default SubMasterForm
