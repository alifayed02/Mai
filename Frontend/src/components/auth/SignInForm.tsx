import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import FormField from './FormField'
import Button from './Button'

interface FormData {
    email: string;
    password: string;
}

interface FormProps {
    className?: string;
    buttonLink?: string;
}

const SignInForm: React.FC<FormProps> = ({className, buttonLink}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Signed in user:", userCredential.user);
            navigate("/chat");
        } catch (err: unknown) {
            if (err instanceof Error) {
              setError(err.message);
              console.log(error);
            } else {
              setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange}/>
                <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange}/>
                <Button text="Sign in"/>
            </form>
            <div className="mt-2 text-center">
                <p className="text-white font-sf font-thin italic">Don't have an account? <span className="text-[#BE95C4] not-italic pl-1"><a href={buttonLink}>Sign up</a></span></p>
            </div>
        </div>
    )
}

export default SignInForm;