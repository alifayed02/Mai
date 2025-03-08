import React, { useState } from 'react';

interface BoxProps {
    className?: string;
}

const IntroBox: React.FC<BoxProps> = ({className}) => {
    return (
        <div className={`${className}`}>
            <div className="h-full bg-gradient-to-tr from-[#2A2B47] to-[#404277] rounded-[10px]">
                <div className="text-center pt-10">
                    <p className="text-[#e0b1cb] text-left pl-12 text-7xl font-thin">Mai,</p>
                    <p className="text-white text-5xl font-thin pt-5">Your personal AI mentor</p>
                    <div className="flex items-end justify-center mt-24">
                        <img src="images/Mai.png" 
                            alt="Mai" className="w-[75%] h-[75%] shadow-2xl"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroBox;