import React, { useCallback } from "react"
import classNames from "classnames"
import { useMasterState } from "../../../context/MasterContext"
import { useProviderState } from "../../../context/ProviderContext"

interface ListerProps {
    render?: ({ row, onClick, masterCode }: { row: any; onClick: () => void; masterCode: string }) => JSX.Element
}
const Lister = ({ render }: ListerProps) => {
    const { masterCode, setMasterCode } = useProviderState()
    const { data, loading, loader, canList } = useMasterState()
    const onItemRender = useCallback(
        (item: any) => {
            if (typeof render === "function")
                return render({ row: item, onClick: () => setMasterCode(item?.code), masterCode })
            return (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div
                    onClick={() => setMasterCode(item?.code)}
                    className={classNames("kms_list-item group", {
                        selected: item.code === masterCode,
                    })}
                    role="button"
                    onKeyDown={() => setMasterCode(item?.code)}
                    key={item.id}
                >
                    <div className="kms_list-item-highlight">{item?.name?.charAt(0)}</div>
                    <div>
                        <p className="kms_list-item-heading">{item?.name || ""}</p>
                        <p className="kms_list-item-subheading">{item?.code || ""}</p>
                    </div>
                </div>
            )
        },
        [masterCode, render, setMasterCode],
    )

    if (!canList) return null
    if (loading && loader) return loader
    return (
        <div className="kms_list-wrapper" data-testid="kms_list-wrapper">
            {data.map((item) => onItemRender(item))}
        </div>
    )
}

export default Lister
