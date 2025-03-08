import React from 'react';

interface Props {
    className?: string;
    content: string;
}

const AssistantMessage: React.FC<Props> = ({ className, content }) => {
    return (
        <div className={`${className} rounded-2xl p-3 mt-2 mb-2 text-[#B7A4C1] font-sf
                        `}>
            <p className="whitespace-break-spaces">
                {content}
            </p>
        </div>
    )
}

export default AssistantMessage;