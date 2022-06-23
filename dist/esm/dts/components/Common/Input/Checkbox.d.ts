import React from "react";
export interface CheckboxProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rest?: any;
    label?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
}
declare const Checkbox: ({ onChange, rest, label, error, className, disabled }: CheckboxProps) => JSX.Element;
export default Checkbox;
