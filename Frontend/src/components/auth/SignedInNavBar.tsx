import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, signOut } from "firebase/auth";

import { MoonIcon, AcademicCapIcon } from '../../icons/Heroicons';
import { UserIcon } from '../../icons/Heroicons';

interface Props {
    className?: string;
}

const SignedInNavBar: React.FC<Props> = ({ className }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            alert(error);
        });
    };

    return (
        <div className="flex flex-col w-full items-center">
            <div className={`${className} flex font-medium bg-gradient-to-l from-[#272A2F] to-[#23252A] p-5 rounded-3xl w-[70%] items-center`}>
                <div className="justify-start">
                    <AcademicCapIcon className="w-10 text-[#9F86C0]"/>
                </div>

                <div className="flex justify-start">
                    <div className="text-[#9F86C0] ml-3">
                        <p>Mai</p>
                    </div>
                </div>

                <div className="flex font-thin justify-center w-full text-white">
                </div>

                <div className="flex justify-end mr-2">
                    <button onClick={handleSignOut}>
                        <div className="text-[#9F86C0]">
                            <p>Sign&nbsp;out</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignedInNavBar;