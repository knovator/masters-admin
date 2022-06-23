import React from "react";
interface ModalProps extends React.PropsWithChildren {
    open: boolean;
    onClose: () => void;
    title?: string;
}
declare const Modal: ({ open, onClose, title, children }: ModalProps) => JSX.Element;
export default Modal;
