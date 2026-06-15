import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div 
      className="d-flex flex-column justify-content-between p-4 bg-white vh-100 border-end" 
      style={{ width: '320px', fontFamily: 'system-ui, sans-serif' }}
    >
      {/* --- TOP SECTION: BRAND HEADER --- */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
          <div className="d-flex align-items-center gap-3">
            {/* Green Brand Logo Box */}
            <div 
              className="d-flex align-items-center justify-content-center text-white fw-bold"
              style={{ width: '42px', height: '42px', backgroundColor: '#009661', borderRadius: '10px', fontSize: '18px' }}
            >
              📚
            </div>
            <h5 className="fw-bold mb-0" style={{ color: '#1e293b' }}>DLCF Library</h5>
          </div>
          {/* Close button icon indicator */}
          <button className="btn-close fs-6 text-muted border-0" aria-label="Close"></button>
        </div>

        {/* --- MIDDLE SECTION: NAVIGATION LINKS --- */}
        <div className="nav flex-column gap-1">
          {/* Default Unselected Link */}
          <Link to="/library" className="nav-link d-flex align-items-center gap-3 py-3 px-3 text-secondary fw-semibold rounded-3 fs-5">
            <span>📖</span> Library
          </Link>

          {/* Active Link (Green highlight style matching image) */}
          <Link 
            to="/admin" 
            className="nav-link d-flex align-items-center gap-3 py-3 px-3 fw-bold rounded-3 fs-5"
            style={{ backgroundColor: '#effbf6', color: '#009661' }}
          >
            <span>🛡️</span> Admin Panel
          </Link>

          {/* Section Divider Subheader */}
          <div className="text-uppercase small fw-bold text-muted tracking-wider mt-4 mb-2 px-3" style={{ letterSpacing: '0.8px', fontSize: '12px' }}>
            Sections
          </div>

        </div>
      </div>

      {/* --- BOTTOM SECTION: USER PROFILE & SESSION --- */}
      <div className="border-top pt-4">
        {/* Profile Info Block */}
        <div className="d-flex align-items-center gap-3 mb-4 px-2">
          {/* Round Light Green User Icon Avatar */}
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle text-success"
            style={{ width: '45px', height: '45px', backgroundColor: '#d1fae5', fontSize: '20px' }}
          >
            👤
          </div>
          <div>
            <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '15px' }}>System Admin (Demo)</h6>
            <small className="text-muted d-block" style={{ fontSize: '13px' }}>admin@dlcf.org</small>
          </div>
        </div>

        {/* Profile Settings and Sign Out Links */}
        <div className="nav flex-column gap-1">
          <Link to="/profile" className="nav-link d-flex align-items-center gap-3 py-2 px-2 text-secondary fw-semibold fs-5">
            <span>⚙️</span> My Profile
          </Link>

          <Link to="/signin" className="nav-link d-flex align-items-center gap-3 py-2 px-2 fw-bold fs-5 text-danger">
            <span>↩️</span> Sign Out
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;