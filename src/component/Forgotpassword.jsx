import { Link } from 'react-router-dom';

function ForgotPassword() {

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("Password reset email requested!");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card p-5 border-0 shadow-sm" style={{ width: '100%', maxWidth: '440px', borderRadius: '24px' }}>
            
            <div className="text-center mb-4">
                <div 
                    className="d-inline-flex align-items-center justify-content-center text-white mb-3"
                    style={{ width: '60px', height: '60px', backgroundColor: '#009661', borderRadius: '16px', fontSize: '24px' }}
                >
                    🔒
                </div>
                <h2 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Forgot Password</h2>
                <p className="text-secondary small">Enter your email to reset your password</p>
            </div>

            <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label small fw-semibold text-secondary text-uppercase" style={{ letterSpacing: '0.5px' }}>   
                        Email Address
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

              
                <button 
                    type="submit" 
                    className="btn w-100 py-2 text-white fw-semibold" 
                    style={{ backgroundColor: '#009661', borderRadius: '12px' }}
                >
                    Reset Password
                </button>
            </form>


            <div className="text-center mt-4 pt-2">
              <Link to="/signin" className="text-decoration-none fw-bold" style={{ color: '#009661' }}>
                Back to Sign In
              </Link>
            </div>

        </div>
    </div>
  );
}

export default ForgotPassword;