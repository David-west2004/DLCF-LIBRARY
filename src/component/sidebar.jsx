import { useNavigate } from 'react-router-dom';
import { Home, GraduationCap, BookOpen, Shield, LogOut, X, User } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('library_currentUser');
    navigate('/auth/signin');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'academic', label: 'Academics', icon: GraduationCap },
    { id: 'self-development', label: 'Self  Development', icon: BookOpen }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed-top w-100 vh-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 95 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`sidebar-wrapper glass-panel border-end d-flex flex-column ${isOpen ? '' : 'sidebar-collapsed'
          }`}
        style={{ zIndex: 100 }}
      >
        {/* Header Branding */}
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm">
              <span className="serif-font fw-bold fs-5">DL</span>
            </div>
            <div>
              <h5 className="mb-0 fw-bold fs-6 tracking-wide text-primary serif-font">DLCF LASUojo</h5>
              <span className="text-muted small fw-medium" style={{ fontSize: '0.7rem' }}>E-LIBRARY SYSTEM</span>
            </div>
          </div>
          <button
            className="btn btn-light d-lg-none p-1.5 rounded-circle shadow-none border-0"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 flex-grow-1">
          <ul className="nav flex-column gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-100 text-start border-0 px-3.5 py-3 rounded-3 d-flex align-items-center gap-3 transition-all fw-medium ${isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-transparent text-secondary hover-bg-light'
                      }`}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)' : '',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-muted'} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}

            {/* Admin Panel Quick Redirect (Only visible to Admins) */}
            {user && user.role === 'ADMIN' && (
              <li className="nav-item mt-4 pt-4 border-top">
                <span className="px-3 text-muted small fw-bold tracking-wider d-block mb-2 text-uppercase" style={{ fontSize: '0.65rem' }}>
                  Admin Tools
                </span>
                <button
                  onClick={() => {
                    navigate('/admin');
                    setIsOpen(false);
                  }}
                  className="w-100 text-start border-0 px-3.5 py-3 rounded-3 d-flex align-items-center gap-3 text-light bg-primary bg-opacity-54 hover-bg-danger hover-bg-opacity-10 fw-semibold"
                  style={{ transition: 'all 0.2s ease' }}
                >
                  <Shield size={18} />
                  <span>Admin Panel</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* User Profile Summary Card */}
        {user && (
          <div className="p-3.5 border-top bg-light bg-opacity-40">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <h6 className="mb-0 text-truncate fw-bold fs-7 text-primary">{user.firstName} {user.lastName}</h6>
                <p className="mb-0 text-truncate text-muted small" style={{ fontSize: '0.72rem' }}>
                  {user.department} ({user.level})
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-outline-danger w-100 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0 fw-semibold bg-white bg-opacity-5 hover-bg-danger hover-bg-opacity-10"
              style={{ fontSize: '0.85rem' }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;