import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Key, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { INITIAL_USERS } from '../data/mockData';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Step 1: Submit Email and generate mock OTP
  const handleRequestOtp = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      let users = localStorage.getItem('library_users');
      if (!users) {
        localStorage.setItem('library_users', JSON.stringify(INITIAL_USERS));
        users = JSON.stringify(INITIAL_USERS);
      }
      
      const parsedUsers = JSON.parse(users);
      const userExists = parsedUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());

      setIsLoading(false);

      if (userExists) {
        // Generate a random 6 digit OTP for simulation
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        setStep(2);
        setSuccess(`A password reset code has been sent! (For testing, use code: ${code})`);
      } else {
        setError('No account found with that email address.');
      }
    }, 800);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (otp === generatedOtp || otp === '123456') { // Allow 123456 as universal override
      setStep(3);
    } else {
      setError('Invalid security code. Please check and try again.');
    }
  };

  // Step 3: Save new password
  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem('library_users') || JSON.stringify(INITIAL_USERS));
      const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('library_users', JSON.stringify(users));
        setIsLoading(false);
        setSuccess('Password updated successfully! Redirecting to login...');
        
        setTimeout(() => {
          navigate('/auth/signin');
        }, 1500);
      } else {
        setIsLoading(false);
        setError('An error occurred. User not found.');
      }
    }, 1000);
  };

  return (
    <div className="w-100">
      {/* Back to Login link */}
      <div className="mb-3">
        <Link to="/auth/signin" className="text-white-50 small text-decoration-none hover-underline d-inline-flex align-items-center gap-1.5">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>

      <div className="text-center mb-4">
        <h2 className="serif-font fw-bold text-gradient-gold fs-2 mb-2">Reset Password</h2>
        <p className="text-white-50 small">
          {step === 1 && 'Enter your email to receive a recovery code'}
          {step === 2 && 'Enter the 6-digit code sent to your email'}
          {step === 3 && 'Choose a strong new password'}
        </p>
      </div>

      {error && (
        <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger rounded-3 py-2 px-3 small mb-4 d-flex align-items-center justify-content-between">
          <span>{error}</span>
          <button type="button" className="btn-close btn-close-white small shadow-none" style={{ filter: 'invert(1)' }} onClick={() => setError('')}></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success rounded-3 py-2.5 px-3 small mb-4 d-flex align-items-start gap-2">
          <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleRequestOtp}>
          <div className="form-floating-custom">
            <label className="form-label-custom form-label-dark">Email Address</label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                className="form-control-custom form-control-dark ps-5"
                placeholder="name@student.lasu.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-accent-custom w-100 py-3 mt-2 border-0"
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span>Send Recovery Code</span>
            )}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <div className="form-floating-custom">
            <label className="form-label-custom form-label-dark">Verification Code</label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                <Key size={18} />
              </span>
              <input
                type="text"
                required
                maxLength="6"
                className="form-control-custom form-control-dark ps-5 text-center fw-bold letter-spacing-lg"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-accent-custom w-100 py-3 mt-2 border-0"
          >
            Verify Code
          </button>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn bg-transparent text-accent-light border-0 small hover-underline"
              onClick={() => {
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                setGeneratedOtp(code);
                setSuccess(`A new code has been sent! (For testing, use code: ${code})`);
              }}
            >
              Resend Code
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <div className="form-floating-custom">
            <label className="form-label-custom form-label-dark">New Password</label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="form-control-custom form-control-dark px-5"
                placeholder="New Password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-white-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-floating-custom">
            <label className="form-label-custom form-label-dark">Confirm New Password</label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                <Lock size={18} />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                className="form-control-custom form-control-dark px-5"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-white-50"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-accent-custom w-100 py-3 mt-2 border-0"
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;