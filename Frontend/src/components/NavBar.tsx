import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../components/auth/useAuth'
import { getAuth, signOut } from "firebase/auth";

import { MoonIcon, AcademicCapIcon } from '../icons/Heroicons';

interface Props {
    className?: string;
}

const NavBar: React.FC<Props> = ({ className }) => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/signin');
    };

    const handleChat = () => {
        navigate('/chat');
    }

    if(isLoading) {
        return <div className="w-screen h-screen bg-custom-bg"></div>
    }

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
                <div className="">
                    <AcademicCapIcon className="w-10 text-[#9F86C0]"/>
                </div>

                <div className="flex">
                   <div className="text-[#9F86C0] ml-3">
                        <p>Mai</p>
                    </div>
                </div>

                <div className="flex font-thin justify-center w-full text-white">
                </div>

                { !user &&
                    <div className="flex">
                        <div className="flex justify-end mr-2">
                            <button onClick={handleLogin}>
                                <p className="text-[#9F86C0] mr-3">Log&nbsp;in</p>
                            </button>
                        </div>

                        <div className="flex justify-end mr-2">
                            <button onClick={handleSignUp} className="bg-[#5E548E] p-2 pl-4 pr-4 rounded-lg">
                                <div className=" text-white ">
                                    <p>Sign&nbsp;Up</p>
                                </div>
                            </button>
                        </div>
                    </div>
                }
                { user && 
                    <div>
                        <div className="flex justify-end mr-2">
                            <button onClick={handleChat} className="bg-[#5E548E] p-2 pl-4 pr-4 rounded-lg">
                                <div className=" text-white text-center">
                                    <p>Chat&nbsp;</p>
                                </div>
                            </button>
                            <button onClick={handleSignOut} className="ml-4">
                                <div className="text-[#9F86C0]">
                                    <p>Sign&nbsp;out</p>
                                </div>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar;