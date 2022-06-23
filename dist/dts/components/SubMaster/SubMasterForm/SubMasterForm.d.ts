import React, { MutableRefObject } from "react";
interface SubMasterFormProps {
    schema?: SchemaType[];
    ref: MutableRefObject<HTMLFormElement | null>;
}
declare const SubMasterForm: React.ForwardRefExoticComponent<Pick<SubMasterFormProps, "schema"> & React.RefAttributes<HTMLFormElement | null>>;
export default SubMasterForm;
