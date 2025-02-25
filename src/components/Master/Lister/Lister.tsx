import React, { useCallback, useEffect } from "react"
import classNames from "classnames"
import { useMasterState } from "../../../context/MasterContext"
import { useProviderState } from "../../../context/ProviderContext"

const Lister = ({ render, selectFirst }: ListerProps) => {
    const { setSelectedMaster, selectedMaster } = useProviderState()
    const { loading, loader, canList , allDataList } = useMasterState()


    useEffect(() => {
        if (selectFirst && Array.isArray(allDataList) && allDataList.length > 0) {
            setSelectedMaster(allDataList[0])
        }
    }, [allDataList])

    const onItemRender = useCallback(
        (item: any) => {
            if (typeof render === "function")
                return render({ row: item, onClick: () => setSelectedMaster(item), masterCode: selectedMaster?.code })
            return (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div
                    onClick={() => setSelectedMaster(item)}
                    className={classNames("kms_list-item", {
                        selected: item.code === selectedMaster?.code,
                    })}
                    role="button"
                    onKeyDown={() => setSelectedMaster(item)}
                    key={item._id || item.id}
                >
                    <div className="kms_list-item-highlight">{item?.name?.charAt(0)}</div>
                    <div>
                        <p className="kms_list-item-heading">{item?.name}</p>
                        <p className="kms_list-item-subheading">{item?.code || ""}</p>
                    </div>
                </div>
            )
        },
        [selectedMaster, render, setSelectedMaster],
    )

    if (!canList) return null
    if (loading && loader) return loader
    return (
        <div className="kms_list-wrapper" data-testid="kms_list-wrapper">
            {allDataList.map((item) => onItemRender(item))}
        </div>
    )
}

export default Lister
