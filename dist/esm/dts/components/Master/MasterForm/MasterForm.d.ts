import React, { MutableRefObject } from "react";
interface MasterFormProps {
    schema?: SchemaType[];
    ref: MutableRefObject<HTMLFormElement | null>;
}
declare const MasterForm: React.ForwardRefExoticComponent<Pick<MasterFormProps, "schema"> & React.RefAttributes<HTMLFormElement | null>>;
export default MasterForm;
