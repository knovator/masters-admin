import React, { MutableRefObject } from "react";
interface FormProps {
    schema: SchemaType[];
    data?: any;
    isUpdating?: boolean;
    indicatesRequired?: string;
    onSubmit: (data: any) => void;
    ref: MutableRefObject<HTMLFormElement | null>;
}
declare const Form: React.ForwardRefExoticComponent<Pick<FormProps, "data" | "schema" | "onSubmit" | "isUpdating" | "indicatesRequired"> & React.RefAttributes<HTMLFormElement | null>>;
export default Form;
