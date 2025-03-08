import React, { useState } from 'react';

interface ButtonProps {
    className?: string; // Optional className prop
    text?: string;
}

const Button: React.FC<ButtonProps> = ({className, text="Sign up"}) => {
    return (
        <div>
            <button type="submit" className="w-full pb-2 pt-2 mt-12 bg-gradient-to-l from-[#2A2B47] to-[#404277] rounded-[6px] text-white font-sf font-light text-sm">{text}</button>
        </div>
    )
}

export default Button;