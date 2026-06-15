import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. FIXED: Imported the Router Hook
import { Menu, Search, User, Shield, Link, Plus, Copy, X, LogOut } from 'lucide-react';

function AdminPanel() {
  const navigate = useNavigate(); // 2. FIXED: Initialized routing hook cleanly

  // --- SUB-NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'library', 'upload'
  const [memberSearch, setMemberSearch] = useState('');

  // --- MEMBER DIRECTORY DATASTORE ---
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "System Admin (Demo)",
      email: "admin@dlcf.org",
      role: "ADMIN",
      isSelf: true,
      initial: "S"
    },
    {
      id: 2,
      name: "Promised Denton",
      email: "promiseddentonwest@gmail.com",
      role: "MEMBER",
      isSelf: false,
      initial: "P"
    },
    {
      id: 3,
      name: "Jane Doe",
      email: "member@dlcf.org",
      role: "MEMBER",
      isSelf: false,
      initial: "J"
    }
  ]);

  // --- REGISTRATION LINKS DATASTORE ---
  const [regLinks, setRegLinks] = useState([
    { id: 1, token: "demo-link-token-1" },
    { id: 2, token: "demo-link-token-2" }
  ]);

  // --- INTERACTIVE ACTIONS ---
  const handleToggleAdminRole = (id) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        return { ...m, role: m.role === 'ADMIN' ? 'MEMBER' : 'ADMIN' };
      }
      return m;
    }));
  };

  const handleRevokeUser = (id) => {
    if(window.confirm("Are you sure you want to revoke access for this user?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleGenerateLink = () => {
    const newToken = `demo-link-token-${Math.floor(Math.random() * 1000)}`;
    setRegLinks([...regLinks, { id: Date.now(), token: newToken }]);
  };

  const handleRemoveLink = (id) => {
    setRegLinks(regLinks.filter(link => link.id !== id));
  };

  const handleCopyLink = (token) => {
    navigator.clipboard.writeText(`https://dlcf-library.org/register?token=${token}`);
    alert(`Copied path token to clipboard: ${token}`);
  };

  // Filter members matching input text box
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="vh-100 d-flex flex-column bg-light overflow-hidden">
      
      {/* 1. TOP MAIN HEADER */}
      <header className="navbar navbar-expand bg-white border-bottom px-4 justify-content-between align-items-center" style={{ height: '70px', zIndex: 10 }}>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light d-flex align-items-center justify-content-center p-2 rounded-circle">
            <Menu size={20} className="text-dark" />
          </button>
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4">📊</span>
            <span className="fw-bold fs-5 text-success">DLCF E-Library</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* 3. FIXED: Handled onClick navigation natively within the JSX framework element block */}
          <button 
            className="btn btn-success fw-semibold px-4 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm border-0 btn-sm"
            style={{ backgroundColor: '#00a86b' }}
            onClick={() => navigate('/landingpage')}
          >
            <LogOut size={16} /> Exit Admin
          </button>
          
          <div className="btn btn-light bg-opacity-50 text-dark border px-3 py-1.5 fs-7 rounded-pill d-flex align-items-center gap-2 fw-semibold">
            <span className="bg-success rounded-circle d-block" style={{ width: '8px', height: '8px' }}></span>
            System Admin (Demo)
          </div>
        </div>
      </header>

      {/* 2. ADMIN CORE CONTENT BLOCK */}
      <div className="flex-grow-1 overflow-auto p-4 px-md-5">
        
        {/* Sub Navigation Row Selectors */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <button 
            className={`btn rounded-3 px-4 py-2 fw-bold text-sm border-0 transition-all ${activeTab === 'members' ? 'btn-success text-white shadow' : 'bg-white text-muted border'}`}
            style={activeTab === 'members' ? { backgroundColor: '#029e61' } : {}}
            onClick={() => setActiveTab('members')}
          >
            Member Management
          </button>
          <button 
            className={`btn rounded-3 px-4 py-2 fw-bold text-sm border-0 bg-white text-muted transition-all border ${activeTab === 'library' ? 'shadow text-dark fw-bold' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            Library Management
          </button>
          <button 
            className={`btn rounded-3 px-4 py-2 fw-bold text-sm border-0 bg-white text-muted transition-all border ${activeTab === 'upload' ? 'shadow text-dark fw-bold' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Mass Upload (GDrive)
          </button>
        </div>

        {/* CONDITIONALLY RENDER VIEW BASED ON SUB NAV TAB */}
        {activeTab === 'members' ? (
          <div className="row g-4">
            
            {/* LEFT CARD COLUMN: Member Directory Panel */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                
                {/* Directory Meta Rows */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                      <User size={18} />
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">Member Directory</h5>
                  </div>
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1.5 fw-semibold text-xs">
                    {members.length} Total
                  </span>
                </div>

                {/* Directory Input Filter Textbox */}
                <div className="input-group border rounded-3 bg-light bg-opacity-50 px-3 py-2 align-items-center mb-4 shadow-none">
                  <Search size={16} className="text-muted me-2" />
                  <input 
                    type="text" 
                    className="form-control border-0 p-0 bg-transparent shadow-none small"
                    placeholder="Search members by name or email..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                  />
                </div>

                {/* Listing Out Rows dynamically */}
                <div className="d-flex flex-column gap-3">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="d-flex flex-wrap align-items-center justify-content-between p-3 border-bottom border-light">
                      
                      {/* Member Identity Block */}
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle text-primary fw-bold d-flex align-items-center justify-content-center border"
                          style={{ width: '45px', height: '45px', backgroundColor: '#eef4ff' }}
                        >
                          {member.initial}
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="mb-0 fw-bold text-dark">{member.name}</h6>
                            {member.role === 'ADMIN' && (
                              <span className="badge bg-primary text-white text-uppercase" style={{ fontSize: '0.6rem' }}>ADMIN</span>
                            )}
                            {member.isSelf && (
                              <span className="badge bg-light text-muted border text-uppercase" style={{ fontSize: '0.6rem' }}>YOU</span>
                            )}
                          </div>
                          <span className="text-muted small d-block">{member.email}</span>
                        </div>
                      </div>

                      {/* Action Block Triggers */}
                      <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                        {member.isSelf ? (
                          <button 
                            className="btn btn-sm btn-outline-warning text-warning-emphasis bg-warning bg-opacity-10 border-0 fw-bold rounded-3 px-3 py-2 d-flex align-items-center gap-1"
                            onClick={() => handleToggleAdminRole(member.id)}
                          >
                            ⚠️ Demote Self
                          </button>
                        ) : (
                          <>
                            <button 
                              className="btn btn-sm btn-primary fw-bold rounded-3 px-3 py-2 d-flex align-items-center gap-1 border-0 shadow-sm"
                              style={{ backgroundColor: '#1b6bf9' }}
                              onClick={() => handleToggleAdminRole(member.id)}
                            >
                              <Shield size={14} /> {member.role === 'ADMIN' ? 'Demote to Member' : 'Invite Admin'}
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger bg-danger bg-opacity-10 border-0 fw-bold rounded-3 px-3 py-2"
                              onClick={() => handleRevokeUser(member.id)}
                            >
                              🚫 Revoke
                            </button>
                          </>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* RIGHT SIDEBAR COLUMN: Registration Links Manager */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                
                {/* Header info layout line */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                      <Link size={18} />
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">Registration Links</h5>
                  </div>
                  <button 
                    className="btn btn-light text-success p-1.5 rounded-3 border-0 bg-opacity-70 shadow-sm"
                    onClick={handleGenerateLink}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {/* Token Loop Wrapper block container */}
                <div className="d-flex flex-column gap-3">
                  {regLinks.map((link) => (
                    <div key={link.id} className="border border-light rounded-4 p-3 bg-light bg-opacity-25">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-success small fw-bold tracking-wider text-uppercase" style={{ fontSize: '0.65rem' }}>
                          Multi-Use Link
                        </span>
                        <div className="d-flex align-items-center gap-2">
                          <button 
                            className="btn btn-link text-muted p-0 border-0" 
                            onClick={() => handleCopyLink(link.token)}
                          >
                            <Copy size={15} />
                          </button>
                          <button 
                            className="btn btn-link text-muted p-0 border-0"
                            onClick={() => handleRemoveLink(link.id)}
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>
                      <code className="text-muted font-monospace small bg-white border p-2 rounded-3 d-block mt-1 text-truncate">
                        {link.token}
                      </code>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* PLACEHOLDER STATES FOR AUXILIARY MODULE SUBTABS */
          <div className="text-center py-5 border bg-white rounded-4 shadow-sm">
            <span className="fs-2 mb-2 d-block">⚙️</span>
            <h6 className="fw-bold text-secondary mb-1">Module Under Active Production</h6>
            <p className="text-muted small mb-0">The specified UI component view engine is routing correctly.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;