import React from "react";
interface ImageUploadProps {
    className?: string;
    text: string | JSX.Element;
    maxSize: number;
    imgId?: string;
    setImgId: (value?: string) => void;
    clearError?: () => void;
    onError: (msg: string) => void;
    onImageUpload: (file: File) => Promise<{
        fileUrl: string;
        fileId: string;
    }>;
    error?: string;
}
declare const _default: React.MemoExoticComponent<({ className, text, maxSize, setImgId, onError, error, imgId, onImageUpload, }: ImageUploadProps) => JSX.Element>;
export default _default;
