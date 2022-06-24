import React from "react";
export interface TextareaProps {
    value?: string | number;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rest?: any;
    label?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}
declare const Textarea: ({ onChange, onInput, value, placeholder, rest, label, error, disabled, className, }: TextareaProps) => JSX.Element;
export default Textarea;
