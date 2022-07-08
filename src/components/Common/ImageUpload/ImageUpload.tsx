import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import SmallCancel from "../../../icons/smallCancel"
import { build_path, isEmpty, isString } from "../../../utils/util"

interface ImageObjectProps {
    _id: string
    uri: string
    nm: string
    type: string
}

interface ImageUploadProps {
    className?: string
    text: string | JSX.Element
    maxSize: number
    imgId?: string | ImageObjectProps
    setImgId: (value?: string | null) => void
    clearError?: () => void
    onError: (msg: string) => void
    onImageUpload: (file: File) => Promise<{ fileUrl: string; fileId: string } | void>
    onImageRemove?: (id: string) => Promise<void>
    baseUrl: string
    error?: string
}

const ImageUpload = ({
    className,
    text,
    maxSize,
    setImgId,
    onError,
    error,
    imgId = "",
    onImageUpload,
    onImageRemove,
    baseUrl,
}: ImageUploadProps) => {
    const [img, setImg] = useState<string | undefined>(undefined)
    const { getRootProps, getInputProps } = useDropzone({
        // accept: {
        //   "image/*": [".jpeg,.jpg,.png"],
        // },
        multiple: false,
        minSize: 0,
        maxSize,
        onDrop: async (acceptedFiles, rejectedFiles) => {
            try {
                onError("")
                if (acceptedFiles?.length > 0) {
                    let regex = /\.(png|jpeg|jpg|svg)$/gi
                    let files = acceptedFiles.filter((file) => regex.test(file.name))
                    if (files[0]) {
                        let response = await onImageUpload(files[0])
                        if(response) {
                            setImg(response.fileUrl)
                            setImgId(response.fileId)
                        }
                    } else throw new Error("File type must be .png, .jpg, .jpeg, .gif, or .svg")
                } else if (rejectedFiles?.[0]?.errors?.[0]?.message === "File is larger than 10485760 bytes") {
                    throw new Error("File is larger than 10mb")
                }
            } catch (error) {
                onError((error as Error).message)
            }
        },
    })

    const onRemoveFile = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            if(onImageRemove && imgId)
                await onImageRemove(typeof imgId === "string" ? imgId : imgId._id);
            
            setImgId(null)
            setImg("")
        } catch (error) {
            onError((error as Error).message)
        }
    }

    useEffect(() => {
        if (imgId && typeof imgId === "object") {
            setImg(build_path(baseUrl, imgId.uri))
        }
    }, [imgId])

    const showImage = (fileUrl: string) => {
        return (
            <div className="kms_img-wrapper">
                <img src={`${fileUrl}`} alt="" className="kms_img-wrapper-img" />
                <button onClick={onRemoveFile} className="kms_img-wrapper-del">
                    <SmallCancel />
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="kms_img-upload-wrapper-1">
                <div className="kms_img-upload-wrapper-2">
                    {!isEmpty(img) && isString(img) && img ? (
                        showImage(img)
                    ) : (
                        <div
                            {...getRootProps({
                                className,
                            })}
                        >
                            <input {...getInputProps()} id="file-upload" />
                            {text}
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="kms_input-error">{error}</p>}
        </>
    )
}

export default React.memo(ImageUpload)
