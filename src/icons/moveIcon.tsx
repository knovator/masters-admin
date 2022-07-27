import React from "react"
import classNames from "classnames"

const MoveIcon = (properties: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            viewBox="0 0 13 8"
            {...properties}
            className={classNames("kms_actions-move", properties?.className || "")}
        >
            <g id="move" transform="translate(-216.801 -202.823)">
                <circle
                    id="Ellipse_689"
                    data-name="Ellipse 689"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="translate(216.801 202.823)"
                    fill="#5e656f"
                />
                <circle
                    id="Ellipse_689-2"
                    data-name="Ellipse 689"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="translate(221.801 202.823)"
                    fill="#5e656f"
                />
                <circle
                    id="Ellipse_689-3"
                    data-name="Ellipse 689"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="translate(226.801 202.823)"
                    fill="#5e656f"
                />
                <circle
                    id="Ellipse_689-4"
                    data-name="Ellipse 689"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="translate(216.801 207.823)"
                    fill="#5e656f"
                />
                <circle
                    id="Ellipse_689-5"
                    data-name="Ellipse 689"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="translate(221.801 207.823)"
                    fill="#5e656f"
                />
                <circle
                    id="Ellipse_689-6"
                    data-name="Ellipse 689"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="translate(226.801 207.823)"
                    fill="#5e656f"
                />
            </g>
        </svg>
    )
}

export default MoveIcon
