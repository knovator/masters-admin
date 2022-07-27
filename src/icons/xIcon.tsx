import React from "react"

export const XSVG = (properties: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-6 -6 24 24"
            width="24"
            fill="currentColor"
            {...properties}
            className="kms_actions-x"
        >
            <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path>
        </svg>
    )
}
