import { Link, useNavigate } from 'react-router-dom';

function Signin() {


    const navigate = useNavigate();


  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    navigate('/landingpage');
  };

  return (
    
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      
      {/* 2. The structural card that mimics the clean frame style of the reference UI */}
      <div className="card p-5 border-0 shadow-sm" style={{ width: '100%', maxWidth: '440px', borderRadius: '24px' }}>
        
        
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center text-white mb-3" 
            style={{ width: '60px', height: '60px', backgroundColor: '#009661', borderRadius: '16px', fontSize: '24px' }}
          >
            📚
          </div>
          <h2 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Welcome Back</h2>
          <p className="text-secondary small">Sign in to access the DLCF E-Library</p>
        </div>


        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label small fw-semibold text-secondary text-uppercase" style={{ letterSpacing: '0.5px' }}>
              Email address
            </label>
            <input 
              type="email" 
              className="form-control py-2 bg-light border-light-subtle" 
              id="email" 
              placeholder="john@example.com" 
              required 
              style={{ borderRadius: '10px' }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label small fw-semibold text-secondary text-uppercase" style={{ letterSpacing: '0.5px' }}>
              Password
            </label>
            <input 
              type="password" 
              className="form-control py-2 bg-light border-light-subtle" 
              id="password" 
              placeholder="••••••••" 
              required 
              style={{ borderRadius: '10px' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn w-100 py-2 text-white fw-semibold" 
            style={{ backgroundColor: '#009661', borderRadius: '12px' }}
          >
            Sign In
          </button>

          <div className="text-center mt-3">
            <Link to="/forgotpassword" className="text-decoration-none small fw-semibold" style={{ color: '#009661' }}>
                Forgot Password?
            </Link>
          </div>
        </form>

        <div className="text-center mt-4 pt-2">
          <p className="small text-muted mb-0">
            Don't have an account yet?
          </p>
          <Link to="/signup" className="text-decoration-none fw-bold" style={{ color: '#009661' }}>
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signin;