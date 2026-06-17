import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, UserPlus, Users, Upload, BookOpen, Trash2, ArrowLeft, LogOut, Search, Plus, HelpCircle, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { FACULTIES, LEVELS, CAMPUSES, INITIAL_USERS } from '../data/mockData';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'upload', 'catalog'

  // --- DATABASE STATES ---
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  // --- FORMS & SEARCH STATES ---
  const [userSearch, setUserSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Add Admin Form
  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    faculty: 'science',
    department: 'Computer Science',
    level: '100L',
    campus: 'Ojo'
  });

  // 2. Upload Book Form
  const [uploadSource, setUploadSource] = useState('local'); // 'local' or 'drive'
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    type: 'academic', // 'academic', 'self-development'
    // Academic fields
    faculty: '',
    department: '',
    level: '',
    code: '',
    // Self-development fields
    category: 'Faith', // 'Faith', 'Self Development'
    // Source files
    fileUrl: '',
    fileName: '',
    customCoverUrl: ''
  });

  const [availableDepts, setAvailableDepts] = useState([]);

  // Load auth session and check permission
  useEffect(() => {
    const storedUser = localStorage.getItem('library_currentUser');
    if (!storedUser) {
      navigate('/auth/signin');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'ADMIN') {
      // Access denied
      navigate('/library');
      return;
    }
    setCurrentUser(parsedUser);

    // Sync Users List
    let storedUsers = localStorage.getItem('library_users');
    if (!storedUsers) {
      localStorage.setItem('library_users', JSON.stringify(INITIAL_USERS));
      storedUsers = JSON.stringify(INITIAL_USERS);
    }
    setUsers(JSON.parse(storedUsers));

    // Sync Books List
    let storedBooks = localStorage.getItem('library_books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, [navigate]);

  // Sync departments for Book Upload Faculty select
  useEffect(() => {
    if (newBook.faculty) {
      const facObj = FACULTIES.find((f) => f.id === newBook.faculty);
      setAvailableDepts(facObj ? facObj.departments : []);
      setNewBook((prev) => ({ ...prev, department: '' }));
    } else {
      setAvailableDepts([]);
      setNewBook((prev) => ({ ...prev, department: '' }));
    }
  }, [newBook.faculty]);

  // --- ACTIONS ---

  // Promote / Demote Admin
  const handleToggleRole = (email) => {
    setErrorMsg('');
    setSuccessMsg('');

    if (currentUser.email.toLowerCase() === email.toLowerCase()) {
      setErrorMsg("Security constraint: You cannot demote yourself from the admin role.");
      return;
    }

    const updatedUsers = users.map((u) => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        const nextRole = u.role === 'ADMIN' ? 'MEMBER' : 'ADMIN';
        return { ...u, role: nextRole };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('library_users', JSON.stringify(updatedUsers));
    setSuccessMsg("User role updated successfully.");
  };

  // Revoke/Delete user account
  const handleRevokeUser = (email) => {
    setErrorMsg('');
    setSuccessMsg('');

    if (currentUser.email.toLowerCase() === email.toLowerCase()) {
      setErrorMsg("Security constraint: You cannot delete your own active administrator account.");
      return;
    }

    if (window.confirm(`Are you sure you want to revoke library access for ${email}?`)) {
      const filtered = users.filter((u) => u.email.toLowerCase() !== email.toLowerCase());
      setUsers(filtered);
      localStorage.setItem('library_users', JSON.stringify(filtered));
      setSuccessMsg("User account deleted successfully.");
    }
  };

  // Manually Add Admin
  const handleAddAdmin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const emailExists = users.some((u) => u.email.toLowerCase() === newAdmin.email.toLowerCase());
    if (emailExists) {
      setErrorMsg("A user with this email address already exists.");
      return;
    }

    const adminUser = {
      ...newAdmin,
      role: 'ADMIN' // Forces admin role
    };

    const updatedUsers = [...users, adminUser];
    setUsers(updatedUsers);
    localStorage.setItem('library_users', JSON.stringify(updatedUsers));
    setSuccessMsg(`Admin account created for ${newAdmin.firstName} ${newAdmin.lastName}.`);

    // Reset Add Admin form
    setNewAdmin({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      faculty: 'science',
      department: 'Computer Science',
      level: '100L',
      campus: 'Ojo'
    });
  };

  // Upload Book action
  const handleUploadBook = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Field Validations based on Book Type
    if (newBook.type === 'academic') {
      if (!newBook.faculty || !newBook.department || !newBook.level || !newBook.code) {
        setErrorMsg("Please fill out all academic fields (Faculty, Department, Level, Code).");
        return;
      }
    }

    // Determine Simulated File URL
    let fileUrlSim = newBook.fileUrl;
    let fileNameSim = newBook.fileName;
    if (uploadSource === 'local') {
      if (!newBook.fileName) {
        setErrorMsg("Please enter a simulated filename or select a local file placeholder.");
        return;
      }
      fileUrlSim = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // simulation file
    } else {
      if (!newBook.fileUrl.startsWith('http')) {
        setErrorMsg("Please enter a valid Google Drive URL starting with http:// or https://");
        return;
      }
      fileNameSim = newBook.fileName || `${newBook.title.replace(/\s+/g, '_').toLowerCase()}.pdf`;
    }

    // Determine Cover Image
    let coverImg = newBook.customCoverUrl;
    if (!coverImg) {
      // Assign an elegant default Unsplash cover based on type
      if (newBook.type === 'academic') {
        coverImg = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60';
      } else {
        coverImg = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60';
      }
    }

    // Assemble book object
    const createdBook = {
      id: `${newBook.type === 'academic' ? 'acad' : 'self'}-${Date.now()}`,
      type: newBook.type,
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      cover: coverImg,
      fileUrl: fileUrlSim,
      fileName: fileNameSim,
      fileType: 'pdf',
      downloadCount: 0,
      ...(newBook.type === 'academic'
        ? {
          faculty: newBook.faculty,
          department: newBook.department,
          level: newBook.level,
          code: newBook.code.toUpperCase()
        }
        : {
          category: newBook.category
        })
    };

    const updatedBooks = [createdBook, ...books];
    setBooks(updatedBooks);
    localStorage.setItem('library_books', JSON.stringify(updatedBooks));
    setSuccessMsg(`Book "${newBook.title}" successfully added to the catalog.`);

    // Reset Book Form
    setNewBook({
      title: '',
      author: '',
      description: '',
      type: 'academic',
      faculty: '',
      department: '',
      level: '',
      code: '',
      category: 'Faith',
      fileUrl: '',
      fileName: '',
      customCoverUrl: ''
    });
  };

  // Delete Book
  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this book from the library catalog?")) {
      const filtered = books.filter((b) => b.id !== id);
      setBooks(filtered);
      localStorage.setItem('library_books', JSON.stringify(filtered));
      setSuccessMsg("Book deleted from library database.");
    }
  };

  // --- FILTERS ---
  const filteredUsers = users.filter((u) => {
    const term = userSearch.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.department.toLowerCase().includes(term)
    );
  });

  const filteredBooks = books.filter((b) => {
    const term = bookSearch.toLowerCase();
    return (
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      (b.code && b.code.toLowerCase().includes(term))
    );
  });

  if (!currentUser) return null;

  return (
    <div className="min-vh-100 bg-light">
      {/* Top Navbar header */}
      <header className="navbar navbar-expand bg-white border-bottom px-4 py-3 sticky-top shadow-sm justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow">
            <Shield size={20} />
          </div>
          <div>
            <h5 className="mb-0 fw-bold fs-6 tracking-wide text-primary serif-font">DLCF Administrative Hub</h5>
            <span className="text-muted small fw-medium" style={{ fontSize: '0.7rem' }}>E-LIBRARY MANAGER</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary btn-sm px-3.5 py-2 rounded-3 d-flex align-items-center gap-2 fw-semibold"
            onClick={() => navigate('/library')}
          >
            <ArrowLeft size={16} /> Exit Admin
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="container py-4 px-md-5">
        {/* Navigation Tabs bar */}
        <div className="glass-panel rounded-4 p-2.5 mb-4 d-flex flex-wrap gap-3 border shadow-sm">
          <button
            className={`btn rounded-3 px-4 py-2.5 fw-semibold d-flex align-items-center gap-2 border-0 transition-all ${activeTab === 'members'
              ? 'bg-primary text-white shadow'
              : 'bg-white text-muted hover-bg-light'
              }`}
            onClick={() => setActiveTab('members')}
          >
            <Users size={18} />
            <span>Manage Admin & Members</span>
          </button>

          <button
            className={`btn rounded-3 px-4 py-2.5 fw-semibold d-flex align-items-center gap-2 border-0 transition-all ${activeTab === 'upload'
              ? 'bg-primary text-white shadow'
              : 'bg-white text-muted hover-bg-light'
              }`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={18} />
            <span>Upload Books</span>
          </button>

          <button
            className={`btn rounded-3 px-4 py-2.5 fw-semibold d-flex align-items-center gap-2 border-0 transition-all ${activeTab === 'catalog'
              ? 'bg-primary text-white shadow'
              : 'bg-white text-muted hover-bg-light'
              }`}
            onClick={() => setActiveTab('catalog')}
          >
            <BookOpen size={18} />
            <span>Book Catalog</span>
          </button>
        </div>

        {/* Global Notifications */}
        {successMsg && (
          <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success rounded-3 py-3 px-4 small mb-4 d-flex align-items-center gap-2">
            <CheckCircle size={18} className="flex-shrink-0" />
            <span className="fw-semibold">{successMsg}</span>
            <button type="button" className="btn-close ms-auto shadow-none btn-sm" onClick={() => setSuccessMsg('')}></button>
          </div>
        )}

        {errorMsg && (
          <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger rounded-3 py-3 px-4 small mb-4 d-flex align-items-center gap-2">
            <AlertTriangle size={18} className="flex-shrink-0" />
            <span className="fw-semibold">{errorMsg}</span>
            <button type="button" className="btn-close ms-auto shadow-none btn-sm" onClick={() => setErrorMsg('')}></button>
          </div>
        )}

        {/* =================================================== */}
        {/* TAB 1: MEMBERS MANAGEMENT                           */}
        {/* =================================================== */}
        {activeTab === 'members' && (
          <div className="row g-5">
            {/* Registered Users Table list */}
            <div className="col-12 col-lg-8">
              <div className="glass-panel p-4 rounded-4 border shadow-sm">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                  <h3 className="serif-font fw-bold text-primary mb-0 fs-5">Fellowship Directory</h3>

                  <div className="position-relative w-100" style={{ maxWidth: '250px' }}>
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <Search size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control-custom ps-5 py-1.5 fs-7"
                      placeholder="Search member list..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr className="small text-muted text-uppercase">
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3">Details</th>
                        <th className="py-3">Role</th>
                        <th className="py-3 text-end px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.email}>
                            <td className="py-3 px-3">
                              <div className="d-flex align-items-center gap-2">
                                <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width: '36px', height: '36px' }}>
                                  {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div>
                                  <strong className="d-block small text-primary">{user.firstName} {user.lastName}</strong>
                                  <span className="text-muted small" style={{ fontSize: '0.72rem' }}>{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="d-block small text-secondary">{user.department}</span>
                              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>{user.level} | {user.campus} Campus</span>
                            </td>
                            <td className="py-3">
                              <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-success bg-opacity-10 text-success border border-success border-opacity-10'} py-1.5 px-2 rounded-pill small`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 text-end px-3">
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  className="btn btn-sm btn-outline-secondary border-0 p-1"
                                  title={user.role === 'ADMIN' ? 'Demote to Member' : 'Promote to Admin'}
                                  onClick={() => handleToggleRole(user.email)}
                                >
                                  {user.role === 'ADMIN' ? 'Demote' : 'Make Admin'}
                                </button>
                                <button
                                  className="btn btn-sm text-danger border-0 p-1 bg-transparent hover-bg-danger hover-bg-opacity-10 rounded"
                                  onClick={() => handleRevokeUser(user.email)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted small">No registered users matched the search term.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Manually Create Admin accounts */}
            <div className="col-12 col-lg-4">
              <div className="glass-panel p-4 rounded-4 border border-danger border-opacity-10 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-3.5 text-primary-emphasis">
                  <UserPlus size={20} />
                  <h3 className="serif-font fw-bold mb-0 fs-5">Register Admin</h3>
                </div>

                <form onSubmit={handleAddAdmin}>
                  <div className="form-floating-custom">
                    <label className="form-label-custom">First Name</label>
                    <input
                      type="text"
                      required
                      className="form-control-custom py-2"
                      placeholder="e.g. Samuel"
                      value={newAdmin.firstName}
                      onChange={(e) => setNewAdmin((p) => ({ ...p, firstName: e.target.value }))}
                    />
                  </div>

                  <div className="form-floating-custom">
                    <label className="form-label-custom">Last Name</label>
                    <input
                      type="text"
                      required
                      className="form-control-custom py-2"
                      placeholder="e.g. Kumuyi"
                      value={newAdmin.lastName}
                      onChange={(e) => setNewAdmin((p) => ({ ...p, lastName: e.target.value }))}
                    />
                  </div>

                  <div className="form-floating-custom">
                    <label className="form-label-custom">Admin Email</label>
                    <input
                      type="email"
                      required
                      className="form-control-custom py-2"
                      placeholder="admin@dlcf.org"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="form-floating-custom">
                    <label className="form-label-custom">Temporary Password</label>
                    <input
                      type="password"
                      required
                      className="form-control-custom py-2"
                      placeholder="••••••••"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin((p) => ({ ...p, password: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0 fw-semibold mt-2 shadow-sm"
                  >
                    <Plus size={16} />
                    <span>Create Admin Account</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* TAB 2: UPLOAD MATERIALS                             */}
        {/* =================================================== */}
        {activeTab === 'upload' && (
          <div className="glass-panel p-4 p-md-5 rounded-4 border shadow-sm max-w-lg mx-auto">
            <div className="d-flex align-items-center gap-2 mb-4 text-primary pb-2 border-bottom">
              <Upload size={22} />
              <h3 className="serif-font fw-bold mb-0 fs-4 text-primary">Upload Library Materials</h3>
            </div>

            {/* Upload Selector Mode */}
            <div className="mb-4">
              <label className="form-label-custom">File Source Origin</label>
              <div className="row g-2">
                <div className="col-12 col-sm-6">
                  <button
                    type="button"
                    className={`btn w-100 py-2.5 fw-semibold rounded-3 border transition-all ${uploadSource === 'local'
                      ? 'btn-outline-primary active border-primary shadow-sm bg-primary bg-opacity-5'
                      : 'bg-white text-muted hover-bg-light'
                      }`}
                    onClick={() => setUploadSource('local')}
                  >
                    💻 Local File Upload
                  </button>
                </div>

                <div className="col-12 col-sm-6">
                  <button
                    type="button"
                    className={`btn w-100 py-2.5 fw-semibold rounded-3 border transition-all ${uploadSource === 'drive'
                      ? 'btn-outline-primary active border-primary shadow-sm bg-primary bg-opacity-5'
                      : 'bg-white text-muted hover-bg-light'
                      }`}
                    onClick={() => setUploadSource('drive')}
                  >
                    ☁️ Google Drive Link
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUploadBook}>
              {/* Common Fields */}
              <div className="row g-2">
                <div className="col-12 col-sm-6">
                  <div className="form-floating-custom">
                    <label className="form-label-custom">Material Title</label>
                    <input
                      type="text"
                      required
                      className="form-control-custom py-2.5"
                      placeholder="e.g. Data Structures Notes"
                      value={newBook.title}
                      onChange={(e) => setNewBook((p) => ({ ...p, title: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-floating-custom">
                    <label className="form-label-custom">Author / Lecturer</label>
                    <input
                      type="text"
                      required
                      className="form-control-custom py-2.5"
                      placeholder="e.g. John Bunyan or Dr. Benson"
                      value={newBook.author}
                      onChange={(e) => setNewBook((p) => ({ ...p, author: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="form-floating-custom">
                <label className="form-label-custom">Description & Contents Summary</label>
                <textarea
                  rows="3"
                  required
                  className="form-control-custom py-2.5"
                  placeholder="Enter a brief summary of the book, syllabus matching, chapters covered..."
                  value={newBook.description}
                  onChange={(e) => setNewBook((p) => ({ ...p, description: e.target.value }))}
                />
              </div>

              <div className="row g-2">
                <div className="col-12 col-sm-6">
                  <div className="form-floating-custom">
                    <label className="form-label-custom">Catalog Section</label>
                    <select
                      className="form-select-custom py-2.5"
                      value={newBook.type}
                      onChange={(e) => setNewBook((p) => ({ ...p, type: e.target.value }))}
                    >
                      <option value="academic">Academic Shelf</option>
                      <option value="self-development">Self Development Shelf</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  {newBook.type === 'academic' ? (
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Course Code</label>
                      <input
                        type="text"
                        required
                        className="form-control-custom py-2.5"
                        placeholder="e.g. CSC 201"
                        value={newBook.code}
                        onChange={(e) => setNewBook((p) => ({ ...p, code: e.target.value }))}
                      />
                    </div>
                  ) : (
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Category</label>
                      <select
                        className="form-select-custom py-2.5"
                        value={newBook.category}
                        onChange={(e) => setNewBook((p) => ({ ...p, category: e.target.value }))}
                      >
                        <option value="Faith">Faith & Christian Growth</option>
                        <option value="Self Development">Self Development & Leadership</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Academic Dropdowns */}
              {newBook.type === 'academic' && (
                <div className="row g-2">
                  <div className="col-12 col-sm-4">
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Faculty</label>
                      <select
                        required
                        className="form-select-custom py-2.5"
                        value={newBook.faculty}
                        onChange={(e) => setNewBook((p) => ({ ...p, faculty: e.target.value }))}
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

                  <div className="col-12 col-sm-4">
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Department</label>
                      <select
                        required
                        disabled={!newBook.faculty}
                        className="form-select-custom py-2.5"
                        value={newBook.department}
                        onChange={(e) => setNewBook((p) => ({ ...p, department: e.target.value }))}
                      >
                        <option value="" disabled>Select Faculty...</option>
                        {availableDepts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Target Level</label>
                      <select
                        required
                        className="form-select-custom py-2.5"
                        value={newBook.level}
                        onChange={(e) => setNewBook((p) => ({ ...p, level: e.target.value }))}
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
              )}

              {/* Upload source Specifics */}
              {uploadSource === 'local' ? (
                <div className="form-floating-custom">
                  <label className="form-label-custom">Simulate File Selector</label>
                  <div
                    className="border border-dashed rounded-3 p-4 text-center cursor-pointer hover-bg-light"
                    onClick={() => {
                      const fNames = ['csc201_lectures.pptx', 'mth101_formulas.docx', 'spiritual_leadership_notes.pdf', 'engineering_thermodynamics.pdf'];
                      const mockName = fNames[Math.floor(Math.random() * fNames.length)];
                      setNewBook(p => ({ ...p, fileName: mockName }));
                    }}
                  >
                    <FileText size={32} className="text-muted mx-auto mb-2" />
                    <span className="d-block small text-primary fw-semibold">Click here to simulate drag-drop file upload</span>
                    <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Supports: PDF, DOCX, PPTX</span>
                    {newBook.fileName && (
                      <div className="mt-3.5 bg-success bg-opacity-10 text-success p-2 rounded small fw-semibold">
                        ✓ Selected File: {newBook.fileName}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Google Drive Share Link</label>
                      <input
                        type="url"
                        required
                        className="form-control-custom py-2.5"
                        placeholder="https://drive.google.com/file/d/..."
                        value={newBook.fileUrl}
                        onChange={(e) => setNewBook((p) => ({ ...p, fileUrl: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-floating-custom">
                      <label className="form-label-custom">Material Filename</label>
                      <input
                        type="text"
                        className="form-control-custom py-2.5"
                        placeholder="e.g. data_struct_note.pdf"
                        value={newBook.fileName}
                        onChange={(e) => setNewBook((p) => ({ ...p, fileName: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cover Image Placeholder option */}
              <div className="form-floating-custom">
                <label className="form-label-custom">Custom Book Cover URL (Optional)</label>
                <input
                  type="url"
                  className="form-control-custom py-2.5"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newBook.customCoverUrl}
                  onChange={(e) => setNewBook((p) => ({ ...p, customCoverUrl: e.target.value }))}
                />
                <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Leave blank to auto-generate a professional default cover design.</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0 fw-semibold shadow-sm mt-3"
                style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)' }}
              >
                <Upload size={18} />
                <span>Simulate Upload & Add to Library</span>
              </button>
            </form>
          </div>
        )}

        {/* =================================================== */}
        {/* TAB 3: BOOK CATALOG                                 */}
        {/* =================================================== */}
        {activeTab === 'catalog' && (
          <div className="glass-panel p-4 rounded-4 border shadow-sm">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
              <h3 className="serif-font fw-bold text-primary mb-0 fs-5">Library Catalog Database</h3>

              <div className="position-relative w-100" style={{ maxWidth: '280px' }}>
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control-custom ps-5 py-2 fs-7"
                  placeholder="Search catalog books..."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr className="small text-muted text-uppercase">
                    <th className="py-3 px-3">Book Cover & Title</th>
                    <th className="py-3">Details</th>
                    <th className="py-3">Type / Section</th>
                    <th className="py-3 text-center">Reads</th>
                    <th className="py-3 text-end px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="py-3 px-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="rounded border"
                              style={{ width: '40px', height: '54px', objectFit: 'cover' }}
                            />
                            <div>
                              <strong className="d-block small text-primary leading-tight">{book.title}</strong>
                              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>By {book.author}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          {book.type === 'academic' ? (
                            <>
                              <span className="d-block small text-secondary">{book.code} | {book.level}</span>
                              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                                {FACULTIES.find(f => f.id === book.faculty)?.name || book.faculty}
                              </span>
                            </>
                          ) : (
                            <span className="badge bg-warning text-dark py-1.5 px-2 rounded-pill small">
                              {book.category}
                            </span>
                          )}
                        </td>
                        <td className="py-3">
                          <span className="d-block small fw-medium text-capitalize">{book.type.replace('-', ' ')}</span>
                          <span className="text-muted small" style={{ fontSize: '0.72rem' }}>{book.fileName || 'drive_link.pdf'}</span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="badge bg-light text-secondary border px-2.5 py-1 rounded small">
                            {book.downloadCount || 0}
                          </span>
                        </td>
                        <td className="py-3 text-end px-3">
                          <button
                            className="btn btn-sm text-danger border-0 p-2 bg-transparent hover-bg-danger hover-bg-opacity-10 rounded-circle"
                            title="Delete Book"
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted small">No books in the catalog matched the search term.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;