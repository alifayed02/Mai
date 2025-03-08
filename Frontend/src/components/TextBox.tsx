import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { ArrowTurnUpRightIcon } from '../icons/Heroicons';

interface Props {
    className?: string;
    handleEnter: (e: React.KeyboardEvent<HTMLInputElement>, clearInput: () => void) => void;
    handleNewChat: () => void;
}

const TextBox: React.FC<Props> = ({ className, handleEnter, handleNewChat }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    const clearInput = () => {
        setInputText("");
    }

    return (
        <div className={`${className} flex`}>
            <input
                type="text"
                value={inputText}
                className={`w-[556px] pt-3 pb-3 pl-5 rounded-[20px] bg-custom-start 
                            text-white placeholder-[#B7A4C1] placeholder-opacity-100 
                            focus:outline-none focus:ring-2 focus:ring-purple-300
                            transition-all duration-300 font-sf`}
                placeholder={isFocused ? '' : 'Talk to Mai'}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    if (!e.target.value) setIsFocused(false);
                }}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => handleEnter(e, clearInput)}
            />
            <div className="flex text-white ml-6 items-center">
                <button onClick={handleNewChat} className="">
                    <p>New Chat</p>
                </button>
            </div>
        </div>
    )
}

export default TextBox;