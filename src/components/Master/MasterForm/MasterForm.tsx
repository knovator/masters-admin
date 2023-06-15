import React, { forwardRef } from "react"
import { capitalizeFirstLetter, changeToCode } from "../../../utils/util"
import { useMasterState } from "../../../context/MasterContext"

import { Form } from "../../../components/Common"

const MasterForm = forwardRef<HTMLFormElement | null, FormContainerProps>(({ schema }, ref) => {
    const { onDataSubmit, updateData, formState, canAdd, canUpdate, t, languages } = useMasterState()
    const defaultSchema: SchemaType[] = [
        {
            label: `${t("name")}`,
            accessor: "name",
            type: "text",
            placeholder: t("enterName"),
            onInput: handleCapitalize,
            isRequired: true,
            validations: {
                required: t("requiredName"),
            },
        },
        ...(Array.isArray(languages) && languages.length > 0
            ? [
                  {
                      label: `${t("names")}`,
                      accessor: "names",
                      type: "text",
                      placeholder: t("enterNames"),
                      onInput: handleCapitalize,
                  } as SchemaType,
              ]
            : []),
        {
            label: `${t("code")}`,
            accessor: "code",
            type: "text",
            onInput: handleCode,
            isRequired: true,
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
            placeholder: t("enterDiscription"),
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
            languages={languages}
            isUpdating={formState === "UPDATE"}
        />
    )
})

export default MasterForm
