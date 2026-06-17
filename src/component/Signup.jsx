import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Building, School, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { FACULTIES, LEVELS, CAMPUSES, INITIAL_USERS } from '../data/mockData';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    faculty: '',
    department: '',
    level: '',
    campus: ''
  });

  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update departments list when selected faculty changes
  useEffect(() => {
    if (formData.faculty) {
      const selectedFac = FACULTIES.find((f) => f.id === formData.faculty);
      setAvailableDepartments(selectedFac ? selectedFac.departments : []);
      // Reset department when faculty changes
      setFormData((prev) => ({ ...prev, department: '' }));
    } else {
      setAvailableDepartments([]);
      setFormData((prev) => ({ ...prev, department: '' }));
    }
  }, [formData.faculty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Field Validations
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!formData.faculty || !formData.department || !formData.level || !formData.campus) {
      setError('Please fill out all dropdown selections.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Get users from localStorage, or initialize with mock data if not set
      let users = localStorage.getItem('library_users');
      if (!users) {
        localStorage.setItem('library_users', JSON.stringify(INITIAL_USERS));
        users = JSON.stringify(INITIAL_USERS);
      }

      const parsedUsers = JSON.parse(users);

      // Check if email already exists
      const emailExists = parsedUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (emailExists) {
        setIsLoading(false);
        setError('An account with this email already exists.');
        return;
      }

      // Create new user
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        faculty: formData.faculty,
        department: formData.department,
        level: formData.level,
        campus: formData.campus,
        role: 'MEMBER' // Default role
      };

      parsedUsers.push(newUser);
      localStorage.setItem('library_users', JSON.stringify(parsedUsers));

      setIsLoading(false);
      setSuccess('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-100">
      <div className="text-center mb-4">
        <h2 className="serif-font fw-bold text-gradient-gold fs-2 mb-2">Create Account</h2>
        <p className="text-white-50 small">Join DLCF LASUojo E-Library today</p>
      </div>

      {error && (
        <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger rounded-3 py-2 px-3 small mb-4 d-flex align-items-center justify-content-between">
          <span>{error}</span>
          <button type="button" className="btn-close btn-close-white small shadow-none" style={{ filter: 'invert(1)' }} onClick={() => setError('')}></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success rounded-3 py-2.5 px-3 small mb-4 d-flex align-items-center gap-2">
          <CheckCircle size={16} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }} className="pe-1">
        {/* Name Fields (2 Columns) */}
        <div className="row g-2">
          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">First Name</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  name="firstName"
                  className="form-control-custom form-control-dark ps-5 py-2.5"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Last Name</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  name="lastName"
                  className="form-control-custom form-control-dark ps-5 py-2.5"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div className="form-floating-custom">
          <label className="form-label-custom form-label-dark">Email Address</label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
              <Mail size={16} />
            </span>
            <input
              type="email"
              required
              name="email"
              className="form-control-custom form-control-dark ps-5 py-2.5"
              placeholder="johndoe@student.lasu.edu.ng"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Passwords (2 Columns) */}
        <div className="row g-2">
          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Password</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  name="password"
                  className="form-control-custom form-control-dark px-5 py-2.5"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-white-50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Confirm Password</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <Lock size={16} />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  name="confirmPassword"
                  className="form-control-custom form-control-dark px-5 py-2.5"
                  placeholder="••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-white-50"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Details - Faculty & Department */}
        <div className="row g-2">
          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Faculty</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <School size={16} />
                </span>
                <select
                  required
                  name="faculty"
                  className="form-select-custom form-select-dark ps-5 py-2.5"
                  value={formData.faculty}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select...</option>
                  {FACULTIES.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Department</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <Building size={16} />
                </span>
                <select
                  required
                  name="department"
                  disabled={!formData.faculty}
                  className="form-select-custom form-select-dark ps-5 py-2.5"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select ....</option>
                  {availableDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Level and Campus */}
        <div className="row g-2">
          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Academic Level</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <GraduationCap size={16} />
                </span>
                <select
                  required
                  name="level"
                  className="form-select-custom form-select-dark ps-5 py-2.5"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select...</option>
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="form-floating-custom">
              <label className="form-label-custom form-label-dark">Campus</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-white-50">
                  <MapPin size={16} />
                </span>
                <select
                  required
                  name="campus"
                  className="form-select-custom form-select-dark ps-5 py-2.5"
                  value={formData.campus}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select...</option>
                  {CAMPUSES.map((camp) => (
                    <option key={camp} value={camp}>
                      {camp}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
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
            <span>Sign Up</span>
          )}
        </button>
      </form>

      <div className="text-center mt-3 pt-2 border-top border-secondary border-opacity-25">
        <p className="text-white-50 small mb-0">
          Already have an account?{' '}
          <Link to="/auth/signin" className="text-accent-light fw-semibold text-decoration-none hover-underline ms-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;