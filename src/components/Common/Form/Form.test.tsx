import React from "react"
import { MutableRefObject } from "react"
import { SchemaType } from "@knovator/masters-admin"
import { act, fireEvent, render } from "@testing-library/react"
import { capitalizeFirstLetter, changeToCode } from "../../../utils/util"
import Form from "./Form"

describe("Testing Form Component", () => {
    it("Should render corrects inputs when schema passed", () => {
        const ref = { current: {} }
        const onDataSubmit = () => {}
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
            },
            {
                label: "Age",
                accessor: "age",
                type: "select",
                options: [
                    { label: "1", value: "10" },
                    { label: "1", value: "10" },
                ],
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
        const { getByTestId } = render(
            // @ts-ignore
            <Form schema={defaultSchema} onSubmit={onDataSubmit} ref={ref} data={{}} isUpdating={false} />,
        )
        let nameTextInput = getByTestId("input-text-Name*")
        expect(nameTextInput).toBeTruthy()
        expect((nameTextInput as any).type).toBe("text")

        let codeTextInput = getByTestId("input-text-Code*")
        expect(codeTextInput).toBeTruthy()
        expect((codeTextInput as any).type).toBe("text")

        let descTextareaInput = getByTestId("input-textarea-Description")
        expect(descTextareaInput).toBeTruthy()
        expect((descTextareaInput as any).type).toBe("textarea")

        let activeCheckboxInput = getByTestId("input-checkbox-Active")
        expect(activeCheckboxInput).toBeTruthy()
        expect((activeCheckboxInput as any).type).toBe("checkbox")

        let ageSelectInput = getByTestId("input-select-Age")
        expect(ageSelectInput).toBeTruthy()
        expect((ageSelectInput as any).type).toBe("select-one")
        expect(ageSelectInput.childElementCount).toBe(2)
    })
    it("Should be having default values", () => {
        const ref = { current: {} }
        const onDataSubmit = () => {}
        const defaultSchema: SchemaType[] = [
            {
                label: "Name*",
                accessor: "name",
                type: "text",
                placeholder: "Enter Name",
                defaultValue: "John",
            },
            {
                label: "Code*",
                accessor: "code",
                type: "text",
                editable: false,
                defaultValue: "ABCD",
            },
            {
                label: "Description",
                accessor: "desc",
                type: "textarea",
                placeholder: "Enter Description",
                defaultValue: "Test Description",
            },
            {
                label: "Active",
                accessor: "isActive",
                type: "checkbox",
                defaultValue: true,
            },
            {
                label: "Age",
                accessor: "age",
                type: "select",
                options: [
                    { label: "1", value: "10" },
                    { label: "2", value: "20" },
                ],
                defaultValue: 10,
            },
        ]
        const { getAllByTestId, getByTestId } = render(
            // @ts-ignore
            <Form schema={defaultSchema} onSubmit={onDataSubmit} ref={ref} data={{}} isUpdating={false} />,
        )

        let nameTextInput = getByTestId("input-text-Name*")
        expect(nameTextInput).toBeTruthy()
        expect((nameTextInput as HTMLInputElement).value).toBe("John")

        let codeTextInput = getByTestId("input-text-Code*")
        expect(codeTextInput).toBeTruthy()
        expect((codeTextInput as HTMLInputElement).value).toBe("ABCD")

        let descTextareaInput = getByTestId("input-textarea-Description")
        expect(descTextareaInput).toBeTruthy()
        expect((descTextareaInput as HTMLTextAreaElement).value).toBe("Test Description")

        let activeCheckboxInput = getByTestId("input-checkbox-Active")
        expect(activeCheckboxInput).toBeTruthy()
        expect((activeCheckboxInput as HTMLInputElement).value).toBeTruthy()

        let options = getAllByTestId("select-option")
        expect((options[0] as HTMLOptionElement).selected).toBeTruthy()
        expect((options[1] as HTMLOptionElement).selected).toBeFalsy()
    })
    it("Should set data values", () => {
        const ref = { current: {} }
        const onDataSubmit = () => {}
        let data = {
            name: "John",
            code: "ABCD",
            desc: "Test Description",
            isActive: true,
            age: 10,
        }
        const defaultSchema: SchemaType[] = [
            {
                label: "Name*",
                accessor: "name",
                type: "text",
                placeholder: "Enter Name",
            },
            {
                label: "Code*",
                accessor: "code",
                type: "text",
                editable: false,
            },
            {
                label: "Description",
                accessor: "desc",
                type: "textarea",
                placeholder: "Enter Description",
            },
            {
                label: "Active",
                accessor: "isActive",
                type: "checkbox",
            },
            {
                label: "Age",
                accessor: "age",
                type: "select",
                options: [
                    { label: "1", value: "10" },
                    { label: "2", value: "20" },
                ],
            },
        ]
        const { getAllByTestId, getByTestId } = render(
            // @ts-ignore
            <Form schema={defaultSchema} onSubmit={onDataSubmit} ref={ref} data={data} isUpdating={false} />,
        )

        let nameTextInput = getByTestId("input-text-Name*")
        expect(nameTextInput).toBeTruthy()
        expect((nameTextInput as HTMLInputElement).value).toBe("John")

        let codeTextInput = getByTestId("input-text-Code*")
        expect(codeTextInput).toBeTruthy()
        expect((codeTextInput as HTMLInputElement).value).toBe("ABCD")

        let descTextareaInput = getByTestId("input-textarea-Description")
        expect(descTextareaInput).toBeTruthy()
        expect((descTextareaInput as HTMLTextAreaElement).value).toBe("Test Description")

        let activeCheckboxInput = getByTestId("input-checkbox-Active")
        expect(activeCheckboxInput).toBeTruthy()
        expect((activeCheckboxInput as HTMLInputElement).value).toBeTruthy()

        let options = getAllByTestId("select-option")
        expect((options[0] as HTMLOptionElement).selected).toBeTruthy()
        expect((options[1] as HTMLOptionElement).selected).toBeFalsy()
    })
    it("Should call onInput for schema item provided", () => {
        const ref = { current: {} }
        const onDataSubmit = () => {}
        const defaultSchema: SchemaType[] = [
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
                label: "Description",
                accessor: "desc",
                type: "textarea",
                onInput: handleCapitalize,
                placeholder: "Enter Description",
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
        const { container, getByTestId } = render(
            // @ts-ignore
            <Form schema={defaultSchema} onSubmit={onDataSubmit} ref={ref} data={{}} isUpdating={false} />,
        )
        let nameTextInput = container.querySelector("input[data-testid='input-text-Name*']")
        expect(nameTextInput).toBeTruthy()
        fireEvent.input(nameTextInput!, { target: { value: "john" } })
        expect((nameTextInput as HTMLInputElement).value).toBe("John")

        let descTextareaInput = getByTestId("input-textarea-Description")
        expect(descTextareaInput).toBeTruthy()
        fireEvent.input(descTextareaInput!, { target: { value: "hello world!" } })
        expect((descTextareaInput as HTMLTextAreaElement).value).toBe("Hello world!")

        let codeTextInput = getByTestId("input-text-Code*")
        expect(codeTextInput).toBeTruthy()
        fireEvent.input(codeTextInput!, { target: { value: "a bb cc" } })
        expect((codeTextInput as HTMLInputElement).value).toBe("A_BB_CC")
    })
    it("Should validate inputs when form submited", async () => {
        const ref = { current: {} } as MutableRefObject<HTMLFormElement | null>
        const onDataSubmit = () => {}
        const defaultSchema: SchemaType[] = [
            {
                label: "Name*",
                accessor: "name",
                type: "text",
                placeholder: "Enter Name",
                validations: {
                    required: "Name is Required",
                },
            },
            {
                label: "Code*",
                accessor: "code",
                type: "text",
                editable: false,
                placeholder: "Enter Code",
                validations: {
                    required: "Code is Required",
                },
            },
        ]
        const { container } = render(
            <Form schema={defaultSchema} onSubmit={onDataSubmit} ref={ref} data={{}} isUpdating={false} />,
        )
        // submit the form to show errors for empty inputs
        act(() => {
            ref.current?.submit()
            // ref.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
        })
        await new Promise((r) => setTimeout(r, 100))

        // Checking Errors
        let errors = container.querySelectorAll(".kms_input-error")
        expect(errors.length).toBe(2)
        expect(errors[0].innerHTML).toBe("Name is Required")
        expect(errors[1].innerHTML).toBe("Code is Required")
    })
})
