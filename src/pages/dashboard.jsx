import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, GraduationCap, BookOpen, Download, BookText, ExternalLink, Calendar, HelpCircle, Heart, FileText, ChevronRight, X, User } from 'lucide-react';
import Sidebar from '../component/sidebar';
import { INITIAL_BOOKS, FACULTIES, LEVELS } from '../data/mockData';

// Fisher-Yates shuffle algorithm for display randomization
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home'); // 'home', 'academic', 'self-development'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core books database state
  const [books, setBooks] = useState([]);
  const [shuffledAcademicBooks, setShuffledAcademicBooks] = useState([]);
  const [shuffledSelfDevBooks, setShuffledSelfDevBooks] = useState([]);

  // --- FILTERS STATE ---
  // Academics
  const [acadSearch, setAcadSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  // Self Development
  const [selfSearch, setSelfSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // 'Faith', 'Self Development'

  // --- MODAL VIEWER STATE ---
  const [selectedBook, setSelectedBook] = useState(null);
  const [viewMode, setViewMode] = useState(false); // true opens reader, false is details
  const [currentPage, setCurrentPage] = useState(1);

  // Authentication check and database sync
  useEffect(() => {
    // 1. Check Auth session
    const storedUser = localStorage.getItem('library_currentUser');
    if (!storedUser) {
      navigate('/auth/signin');
      return;
    }
    setCurrentUser(JSON.parse(storedUser));

    // 2. Fetch Books from local storage or initialize
    let storedBooks = localStorage.getItem('library_books');
    let booksList = [];
    if (!storedBooks) {
      localStorage.setItem('library_books', JSON.stringify(INITIAL_BOOKS));
      booksList = INITIAL_BOOKS;
    } else {
      booksList = JSON.parse(storedBooks);
    }
    setBooks(booksList);

    // Pre-shuffle books for initial random lists
    const acads = booksList.filter((b) => b.type === 'academic');
    const selfs = booksList.filter((b) => b.type === 'self-development');
    setShuffledAcademicBooks(shuffleArray(acads));
    setShuffledSelfDevBooks(shuffleArray(selfs));
  }, [navigate]);

  // Handle book uploaded in localstorage updating state in active session
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('library_books');
      if (stored) {
        const booksList = JSON.parse(stored);
        setBooks(booksList);
        const acads = booksList.filter((b) => b.type === 'academic');
        const selfs = booksList.filter((b) => b.type === 'self-development');
        setShuffledAcademicBooks(shuffleArray(acads));
        setShuffledSelfDevBooks(shuffleArray(selfs));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter department list dynamically based on faculty selection
  const getDepartments = () => {
    if (!selectedFaculty) return [];
    const facultyObj = FACULTIES.find((f) => f.id === selectedFaculty);
    return facultyObj ? facultyObj.departments : [];
  };

  // --- FILTER ENGINE ---
  // Academics Filtering
  const filteredAcademicBooks = shuffledAcademicBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(acadSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(acadSearch.toLowerCase()) ||
      book.code.toLowerCase().includes(acadSearch.toLowerCase());

    const matchesFaculty = selectedFaculty ? book.faculty === selectedFaculty : true;
    const matchesDept = selectedDept ? book.department === selectedDept : true;
    const matchesLevel = selectedLevel ? book.level === selectedLevel : true;

    return matchesSearch && matchesFaculty && matchesDept && matchesLevel;
  });

  // Self Development Filtering
  const filteredSelfDevBooks = shuffledSelfDevBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(selfSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(selfSearch.toLowerCase());

    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  // Simulator for Reading/Downloading books
  const handleOpenBook = (book, readNow = false) => {
    setSelectedBook(book);
    setViewMode(readNow);
    setCurrentPage(1);

    // Increment download/view counts in localstorage
    const updatedBooks = books.map((b) => {
      if (b.id === book.id) {
        return { ...b, downloadCount: (b.downloadCount || 0) + 1 };
      }
      return b;
    });
    setBooks(updatedBooks);
    localStorage.setItem('library_books', JSON.stringify(updatedBooks));
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
    setViewMode(false);
  };

  if (!currentUser) return null;

  return (
    <div className="min-vh-100 bg-light position-relative">
      {/* Sidebar Component */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={currentUser}
      />

      {/* Main Content Layout */}
      <div className="main-content-layout">
        {/* Top Header */}
        <header className="navbar bg-white border-bottom px-4 py-3 sticky-top shadow-sm justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-light d-lg-none p-2 rounded-circle"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="d-none d-sm-block">
              <span className="text-muted small fw-medium">Welcome back,</span>
              <h5 className="mb-0 fw-bold text-primary">{currentUser.firstName} {currentUser.lastName}</h5>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Quick Access Role indicator */}
            <div className="btn btn-light bg-opacity-50 text-dark border px-3 py-1.5 fs-7 rounded-pill d-flex align-items-center gap-2 fw-semibold">
              <span className={`rounded-circle d-block ${currentUser.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}`} style={{ width: '8px', height: '8px' }}></span>
              {currentUser.role === 'ADMIN' ? 'Administrator' : 'Fellowship Member'}
            </div>

            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 px-md-5">
          {/* ==================================== */}
          {/* 1. HOME SECTION                      */}
          {/* ==================================== */}
          {activeSection === 'home' && (
            <div className="fade-in">
              {/* Welcome Hero Panel */}
              <div
                className="rounded-4 p-4 p-md-5 text-white mb-5 shadow-lg position-relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)'
                }}
              >
                {/* Logo placed exactly inside the white circular space */}
                <div className="hero-logo-circle">
                  <img src="/logo.png" alt="DLCF Logo" />
                </div>
                
                {/* Visual geometric blobs for premium aesthetics */}
                <div className="position-absolute bg-warning bg-opacity-10 rounded-circle" style={{ width: '200px', height: '200px', right: '150px', bottom: '-80px' }} />

                <div className="row align-items-center position-relative z-1 g-4">
                  {/* Left Column: Text & Search */}
                  <div className="col-12 col-md-8 col-lg-7 d-flex flex-column justify-content-between hero-text-container" style={{ minHeight: '220px' }}>
                    <div>
                      <span className="badge bg-warning bg-opacity-20 text-warning px-3 py-2 rounded-pill fs-7 mb-3 border border-warning border-opacity-35 fw-semibold tracking-wide">
                        † DEEPER LIFE CAMPUS FELLOWSHIP
                      </span>
                      <h1 className="serif-font mb-3 hero-title">DLCF LASUojo E-Library</h1>
                      <p className="mb-4 hero-lead">
                        Providing our students with premium academic materials and spiritual literature to excel in their academic pursuits and build a vibrant Christian faith.
                      </p>
                    </div>

                    <div className="input-group glass-panel rounded-pill p-1 border shadow-sm" style={{ background: 'rgba(255, 255, 255, 0.15)', maxWidth: '480px' }}>
                      <span className="input-group-text bg-transparent border-0 text-white-50 ps-3">
                        <Search size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control bg-transparent border-0 text-white placeholder-white-50 shadow-none ps-2"
                        placeholder="Search books, authors, or course codes..."
                        onClick={() => {
                          setActiveSection('academic');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Row */}
              <div className="row g-4 mb-5">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper bg-primary bg-opacity-10 text-primary">
                      <BookText size={24} />
                    </div>
                    <div>
                      <span className="text-muted small fw-medium">Total Catalog</span>
                      <h4 className="mb-0 fw-bold">{books.length} Books</h4>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper bg-success bg-opacity-10 text-success">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <span className="text-muted small fw-medium">Academic Papers</span>
                      <h4 className="mb-0 fw-bold">{books.filter((b) => b.type === 'academic').length} Files</h4>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper bg-warning bg-opacity-10 text-warning">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <span className="text-muted small fw-medium">Self Development</span>
                      <h4 className="mb-0 fw-bold">{books.filter((b) => b.type === 'self-development').length} Volumes</h4>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper bg-info bg-opacity-10 text-info">
                      <Download size={24} />
                    </div>
                    <div>
                      <span className="text-muted small fw-medium">System Reads</span>
                      <h4 className="mb-0 fw-bold">
                        {books.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0)} Reads
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-5 mb-4">
                {/* Quick Shelf Selectors */}
                <div className="col-12 col-lg-8">
                  <h3 className="serif-font fw-bold mb-4 text-primary fs-4 border-bottom pb-2.5">Explore Library Shelves</h3>
                  <div className="row g-4">
                    <div className="col-12 col-sm-6">
                      <div className="quick-shelf-tile" onClick={() => setActiveSection('academic')}>
                        <div className="quick-shelf-icon">
                          <GraduationCap size={24} />
                        </div>
                        <h4 className="fw-bold mb-2">Academics Section</h4>
                        <p className="text-muted small mb-3">
                          Browse university textbooks, class slide presentations, exam past questions, and project templates filtered by faculties and departments.
                        </p>
                        <span className="text-primary fw-semibold small d-flex align-items-center gap-1 mt-auto">
                          Enter Shelf <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="quick-shelf-tile" onClick={() => setActiveSection('self-development')}>
                        <div className="quick-shelf-icon">
                          <BookOpen size={24} />
                        </div>
                        <h4 className="fw-bold mb-2">Self Development</h4>
                        <p className="text-muted small mb-3">
                          Nurture your spiritual growth and personal expansion with books dedicated to Christian faith, relationships, leadership development, and financial stewardship.
                        </p>
                        <span className="text-primary fw-semibold small d-flex align-items-center gap-1 mt-auto">
                          Enter Shelf <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fellowship Announcement Board */}
                <div className="col-12 col-lg-4">
                  <div className="glass-panel p-4 rounded-4 border-primary border-opacity-10 shadow-md">
                    <div className="d-flex align-items-center gap-2 mb-3.5 text-primary">
                      <Calendar size={18} />
                      <h4 className="fw-bold mb-0 fs-5 serif-font">Fellowship Board</h4>
                    </div>

                    <div className="mb-4">
                      <span className="text-uppercase tracking-wider text-muted small fw-bold d-block mb-1.5" style={{ fontSize: '0.65rem' }}>
                        Weekly Theme
                      </span>
                      <p className="fw-semibold text-dark bg-primary bg-opacity-5 p-3 rounded-3 mb-0">
                        "Uncompromising Excellence: Standing Out Academically and Spiritually."
                      </p>
                    </div>

                    <div className="mb-4">
                      <span className="text-uppercase tracking-wider text-muted small fw-bold d-block mb-1.5" style={{ fontSize: '0.65rem' }}>
                        Fellowship Services
                      </span>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                        <li className="d-flex align-items-start gap-2 small">
                          <span className="badge bg-primary mt-0.5">SUN</span>
                          <div>
                            <strong className="d-block text-primary">Worship Devotional Service</strong>
                            <span className="text-muted">7:45 AM | Faculty of law</span>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-2 small">
                          <span className="badge bg-warning text-dark mt-0.5">MON</span>
                          <div>
                            <strong className="d-block text-primary">Bible Study</strong>
                            <span className="text-muted">6:00 PM | Chapel of light auditorium</span>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-2 small">
                          <span className="badge bg-primary text-dark mt-0.5">THURS</span>
                          <div>
                            <strong className="d-block text-primary">Thursday Revival Hour</strong>
                            <span className="text-muted">6:00 PM | Chapel of light auditorium</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3.5 border-top text-center text-muted italic-text small">
                      <p className="mb-0 fst-italic">"Study to show thyself approved unto God..." <br /><strong>- 2 Timothy 2:15</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* 2. ACADEMICS SECTION                 */}
          {/* ==================================== */}
          {activeSection === 'academic' && (
            <div className="fade-in">
              {/* Section Header */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4.5">
                <div>
                  <h2 className="serif-font fw-bold text-primary mb-1">Academics Shelf</h2>
                  <p className="text-muted small mb-0">Browse and download standard LASU course resources</p>
                </div>
                <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold border border-primary border-opacity-10">
                  {filteredAcademicBooks.length} Materials Found
                </div>
              </div>

              {/* Filters Panel */}
              <div className="glass-panel p-4 rounded-4 mb-5 border shadow-sm">
                <div className="row g-3">
                  {/* Search Bar */}
                  <div className="col-12 col-md-3">
                    <label className="form-label-custom">Search catalog</label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                        <Search size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control-custom ps-5 py-2"
                        placeholder="Search title, author, code..."
                        value={acadSearch}
                        onChange={(e) => setAcadSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Faculty Filter */}
                  <div className="col-12 col-sm-4 col-md-3">
                    <label className="form-label-custom">Faculty</label>
                    <select
                      className="form-select-custom py-2"
                      value={selectedFaculty}
                      onChange={(e) => {
                        setSelectedFaculty(e.target.value);
                        setSelectedDept(''); // reset department
                      }}
                    >
                      <option value="">All Faculties</option>
                      {FACULTIES.map((fac) => (
                        <option key={fac.id} value={fac.id}>
                          {fac.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Department Filter */}
                  <div className="col-12 col-sm-4 col-md-3">
                    <label className="form-label-custom">Department</label>
                    <select
                      className="form-select-custom py-2"
                      disabled={!selectedFaculty}
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                    >
                      <option value="">All Departments</option>
                      {getDepartments().map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div className="col-12 col-sm-4 col-md-3">
                    <label className="form-label-custom">Academic Level</label>
                    <select
                      className="form-select-custom py-2"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      <option value="">All Levels (100L-600L)</option>
                      {LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reset Filters Option */}
                {(selectedFaculty || selectedDept || selectedLevel || acadSearch) && (
                  <div className="mt-3.5 d-flex justify-content-end">
                    <button
                      className="btn btn-link btn-sm text-primary fw-semibold p-0 text-decoration-none"
                      onClick={() => {
                        setSelectedFaculty('');
                        setSelectedDept('');
                        setSelectedLevel('');
                        setAcadSearch('');
                      }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Books Grid */}
              {filteredAcademicBooks.length > 0 ? (
                <div className="books-grid">
                  {filteredAcademicBooks.map((book) => (
                    <div key={book.id} className="book-card">
                      <div className="book-cover-container">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <span className="book-badge">{book.level}</span>
                      </div>
                      <div className="book-info">
                        <span className="text-accent small fw-bold tracking-wider mb-1 text-uppercase">
                          {book.code}
                        </span>
                        <h4 className="book-title" title={book.title}>{book.title}</h4>
                        <p className="book-author">By {book.author}</p>

                        <div className="small text-muted mb-3 text-truncate">
                          {FACULTIES.find(f => f.id === book.faculty)?.name}
                        </div>

                        <div className="book-meta">
                          <button
                            className="btn btn-sm btn-outline-primary border-0 p-1 d-flex align-items-center gap-1.5 fw-semibold"
                            onClick={() => handleOpenBook(book, true)}
                          >
                            <BookText size={16} /> Read
                          </button>

                          <button
                            className="btn btn-sm btn-outline-primary border-0 p-1 d-flex align-items-center gap-1.5 fw-semibold"
                            onClick={() => handleOpenBook(book, false)}
                          >
                            <ExternalLink size={16} /> View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 glass-panel rounded-4">
                  <HelpCircle size={48} className="text-muted mb-3" />
                  <h4 className="fw-bold text-secondary">No Academic Materials Found</h4>
                  <p className="text-muted small">Try refining your search text or adjustment of dropdown filters.</p>
                </div>
              )}
            </div>
          )}

          {/* ==================================== */}
          {/* 3. SELF DEVELOPMENT SECTION          */}
          {/* ==================================== */}
          {activeSection === 'self-development' && (
            <div className="fade-in">
              {/* Section Header */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4.5">
                <div>
                  <h2 className="serif-font fw-bold text-primary mb-1">Self Development Shelf</h2>
                  <p className="text-muted small mb-0">Build your spiritual depth, leadership maturity, and skills</p>
                </div>
                <div className="badge bg-primary bg-opacity-10 text-accent px-3 py-2 rounded-pill fw-semibold border border-primary border-opacity-10">
                  {filteredSelfDevBooks.length} Volumes Listed
                </div>
              </div>

              {/* Filters Panel */}
              <div className="glass-panel p-4 rounded-4 mb-5 border shadow-sm">
                <div className="row g-3 align-items-end">
                  {/* Search Bar */}
                  <div className="col-12 col-md-5 col-lg-6">
                    <label className="form-label-custom">Search shelf</label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                        <Search size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control-custom ps-5 py-2"
                        placeholder="Search books or authors..."
                        value={selfSearch}
                        onChange={(e) => setSelfSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Category Pill Filters */}
                  <div className="col-12 col-md-7 col-lg-6">
                    <label className="form-label-custom mb-2">Category Selector</label>
                    <div className="d-flex gap-2">
                      <button
                        className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold border transition-all ${!selectedCategory
                          ? 'btn-accent-custom border-0 shadow-sm'
                          : 'bg-white text-muted hover-bg-light'
                          }`}
                        onClick={() => setSelectedCategory('')}
                      >
                        All Categories
                      </button>
                      <button
                        className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold border transition-all ${selectedCategory === 'Faith'
                          ? 'btn-accent-custom border-0 shadow-sm'
                          : 'bg-white text-muted hover-bg-light'
                          }`}
                        onClick={() => setSelectedCategory('Faith')}
                      >
                        Faith & Christian Growth
                      </button>
                      <button
                        className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold border transition-all ${selectedCategory === 'Self Development'
                          ? 'btn-accent-custom border-0 shadow-sm'
                          : 'bg-white text-muted hover-bg-light'
                          }`}
                        onClick={() => setSelectedCategory('Self Development')}
                      >
                        Leadership & Skills
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Books Grid */}
              {filteredSelfDevBooks.length > 0 ? (
                <div className="books-grid">
                  {filteredSelfDevBooks.map((book) => (
                    <div key={book.id} className="book-card">
                      <div className="book-cover-container">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <span className="book-badge-accent">{book.category}</span>
                      </div>
                      <div className="book-info">
                        <h4 className="book-title mt-1" title={book.title}>{book.title}</h4>
                        <p className="book-author">By {book.author}</p>

                        <p className="text-muted small text-truncate-2 mb-3" style={{ height: '3em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.78rem' }}>
                          {book.description}
                        </p>

                        <div className="book-meta mt-auto">
                          <button
                            className="btn btn-sm btn-outline-primary border-0 p-1 d-flex align-items-center gap-1.5 fw-semibold"
                            onClick={() => handleOpenBook(book, true)}
                          >
                            <BookText size={16} /> Read Book
                          </button>

                          <button
                            className="btn btn-sm btn-outline-primary border-0 p-1 d-flex align-items-center gap-1.5 fw-semibold"
                            onClick={() => handleOpenBook(book, false)}
                          >
                            <ExternalLink size={16} /> Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 glass-panel rounded-4">
                  <HelpCircle size={48} className="text-muted mb-3" />
                  <h4 className="fw-bold text-secondary">No Spiritual Books Found</h4>
                  <p className="text-muted small">Try refining your filter settings.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ==================================== */}
      {/* 4. MODAL BOOK VIEWER & DETAILS       */}
      {/* ==================================== */}
      {selectedBook && (
        <div className="custom-modal-overlay" onClick={handleCloseBook}>
          <div className="custom-modal shadow-lg" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-4 border-bottom bg-primary text-white d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-white bg-opacity-25 p-2 rounded-3 text-white">
                  <BookText size={20} />
                </div>
                <div>
                  <span className="small text-white-50 text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.65rem' }}>
                    {selectedBook.type === 'academic' ? `${selectedBook.code} | Academics` : `${selectedBook.category} | Self Growth`}
                  </span>
                  <h4 className="mb-0 fs-5 fw-bold text-truncate text-white" style={{ maxWidth: '380px' }}>{selectedBook.title}</h4>
                </div>
              </div>
              <button className="btn btn-light bg-opacity-10 hover-bg-opacity-20 text-white p-1.5 rounded-circle border-0" onClick={handleCloseBook}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {!viewMode ? (
              // View Details Mode
              <div className="p-4">
                <div className="row g-4 align-items-center">
                  <div className="col-12 col-sm-4 text-center">
                    <img
                      src={selectedBook.cover}
                      alt={selectedBook.title}
                      className="img-fluid rounded shadow-md border"
                      style={{ maxHeight: '180px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-12 col-sm-8">
                    <h5 className="fw-bold text-primary mb-1">{selectedBook.title}</h5>
                    <p className="text-muted mb-3">Written by <strong>{selectedBook.author}</strong></p>

                    {selectedBook.type === 'academic' && (
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10 px-2.5 py-1.5 rounded-pill small">
                          Level: {selectedBook.level}
                        </span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10 px-2.5 py-1.5 rounded-pill small">
                          Faculty: {FACULTIES.find(f => f.id === selectedBook.faculty)?.name || selectedBook.faculty}
                        </span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10 px-2.5 py-1.5 rounded-pill small text-truncate" style={{ maxWidth: '200px' }}>
                          Dept: {selectedBook.department}
                        </span>
                      </div>
                    )}

                    <h6 className="fw-semibold text-primary small mb-1.5">Description / Course Outline:</h6>
                    <p className="text-muted small mb-0 leading-relaxed">
                      {selectedBook.description || 'No summary available. This resource covers core chapters aligning with the Lagos State University curriculum requirements.'}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top">
                  <a
                    href={selectedBook.fileUrl || '#'}
                    download={selectedBook.fileName || 'document.pdf'}
                    className="btn btn-light border d-flex align-items-center gap-2 px-3.5 py-2 rounded-3 text-secondary hover-bg-light shadow-sm"
                    onClick={() => alert(`Simulating file download: ${selectedBook.fileName || 'Material Document'}`)}
                  >
                    <Download size={16} />
                    <span>Download File</span>
                  </a>

                  <button
                    className="btn-primary-custom d-flex align-items-center gap-2 border-0"
                    onClick={() => setViewMode(true)}
                  >
                    <BookText size={16} />
                    <span>Read in Browser</span>
                  </button>
                </div>
              </div>
            ) : (
              // Browser Reader Simulation Mode
              <div className="p-4 bg-light">
                <div className="glass-panel p-4 rounded-4 shadow-sm border bg-white mb-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                  {/* Mock Page Content based on Book */}
                  <div className="w-100 text-secondary leading-relaxed small" style={{ maxWidth: '480px' }}>
                    {currentPage === 1 && (
                      <div className="text-center py-4 fade-in">
                        <span className="text-muted text-uppercase tracking-widest fw-bold d-block mb-2" style={{ fontSize: '0.65rem' }}>Title Page</span>
                        <h2 className="serif-font fw-bold text-primary mb-3 mt-2">{selectedBook.title}</h2>
                        <hr className="w-25 mx-auto" />
                        <p className="mt-3">Course material compilation</p>
                        <p className="text-muted mt-5 small">Presented for Fellowship Members of DLCF LASUojo</p>
                        <p className="mt-2 text-primary font-semibold">Section I: Course Objectives & Syllabus</p>
                      </div>
                    )}

                    {currentPage === 2 && (
                      <div className="fade-in">
                        <h5 className="fw-bold text-primary mb-3">Chapter 1: Foundations & Prerequisites</h5>
                        <p className="mb-3">
                          To establish a strong foundation, we must first analyze the fundamental principles. Let us construct a model mapping our core hypotheses, factoring in the historical development of the disciplines.
                        </p>
                        <p className="mb-3">
                          For standard evaluations under the Lagos State University curriculum, coursework modules demand that students understand:
                        </p>
                        <ul className="ps-3 mb-0 d-flex flex-column gap-1.5">
                          <li>Definition of core taxonomy.</li>
                          <li>System modeling and boundary identification.</li>
                          <li>Application of methodologies in real-world scenarios.</li>
                        </ul>
                      </div>
                    )}

                    {currentPage === 3 && (
                      <div className="fade-in">
                        <h5 className="fw-bold text-primary mb-3">Chapter 2: Core Practical Executions</h5>
                        <p className="mb-3">
                          Now that the basics are established, we turn our attention to the mechanical application of these equations and models in laboratory and industry environments.
                        </p>
                        <p className="mb-3">
                          Let us review the standard reference tables, factoring in safety thresholds and optimization metrics. When executing calculations, ensure rounding conforms to strict mathematical constants.
                        </p>
                        <div className="bg-light border p-3.5 rounded-3 mb-2 small text-center text-primary font-monospace">
                          f'(x) = dy/dx = lim (Δx → 0) [f(x + Δx) - f(x)] / Δx
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reader Controls */}
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm rounded-3 py-1.5 px-3"
                      onClick={() => setViewMode(false)}
                    >
                      Back to details
                    </button>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-light border btn-sm p-1.5 rounded-circle"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((c) => c - 1)}
                    >
                      ◀
                    </button>
                    <span className="small text-muted fw-semibold">Page {currentPage} of 3</span>
                    <button
                      className="btn btn-light border btn-sm p-1.5 rounded-circle"
                      disabled={currentPage === 3}
                      onClick={() => setCurrentPage((c) => c + 1)}
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;