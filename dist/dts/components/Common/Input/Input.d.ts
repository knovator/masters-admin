import React from "react";
export interface InputProps {
    value?: string | number;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "number" | "text" | "search" | "checkbox";
    rest?: any;
    label?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
}
declare const Input: ({ onChange, onInput, disabled, value, type, placeholder, rest, label, error, className, }: InputProps) => JSX.Element;
export default Input;
