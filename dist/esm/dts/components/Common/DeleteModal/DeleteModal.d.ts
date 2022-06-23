/// <reference types="react" />
interface DeleteModalProps {
    formState: FormActionTypes | undefined;
    onClose: () => void;
    itemData: any;
    onConfirmDelete: () => void;
    permanentlyDelete?: string;
    lossOfData?: string;
    pleaseType?: string;
    toProceedOrCancel?: string;
    confirm?: string;
}
declare const DeleteModal: ({ formState, onClose, itemData, onConfirmDelete, permanentlyDelete, lossOfData, pleaseType, toProceedOrCancel, confirm, }: DeleteModalProps) => JSX.Element;
export default DeleteModal;
