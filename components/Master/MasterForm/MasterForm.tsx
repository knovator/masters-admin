import React, { forwardRef, MutableRefObject } from "react"
import { capitalizeFirstLetter, changeToCode } from "utils/util"
import { Form } from "components/Common"
import { useMasterState } from "context"

interface DrawerProps {
  ref: MutableRefObject<HTMLFormElement | null>
}

const MasterForm = forwardRef<HTMLFormElement | null, DrawerProps>(({}, ref) => {
  const { onDataSubmit } = useMasterState()
  const schema: SchemaType[] = [
    {
      label: "Name*",
      accessor: "name",
      type: "text",
      onInput: handleCapitalize,
    },
    {
      label: "Code*",
      accessor: "code",
      type: "text",
      onInput: handleCode,
    },
    {
      label: "Web Display*",
      accessor: "webDis",
      type: "text",
    },
    {
      label: "Description",
      accessor: "desc",
      type: "textarea",
    },
    {
      label: "Active",
      accessor: "isActive",
      type: "checkbox",
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
  return <Form schema={schema} onSubmit={onDataSubmit} ref={ref} />
})

export default MasterForm
