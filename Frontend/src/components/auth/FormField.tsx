import React, { useState } from 'react';

interface FieldProps {
    className?: string;
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const FormField: React.FC<FieldProps> = ({className, label, name, value, type="text", onChange}) => {
    return (
        <div className="flex flex-col pb-[5%]">
            <label className="text-white font-sf font-light pb-2">
                {label}
            </label>
            <input 
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                className="pb-1 pt-1 pl-2 rounded-[6px] bg-transparent border-[1px] 
                            border-white border-opacity-30 focus:outline-none text-white
                            text-sm
                            placeholder-[#B7A4C1] placeholder-opacity-100 
                            focus:ring-1 focus:ring-purple-300
                            transition-all duration-200">
            </input>
        </div>
    )
}

export default FormField;