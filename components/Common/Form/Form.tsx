import React, { MutableRefObject, forwardRef } from "react"
import { useForm, Controller } from "react-hook-form"
import Input from "../Input"

interface FormProps {
  schema: SchemaType[]
  onSubmit: (data: any) => void
  ref: MutableRefObject<HTMLFormElement | null>
}

const Form = forwardRef<HTMLFormElement | null, FormProps>(({ schema, onSubmit }, ref) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm()

  const inputRenderer = (schema: SchemaType) => {
    let input
    if (schema.type) {
      switch (schema.type) {
        case "checkbox":
          input = (
            <Input.Checkbox
              error={errors[schema.accessor]}
              label={schema.label}
              rest={register(schema.accessor, schema.validations || {})}
              className="block"
            />
          )
          break
        case "select":
          input = (
            <Input.Select
              options={schema.options}
              label={schema.label}
              error={errors[schema.accessor]}
              rest={register(schema.accessor, schema.validations || {})}
              className="w-full"
            />
          )
          break
        case "textarea":
          input = (
            <Input.Textarea
              error={errors[schema.accessor]}
              label={schema.label}
              rest={register(schema.accessor, schema.validations || {})}
              onInput={schema.onInput}
              className="w-full p-2"
            />
          )
          break
        case "text":
        case "number":
        default:
          input = (
            <Input
              rest={register(schema.accessor, schema.validations || {})}
              label={schema.label}
              onInput={schema.onInput}
              error={errors[schema.accessor]}
              type={schema.type}
              className="w-full p-2"
            />
          )
          break
      }
    } else if (schema.Input) {
      input = (
        <Controller
          control={control}
          name={schema.accessor}
          rules={schema.validations}
          render={({ field }) => schema.Input!({ field, error: errors[schema.accessor] })}
        />
      )
    } else throw new Error(`Please provide Input or type prop to render input Labeled ${schema.label}`)

    return input
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit((data) => onSubmit(data))()
  }

  return (
    <form onSubmit={onFormSubmit} ref={ref} className="kms_form">
      {schema.map((schema, i) => (
        <React.Fragment key={i}>{inputRenderer(schema)}</React.Fragment>
      ))}
    </form>
  )
})

export default Form
