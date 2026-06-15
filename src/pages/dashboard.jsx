import { useState } from 'react';
import Sidebar from '../component/sidebar'; 
import { Menu, Search, GraduationCap, BookOpen, Download } from 'lucide-react';

// Accept onOpenAdmin as a prop passed from App.jsx
function LandingPage({ onOpenAdmin }) {
  // --- LAYOUT & NAVIGATION STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('novels'); // 'academic' or 'novels'

  // --- FILTER STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // --- DATASTORE (Academic Books & Novels) ---
  const [books] = useState([
    // Academic Books
    {
      id: 1,
      type: 'academic',
      code: "CSC 201",
      title: "Data Structures and Algorithms",
      faculty: "science",
      department: "Computer Science",
      level: "200L",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500"
    },
    {
      id: 2,
      type: 'academic',
      code: "MTH 101",
      title: "General Mathematics I",
      faculty: "science",
      department: "Mathematics",
      level: "100L",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500"
    },
    // Christian Novels
    {
      id: 101,
      type: 'novels',
      badge: "NOVEL",
      title: "The Pilgrim's Progress",
      author: "John Bunyan",
      tag: "Christian Literature",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"
    },
    {
      id: 102,
      type: 'novels',
      badge: "NOVEL",
      title: "In His Steps",
      author: "Charles Sheldon",
      tag: "Christian Literature",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500"
    },
    {
      id: 103,
      type: 'novels',
      badge: "NOVEL",
      title: "The Screwtape Letters",
      author: "C.S. Lewis",
      tag: "Christian Literature",
      image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500"
    }
  ]);

  // --- FACULTY DATA ---
  const facultyData = {
    science: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    law: ['Public Law', 'Private Law', 'International Law'],
    engineering: ['Mechanical Engineering', 'Civil Engineering', 'Electronics Engineering'],
  };
  const departments = selectedFaculty ? facultyData[selectedFaculty] : [];

  // --- FILTER ENGINE ---
  const filteredItems = books.filter((item) => {
    if (item.type !== activeSection) return false;

    const matchesSearch = 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeSection === 'academic') {
      const matchesFaculty = selectedFaculty ? item.faculty === selectedFaculty : true;
      const matchesDepartment = selectedDepartment ? item.department === selectedDepartment : true;
      const matchesLevel = selectedLevel === 'All' ? true : item.level === selectedLevel;
      return matchesFaculty && matchesDepartment && matchesLevel;
    }

    return true;
  });

  return (
    <div className="vh-100 d-flex flex-column bg-light position-relative overflow-hidden">
      
      {/* 1. SIDEBAR DRAWER OVERLAY */}
      {isSidebarOpen && (
        <>
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
            style={{ zIndex: 1040, backdropFilter: 'blur(8px)' }}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="position-absolute top-0 start-0 h-100 bg-white shadow-lg" style={{ zIndex: 1050, width: '260px' }}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* 2. TOP HEADER NAVBAR */}
      <header className="navbar navbar-expand bg-white border-bottom px-4 justify-content-between align-items-center" style={{ height: '70px', zIndex: 10 }}>
        <div className="d-flex align-items-center gap-4">
          <button className="btn btn-light d-flex align-items-center justify-content-center p-2 rounded-circle" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} className="text-dark" />
          </button>
          <div className="d-flex align-items-center gap-2 me-2">
            <span className="fs-4">📋</span>
            <span className="fw-bold fs-5 text-primary">DLCF E-Library</span>
          </div>

          {/* Top Section Switcher Tabs */}
          <div className="bg-light p-1 rounded-pill d-none d-md-flex align-items-center gap-1">
            <button 
              className={`btn rounded-pill px-4 py-1.5 fw-semibold border-0 btn-sm text-nowrap transition-all ${activeSection === 'academic' ? 'bg-white shadow-sm text-dark' : 'text-secondary'}`}
              onClick={() => setActiveSection('academic')}
            >
              Academic Section
            </button>
            <button 
              className={`btn rounded-pill px-4 py-1.5 fw-semibold border-0 btn-sm text-nowrap transition-all ${activeSection === 'novels' ? 'bg-white shadow-sm text-success' : 'text-secondary'}`}
              onClick={() => setActiveSection('novels')}
            >
              Christian Novels
            </button>
          </div>
        </div>

        {/* User / Action Area */}
        <div className="d-flex align-items-center gap-3">
          {/* FIXED: The link now shows "Admin Panel" and runs onOpenAdmin when clicked */}
         {/* FIXED: Directly execute the onOpenAdmin function when clicked */}
           <button 
              className="btn btn-link text-secondary text-decoration-none fw-semibold border-0 d-none d-lg-block btn-sm"
              onClick={onOpenAdmin}
            >
                Admin Panel
           </button>
          <div className="btn btn-light bg-opacity-50 text-dark border px-3 py-1.5 fs-7 rounded-pill d-flex align-items-center gap-2 fw-semibold">
            <span className="bg-success rounded-circle d-block" style={{ width: '8px', height: '8px' }}></span>
            System Admin (Demo)
          </div>
        </div>
      </header>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <div className="d-flex flex-grow-1 w-100 overflow-hidden">
        <main className="container-fluid p-4 px-md-5 overflow-auto">
          <div className="row g-4">
            
            {/* LEFT COLUMN: Contextual Filtering Options */}
            <aside className="col-12 col-md-4 col-lg-3 d-flex flex-column gap-4 pe-md-4">
              {/* Universal Search Input */}
              <div>
                <span className="small fw-bold text-primary text-uppercase tracking-wider d-block mb-2 style-label fs-7">Search</span>
                <div className="input-group border rounded-3 bg-white px-3 py-2 align-items-center shadow-sm">
                  <Search size={16} className="text-muted me-2" />
                  <input 
                    type="text" 
                    className="form-control border-0 p-0 shadow-none bg-transparent small" 
                    placeholder="Title, author, code..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Sidebar Active Section Indicator Display */}
              <div>
                <span className="small fw-bold text-primary text-uppercase tracking-wider d-block mb-2 style-label fs-7">Current Section</span>
                <div className={`d-flex align-items-center gap-2 p-2.5 px-3 rounded-3 fw-bold ${activeSection === 'academic' ? 'text-primary bg-primary bg-opacity-10' : 'text-success bg-success bg-opacity-10'}`}>
                  {activeSection === 'academic' ? <GraduationCap size={18} /> : <BookOpen size={18} />}
                  <span className="text-capitalize">{activeSection === 'academic' ? 'Academic' : 'Christian Novel'}</span>
                </div>
              </div>

              {/* Render Faculty / Department filters ONLY if Academic is Active */}
              {activeSection === 'academic' && (
                <>
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <span className="small fw-bold text-secondary text-uppercase tracking-wider d-block mb-2 fs-7">Faculty</span>
                      <select className="form-select border rounded-3 py-2 text-dark shadow-sm fw-semibold" value={selectedFaculty} onChange={(e) => { setSelectedFaculty(e.target.value); setSelectedDepartment(''); }}>
                        <option value="">Select Faculty</option>
                        <option value="science">Science</option>
                        <option value="law">Law</option>
                        <option value="engineering">Engineering</option>
                      </select>
                    </div>

                    <div>
                      <span className="small fw-bold text-secondary text-uppercase tracking-wider d-block mb-2 fs-7">Departments</span>
                      <select className="form-select border rounded-3 py-2 text-dark shadow-sm fw-semibold" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} disabled={!selectedFaculty}>
                        <option value="">{selectedFaculty ? 'All Departments' : 'Select a Faculty first'}</option>
                        {departments.map((dept, idx) => <option key={idx} value={dept}>{dept}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="small fw-bold text-secondary text-uppercase tracking-wider d-block mb-2 fs-7">Level</span>
                    <div className="row row-cols-2 g-2">
                      {['All', '100L', '200L', '300L', '400L', '500L'].map((lvl) => (
                        <div className={lvl === 'All' ? "col-12" : "col"} key={lvl}>
                          <button className={`btn w-100 py-1.5 fw-semibold rounded-3 text-sm ${selectedLevel === lvl ? 'btn-primary text-white' : 'btn-outline-secondary bg-white border-light-subtle text-dark'}`} onClick={() => setSelectedLevel(lvl)}>
                            {lvl}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </aside>

            {/* RIGHT COLUMN: The Adaptive Book Display Grid */}
            <section className="col-12 col-md-8 col-lg-9">
              <h2 className="fs-4 fw-bold text-dark mb-4 align-items-center d-flex gap-2">
                {activeSection === 'academic' ? 'Academic Materials' : 'Christian Novel'}{' '}
                <span className="text-muted fs-6 fw-normal">({filteredItems.length} items)</span>
              </h2>

              {filteredItems.length === 0 ? (
                <div className="text-center py-5 border bg-white rounded-4 shadow-sm">
                  <span className="fs-2 mb-2 d-block">📭</span>
                  <h6 className="fw-bold text-secondary mb-1">No matches found</h6>
                  <p className="text-muted small mb-0">Try clearing out your search input or changing tabs.</p>
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="col">
                      
                      {/* LAYOUT A: CHRISTIAN NOVELS STYLE */}
                      {activeSection === 'novels' ? (
                        <div className="card h-100 border-0 shadow-sm overflow-hidden group position-relative bg-white rounded-4 flex-column">
                          <div className="position-relative overflow-hidden w-100 card-img-wrapper" style={{ height: '280px' }}>
                            <span className="position-absolute top-0 start-0 badge bg-warning m-3 text-uppercase font-monospace text-dark fw-bold px-2.5 py-1" style={{ zIndex: 5, fontSize: '0.65rem' }}>
                              {item.badge}
                            </span>
                            <img src={item.image} alt={item.title} className="w-100 h-100 object-cover" />
                            
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40 d-flex align-items-end p-3 transition-opacity">
                              <button className="btn btn-white w-100 bg-white text-dark border-0 fw-bold rounded-3 py-2 shadow d-flex align-items-center justify-content-center gap-2 text-sm hover-scale">
                                <Download size={16} className="text-success" /> Download PDF
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-white d-flex flex-column flex-grow-1 justify-content-between">
                            <div>
                              <h3 className="fs-6 fw-bold text-dark mb-1 line-clamp-1">{item.title}</h3>
                              <p className="text-muted small mb-3 fw-medium">{item.author}</p>
                            </div>
                            <div className="d-flex align-items-center gap-1.5 text-muted small mt-auto border-top pt-2">
                              <span>📖</span> <span style={{ fontSize: '0.75rem' }}>{item.tag}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        
                        /* LAYOUT B: ACADEMIC ITEMS STYLE */
                        <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                          <img src={item.image} alt={item.title} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                          <div className="card-body d-flex flex-column justify-content-between p-3">
                            <div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge bg-primary bg-opacity-10 text-primary fw-bold text-xs">{item.code}</span>
                                <span className="badge bg-secondary text-white small text-xs">{item.level}</span>
                              </div>
                              <h3 className="fs-6 fw-bold text-dark mb-1 line-clamp-2">{item.title}</h3>
                              <p className="text-muted small mb-0">{item.department}</p>
                            </div>
                            <button className="btn btn-outline-primary btn-sm w-100 py-2 fw-semibold rounded-3 mt-3">
                              View Learning Material
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;