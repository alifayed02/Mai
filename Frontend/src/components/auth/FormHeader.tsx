import React, { useState } from 'react';

interface FormProps {
    className?: string; // Optional className prop
    title?: string;
}

const FormHeader: React.FC<FormProps> = ({className, title="Get Started"}) => {
    return (
        <div className={`${className}`}>
            <div className="">
                <div className="text-white text-lg font-sf font-light">
                    {title}
                </div>
                <div className="text-white font-sf font-extralight">
                    Dive right in to personal mentoring
                </div>
                <hr className="mt-5 mb-10 border-[#BE95C4]"></hr>
            </div>
        </div>
    )
}

export default FormHeader;