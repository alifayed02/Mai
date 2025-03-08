import React, { useState } from 'react';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import FormField from './FormField'
import Button from './Button'

interface FormData {
    email: string;
    password: string;
    confirm_password: string;
}

interface FormProps {
    className?: string;
    buttonLink?: string;
}

const SignUpForm: React.FC<FormProps> = ({className, buttonLink}) => {

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password != formData.confirm_password) {
            setError("Passwords do not match")
            alert(error);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const uid = auth.currentUser?.uid
            console.log("User signed up: ", userCredential.user);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                alert(error);
            } else {
                setError("Unknown error occured");
            }
        }

        console.log(error);
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange}/>
                <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange}/>
                <FormField label="Confirm Password" name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange}/>
                <Button/>
            </form>
            <div className="mt-2 text-center">
                <p className="text-white font-sf font-extralight italic">Already have an account? <span className="text-[#BE95C4] not-italic pl-1"><a href={buttonLink}>Sign in</a></span></p>
            </div>
        </div>
    )
}

export default SignUpForm;