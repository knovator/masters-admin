import React from "react"
import Tooltip from "../widgets/Tooltip"

export const UpdateSVG = (properties: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2.5 -2.5 24 24"
            width="24"
            fill="currentColor"
            {...properties}
            className="kms_actions-update"
        >
            <path
                d="M12.238 5.472L3.2 14.51l-.591 2.016 1.975-.571 9.068-9.068-1.414-1.415zM13.78 3.93l1.414 1.414 1.318-1.318a.5.5 0 0 0 0-.707l-.708-.707a.5.5 0 0 0-.707 0L13.781 3.93zm3.439-2.732l.707.707a2.5 2.5 0 0 1 0 3.535L5.634 17.733l-4.22 1.22a1 1 0 0 1-1.237-1.241l1.248-4.255 12.26-12.26a2.5 2.5 0 0 1 3.535 0z"
                fill="currentColor"
            ></path>
        </svg>
    )
}

const UpdateIcon = (properties: any) => {
    return (
        <Tooltip message="Edit">
            <UpdateSVG fill="#2697ff" {...properties} />
        </Tooltip>
    )
}

export default UpdateIcon
