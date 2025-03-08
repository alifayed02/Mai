import React from 'react';

interface Props {
    className?: string;
    verses: string;
    chapter: string;
}

const VerseContent: React.FC<Props> = ({ className, verses, chapter }) => {
    return (
        <div className={`${className}`}>
            <div>
                <p className="text-[#B7A4C1] text-center" style={{ whiteSpace: 'pre-line' }}>{verses}
                </p>
            </div>
            <div>
                <p className="text-right text-white mt-12">{chapter}</p>
            </div>
        </div>
    )
}

export default VerseContent;