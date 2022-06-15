import React, { forwardRef, MutableRefObject } from "react"
import { capitalizeFirstLetter, changeToCode } from "utils/util"
import { Form } from "components/Common"
import { useFormState } from "context/FormContext"

interface DrawerProps {
  ref: MutableRefObject<HTMLFormElement | null>
}

const MasterForm = forwardRef<HTMLFormElement | null, DrawerProps>(({}, ref) => {
  const { onDataSubmit, updateData, formState } = useFormState()
  const schema: SchemaType[] = [
    {
      label: "Name*",
      accessor: "name",
      type: "text",
      placeholder: "Enter Name",
      onInput: handleCapitalize,
    },
    {
      label: "Code*",
      accessor: "code",
      type: "text",
      onInput: handleCode,
      editable: false,
      placeholder: "Enter Code",
    },
    {
      label: "Web Display*",
      accessor: "webDsply",
      type: "text",
      onInput: handleCapitalize,
      placeholder: "Enter Web Display",
    },
    {
      label: "Description",
      accessor: "desc",
      type: "textarea",
      onInput: handleCapitalize,
      placeholder: "Enter Description",
    },
    {
      label: "Active",
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
  return (
    <Form schema={schema} onSubmit={onDataSubmit} ref={ref} data={updateData} isUpdating={formState === "UPDATE"} />
  )
})

export default MasterForm
