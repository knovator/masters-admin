import React from "react"
import Tooltip from "../widgets/Tooltip"

const UpdateIcon = (properties: any) => {
    return (
        <Tooltip message="Edit">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 13.971 13.971"
                {...properties}
                className="kms_actions-update"
            >
                <path
                    id="updateIcon"
                    d="M12.895,8.2l-1.1-1.1L4.555,14.346v1.1h1.1Zm1.1-1.1,1.1-1.1-1.1-1.1-1.1,1.1ZM6.3,17H3V13.7L13.445,3.257a.777.777,0,0,1,1.1,0l2.2,2.2a.777.777,0,0,1,0,1.1L6.3,17Z"
                    transform="translate(-3 -3.029)"
                    fill="#2697ff"
                />
            </svg>
        </Tooltip>
    )
}

export default UpdateIcon
