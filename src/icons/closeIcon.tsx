import React from "react"
// import Tooltip from "components/Widget/Tooltip"

const CloseIcon = ({ className }: { className?: string }) => {
    return (
        // <Tooltip message="Close">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className={className}
            fill="currentColor"
        >
            <path
                id="CloseBtn"
                d="M5.455,5.455V0H7.273V5.455h5.455V7.273H7.273v5.455H5.455V7.273H0V5.455Z"
                transform="translate(0 9) rotate(-45)"
                fill="#02a2ff"
            />
        </svg>
        // </Tooltip>
    )
}

export default CloseIcon
