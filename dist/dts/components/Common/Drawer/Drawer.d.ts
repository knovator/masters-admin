import React from "react";
interface DrawerProps extends React.PropsWithChildren {
    open: boolean;
    onClose: () => void;
    title?: string;
    footerContent?: React.ReactNode;
}
declare const Drawer: ({ children, open, onClose, title, footerContent }: DrawerProps) => JSX.Element;
export default Drawer;
