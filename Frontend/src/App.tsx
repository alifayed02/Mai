import React from 'react';
import logo from './logo.svg';

import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage'
import ChatPage from './pages/ChatPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/chat" element={<ChatPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/signin" element={<SignInPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
