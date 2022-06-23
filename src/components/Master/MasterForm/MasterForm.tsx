import React, { forwardRef, MutableRefObject } from "react"
import { capitalizeFirstLetter, changeToCode } from "../../../utils/util"
import { useMasterState } from "../../../context/MasterContext"

import { Form } from "../../../components/Common"

interface MasterFormProps {
    schema?: SchemaType[]
    ref: MutableRefObject<HTMLFormElement | null>
}

const MasterForm = forwardRef<HTMLFormElement | null, MasterFormProps>(({ schema }, ref) => {
    const { onDataSubmit, updateData, formState, canAdd, canUpdate, t } = useMasterState()
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
            isUpdating={formState === "UPDATE"}
        />
    )
})

export default MasterForm
