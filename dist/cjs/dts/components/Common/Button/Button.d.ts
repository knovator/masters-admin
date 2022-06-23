import React from "react";
interface ButtonProps {
    label: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    size?: "sm" | "md";
}
declare const Button: ({ label, onClick, disabled, variant, size }: ButtonProps) => JSX.Element;
export default Button;
