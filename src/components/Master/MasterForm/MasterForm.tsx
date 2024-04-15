import React, { forwardRef } from "react"
import { capitalizeFirstLetter, changeToCode } from "../../../utils/util"
import { useMasterState } from "../../../context/MasterContext"

import { Form } from "../../../components/Common"
import { useProviderState } from "../../../context/ProviderContext"

const MasterForm = forwardRef<HTMLFormElement | null, FormContainerProps>(({ schema }, ref) => {
    const { commonTranslations } = useProviderState()
    const { onDataSubmit, updateData, formState, canAdd, canUpdate, masterTranslations, languages } = useMasterState()
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
            onInput: handleCode,
            isRequired: true,
            editable: false,
            placeholder: commonTranslations.codePlaceholder,
            validations: {
                required: commonTranslations.codeRequired,
            },
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
            data={updateData}
            languages={languages}
            isUpdating={formState === "UPDATE"}
        />
    )
})

export default MasterForm
