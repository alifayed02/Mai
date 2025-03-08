import React from 'react';

interface Props {
    className?: string;
    content: string;
}

const UserMessage: React.FC<Props> = ({ className, content }) => {
    return (
        <div className={`${className} bg-[#5E548E] rounded-2xl m-3 p-3 mt-2 mb-2 text-white font-sf
                        `}>
            <p className="whitespace-break-spaces">
                {content}
            </p>
        </div>
    )
}

export default UserMessage;