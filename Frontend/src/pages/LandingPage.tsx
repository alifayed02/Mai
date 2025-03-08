import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar'
import useAuth from '../components/auth/useAuth'

function LandingPage() {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    if(isLoading) {
        return <div className="w-screen h-screen bg-custom-bg"></div>
    }

    const handleSignUp = () => {
        if(user) {
            navigate('/chat');
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-custom-bg">
            <NavBar className="mt-5"/>
            <div className="flex flex-col w-full font-medium 
                            text-center font-sf text-[100px] text-[#DEDEDE] mt-20">
                <p>Personal <span className="text-[#9F86C0]">AI</span> Mentor,</p>
                <p>Just for you.</p>
            </div>
            <div className="flex w-full justify-center mt-12">
                <div className="w-[60%] font-sf text-white text-center">
                    <p><span className="text-[#9F86C0]">Unlock</span> your potential with <span className="text-[#9F86C0] font-medium"> Mai</span>, your 24/7 intelligent companion for
                        <span className="text-[#9F86C0]"> personalized</span> guidance. Whether you're advancing your career, 
                        building new skills, or navigating life's challenges, AI Mentor offers 
                        tailored <span className="text-[#9F86C0]"> advice</span>, 
                        actionable <span className="text-[#9F86C0]"> insights</span>, and 
                        motivational <span className="text-[#9F86C0]"> support</span>—all powered by cutting-edge AI.</p>
                </div>
            </div>
            <div className="flex w-full justify-center mt-20">
                <button onClick={handleSignUp} className="bg-gradient-to-r from-[#404277] to-[#2A2B47] p-3 pl-6 pr-6 rounded-lg">
                    <div className=" text-white">
                        <p>Get&nbsp;Started</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default LandingPage;