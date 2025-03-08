import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import IntroBox from '../components/auth/IntroBox'
import FormHeader from '../components/auth/FormHeader'
import SignInForm from '../components/auth/SignInForm'

import useAuth from '../components/auth/useAuth'

interface FormData {
    name: string;
    email: string;
    password: string;
  }

function SignInPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });

    const { user, isLoading } = useAuth();

    if(isLoading) {
        return <div className="w-screen h-screen bg-custom-bg"></div>
    }

    if(user) {
        return <Navigate to="/chat"/>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="flex w-screen h-screen bg-custom-bg">
            <div className="flex flex-col justify-center w-1/2">
                <div className="w-full pl-[20%] pr-[20%]">
                    <FormHeader title="Welcome Back"/>
                    <SignInForm buttonLink="/signup"/>
                </div>
            </div>
            <IntroBox className="w-1/2 pt-[3%] pb-[3%] pr-[3%]"/>
        </div>
    )
}

export default SignInPage;