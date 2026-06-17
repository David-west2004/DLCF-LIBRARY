import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { INITIAL_USERS } from '../data/mockData';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Get users from localStorage, or initialize with mock data if not set
    let users = localStorage.getItem('library_users');
    if (!users) {
      localStorage.setItem('library_users', JSON.stringify(INITIAL_USERS));
      users = JSON.stringify(INITIAL_USERS);
    }

    const parsedUsers = JSON.parse(users);

    // Simple verification simulation
    setTimeout(() => {
      const user = parsedUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      setIsLoading(false);
      if (user) {
        localStorage.setItem('library_currentUser', JSON.stringify(user));
        // Redirect based on role
        if (user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/library');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 800);
  };

  return (
    <div className="w-100">
      <div className="text-center mb-4">
        <h2 className="serif-font fw-bold text-gradient-gold fs-2 mb-2">Welcome Back</h2>
        <p className="text-white-50 small">Log in to access your DLCF academic & spiritual library</p>
      </div>

      {error && (
        <div className="alert alert-danger border-0 bg-primary bg-opacity-10 text-warning rounded-3 py-2.5 px-3 small mb-4 d-flex align-items-center justify-content-between" role="alert">
          <span>{error}</span>
          <button type="button" className="btn-close btn-close-white small shadow-none" style={{ filter: 'invert(1) grayscale(100%) brightness(200%)' }} onClick={() => setError('')}></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
              placeholder="e.g. name@student.lasu.edu.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-floating-custom">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label-custom form-label-dark mb-0">Password</label>
            <Link to="/auth/forgotpassword" className="text-accent-light small text-decoration-none hover-underline">
              Forgot Password?
            </Link>
          </div>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="form-control-custom form-control-dark px-5"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          disabled={isLoading}
          className="btn-accent-custom w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-2 border-0"
        >
          {isLoading ? (
            <div className="spinner-border spinner-border-sm text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <LogIn size={18} />
              <span>Log In</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center mt-4 pt-2 border-top border-secondary border-opacity-25">
        <p className="text-white-50 small mb-0">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-accent-light fw-semibold text-decoration-none hover-underline ms-1">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;