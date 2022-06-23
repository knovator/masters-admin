import React from "react"
import Tooltip from "../widgets/Tooltip"

const DeleteIcon = (properties: any) => {
    return (
        <Tooltip message="Delete">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                {...properties}
                className="kms_actions-delete"
            >
                <path
                    id="deleteIcon"
                    d="M14,5.2h4V6.8H16.4V17.2a.8.8,0,0,1-.8.8H4.4a.8.8,0,0,1-.8-.8V6.8H2V5.2H6V2.8A.8.8,0,0,1,6.8,2h6.4a.8.8,0,0,1,.8.8Zm.8,1.6H5.2v9.6h9.6ZM7.6,9.2H9.2V14H7.6Zm3.2,0h1.6V14H10.8ZM7.6,3.6V5.2h4.8V3.6Z"
                    transform="translate(-2 -2)"
                    fill="#FA5050"
                />
            </svg>
        </Tooltip>
    )
}

export default DeleteIcon
