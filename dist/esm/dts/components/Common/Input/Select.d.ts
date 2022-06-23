import React from "react";
export interface SelectProps {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    rest?: any;
    label?: string;
    error?: string;
    options?: {
        value: string;
        label: string;
    }[];
    className?: string;
    disabled?: boolean;
}
declare const Select: ({ onChange, value, rest, label, error, options, className, disabled }: SelectProps) => JSX.Element;
export default Select;
