import React, { forwardRef, MutableRefObject } from "react"
import { capitalizeFirstLetter, changeToCode } from "utils/util"
import { useSubMasterState } from "context/SubMasterContext"

import { Form, ImageUpload } from "components/Common"

interface SubMasterFormProps {
  schema?: SchemaType[]
  ref: MutableRefObject<HTMLFormElement | null>
}

const SubMasterForm = forwardRef<HTMLFormElement | null, SubMasterFormProps>(({ schema }, ref) => {
  const { onDataSubmit, updateData, formState, canAdd, canUpdate, onImageUpload, t } = useSubMasterState()
  const defaultSchema: SchemaType[] = [
    {
      label: "Name*",
      accessor: "name",
      type: "text",
      placeholder: "Enter Name",
      onInput: handleCapitalize,
      validations: {
        required: "Name is Required",
      },
    },
    {
      label: "Code*",
      accessor: "code",
      type: "text",
      onInput: handleCode,
      editable: false,
      placeholder: "Enter Code",
      validations: {
        required: "Code is Required",
      },
    },
    {
      label: "Web Display",
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
      label: "Cover Image",
      accessor: "img",
      Input: ({ field, error, setError }) => (
        <ImageUpload
          imgId={field.value}
          maxSize={10_485_760}
          onError={setError}
          error={error}
          setImgId={field.onChange}
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
          className="kms_img-upload-wrapper-3"
        />
      ),
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
