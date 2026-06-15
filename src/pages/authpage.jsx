// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from '../component/Signin';
import SignUpForm from '../component/Signup';
import ForgotPassword from '../component/Forgotpassword';

const AuthPage = () => {
  return (
    <div className="auth-container">
      {/* If you have a shared wrapper style or background graphic, it goes here */}
      
      <Routes>
        {/* This matches /auth/signin exactly */}
        <Route path="signin" element={<SignInForm />} /> 
        
        {/* Optional: Redirect /auth or typos back to signin */}
        <Route path="*" element={<Navigate to="signin" />} />

        {/* This matches /auth/signup */}
        <Route path="signup" element={<SignUpForm />} />
        
        {/* This matches /auth/forgotpassword */}
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default AuthPage;