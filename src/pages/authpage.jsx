import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from '../component/Signin';
import SignUpForm from '../component/Signup';
import ForgotPassword from '../component/Forgotpassword';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';

// List of stunning test backgrounds for the e-library
// const BACKGROUND_IMAGES = [
//   'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop', // Cozy library
//   'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop', // Book shelves
//   'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop', // Campus architecture
//   'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop', // Graduation/Study
//   'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop'  // Book & Laptop
// ];

const BACKGROUND_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8
];

const AuthPage = () => {
  const [bgIndex, setBgIndex] = useState(0);

  // Background slideshow interval handler
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // changes every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="auth-page-container">
      {/* Background Slideshow */}
      <div className="slideshow-background">
        {BACKGROUND_IMAGES.map((imgUrl, index) => (
          <div
            key={imgUrl}
            className={`slide ${index === bgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${imgUrl})` }}
          />
        ))}
      </div>
      <div className="slideshow-overlay" />

      {/* Auth Card Content */}
      <div className="auth-card-wrapper">
        <div className="glass-panel-dark p-4 p-md-5 rounded-4 border shadow-lg">
          {/* Logo Brand Header */}
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center mb-3 shadow-lg" style={{ width: '64px', height: '64px' }}>
              <img src="/logo.png" alt="DLCF Logo" className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h1 className="auth-logo-text fs-4 fw-bold text-white mb-0 text-uppercase tracking-wider">
              DLCF LASUojo
            </h1>
            <p className="text-accent-light small mb-0 fw-semibold tracking-widest text-uppercase" style={{ fontSize: '0.65rem' }}>
              E-Library
            </p>
          </div>

          <Routes>
            <Route path="signin" element={<SignInForm />} />
            <Route path="signup" element={<SignUpForm />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            {/* Fallback to signin */}
            <Route path="*" element={<Navigate to="signin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;