import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate, Navigate } from "react-router-dom";

import TextBox from '../components/TextBox'
import SignedInNavBar from '../components/auth/SignedInNavBar'
import UserMessage from '../components/ai/UserMessage';
import AssistantMessage from '../components/ai/AssistantMessage';

import useAuth from '../components/auth/useAuth'

import { MoonIcon, AcademicCapIcon } from '../icons/Heroicons';

interface Message {
    id: number;
    role: string;
    text: string;
}

function ChatPage() {
    const navigate = useNavigate();
    const [threadCreated, setThreadCreated] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messagesPreloaded, setMessagesPreloaded] = useState<boolean>(false);
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if(isLoading) return;
        if (!user) return;

        const fetchMessageHistory = async () => {
            try {
                const loaded_messages = await getMessageHistory();
                setMessages(loaded_messages);
                setMessagesPreloaded(true);
                
                if(loaded_messages.length > 0) {
                    setThreadCreated(true);
                }
            } catch (error) {
                console.error("Failed to fetch message history:", error);
            }
        };

        fetchMessageHistory();
    }, [user]);

    if(isLoading) {
        return <div className="w-screen h-screen bg-custom-bg"></div>
    }

    if(!user) {
        return <Navigate to="/signin"/>
    }
    
    const getMessageHistory = async() => {
        const history_response = await fetch(`http://127.0.0.1:5000/message_history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.uid,
            })
        })
        if(!history_response.ok) {
            throw new Error(`HTTP Error! status: ${history_response.status}`)
        }
        const history_result = await history_response.json();

        const loaded_messages: Message[] = [];

        for(const key in history_result) {
            if(history_result.hasOwnProperty(key)) {
                const item = history_result[key];
                loaded_messages.push({ id: item.id, role: item.role, text: item.text});
            }
        }

        return loaded_messages;
    }

    const addMessages = (newMessages: Message[]) => {
        setMessages([...messages, ...newMessages]);
    };

    const handleNewChat = async () => {
        const delete_response = await fetch(`http://127.0.0.1:5000/delete_thread`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.uid,
            })
        })
        if(!delete_response.ok) {
            throw new Error(`HTTP Error! status: ${delete_response.status}`)
        }
        const delete_result = await delete_response.json();

        setThreadCreated(false);
        setMessages([]);
        navigate("/chat");
    }

    const handleEnter = async (
        e: React.KeyboardEvent<HTMLInputElement>,
        clearInput: () => void
    ) => {
        if(e.key === "Enter") {
            e.preventDefault();

            const inputElement = e.target as HTMLInputElement;
            const user_text: string = inputElement.value;
            clearInput();
            
            if(!user) {
                navigate("/signin");
                return;
            }

            const uid = user.uid;

            if(!threadCreated) {
                const thread_response = await fetch(`http://127.0.0.1:5000/thread`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "user_id": uid,
                        "new": true,
                        messages: []
                    })
                })
                if(!thread_response.ok) {
                    throw new Error(`HTTP Error! status: ${thread_response.status}`)
                }
                setThreadCreated(true);
            }

            addMessages([{ id: messages.length, role: "user", text: user_text }]);
            
            const chat_response = await fetch(`http://127.0.0.1:5000/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"user_id": uid, "message": [user_text]})
            })
            if(!chat_response.ok) {
                throw new Error(`HTTP Error! status: ${chat_response.status}`)
            }
            const chat_result = await chat_response.json();

            const newMessages: Message[] = [
                { id: messages.length, role: "user", text: chat_result.user_message },
                { id: messages.length, role: "assistant", text: chat_result.assistant_message },
            ];

            console.log(chat_result.assistant_message);

            addMessages(newMessages);
        }
    }
            
    return (
        <div className="flex flex-col w-screen h-screen justify-between bg-custom-bg">
            <div className="flex flex-col w-full">
                <SignedInNavBar className="mt-5"/>
            </div>
            <div className="flex flex-col">
                {!threadCreated && 
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        {!threadCreated && 
                            <div className="flex flex-col items-center mb-40 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-40 text-[#9f86c0]">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 
                                   20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 
                                   59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 
                                   0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 
                                   0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 
                                   15.75v-1.5" /> 
                                </svg> 
                                <p className="text-center text-transparent bg-clip-text bg-gradient-to-r 
                                from-[#9f86c0] to-[#e0b1cb] text-4xl">How can I assist you today?</p>
                            </div>
                        }
                    </div>
                }
                {threadCreated && 
                    <div className="flex flex-col w-full items-center">
                        {!threadCreated && <AcademicCapIcon className={`w-40 mb-40 text-[#B7A4C1]`}/>}
                    </div>
                }
                <div className="mt-8">
                    <div className="flex flex-col items-center">
                        <div className={`flex flex-col w-5/6 justify-end ${threadCreated ? 'overflow-y-auto h-[calc(100vh-300px)]' : ''}`}>
                            {messages.map((message) => {
                                if (message.role === "user") {
                                    return (<div className="flex flex-col items-end">
                                                <UserMessage    key={message.id} 
                                                                content={message.text} />
                                            </div>)
                                } else if (message.role === "assistant") {
                                    return (<div className="flex flex-col">
                                                <AssistantMessage   key={message.id} 
                                                                    content={message.text} />
                                            </div>)
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mb-16 mt-8 items-center justify-end">
                    <TextBox handleNewChat={handleNewChat} handleEnter={handleEnter}/>
               </div>
            </div>
        </div>
    );
}

export default ChatPage;