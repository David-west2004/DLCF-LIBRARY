// Mock Data for DLCF LASUojo E-Library

export const CAMPUSES = ['Ojo', 'Epe', 'Ikeja'];

export const LEVELS = ['100L', '200L', '300L', '400L', '500L', '600L'];

export const FACULTIES = [
  {
    id: 'science',
    name: 'Faculty of Science',
    departments: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Microbiology', 'Biochemistry']
  },
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    departments: ['Mechanical Engineering', 'Electronic & Computer Engineering', 'Civil Engineering', 'Chemical Engineering']
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    departments: ['Public Law', 'Private & Property Law', 'Commercial & Industrial Law', 'Jurisprudence & International Law']
  },
  {
    id: 'management',
    name: 'Faculty of Management Sciences',
    departments: ['Accounting', 'Banking & Finance', 'Business Administration', 'Public Administration']
  },
  {
    id: 'arts',
    name: 'Faculty of Arts',
    departments: ['English', 'History & International Studies', 'Theatre Arts & Music', 'Foreign Languages']
  },
  {
    id: 'social_sciences',
    name: 'Faculty of Social Sciences',
    departments: ['Economics', 'Political Science', 'Sociology', 'Mass Communication']
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    departments: ['Science Education', 'Educational Foundations', 'Language Arts Education', 'Guidance & Counseling']
  },
  {
    id: 'clinical_sciences',
    name: 'Faculty of Clinical Sciences',
    departments: ['Medicine & Surgery', 'Nursing Science', 'Physiology', 'Pharmacology']
  }
];

export const INITIAL_BOOKS = [
  // --- ACADEMICS ---
  {
    id: 'acad-1',
    type: 'academic',
    title: 'Introduction to Computer Science & Logic',
    code: 'CSC 111',
    author: 'Dr. O. J. Cole',
    faculty: 'science',
    department: 'Computer Science',
    level: '100L',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
    description: 'An overview of basic computer system architecture, programming logic, history, and applications in modern science.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'csc111_introduction.pdf',
    fileType: 'pdf',
    downloadCount: 45
  },
  {
    id: 'acad-2',
    type: 'academic',
    title: 'General Mathematics I (Algebra & Trigonometry)',
    code: 'MTH 101',
    author: 'Prof. S. A. Okunuga',
    faculty: 'science',
    department: 'Mathematics',
    level: '100L',
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60',
    description: 'Foundations of algebraic expressions, indices, logarithms, quadratic equations, progressions, complex numbers, and basic trigonometry.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'mth101_algebra.pdf',
    fileType: 'pdf',
    downloadCount: 120
  },
  {
    id: 'acad-3',
    type: 'academic',
    title: 'Data Structures and Algorithms',
    code: 'CSC 201',
    author: 'Engr. Benson Benson',
    faculty: 'science',
    department: 'Computer Science',
    level: '200L',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60',
    description: 'Fundamental data structures including arrays, linked lists, stacks, queues, trees, graphs, sorting and searching algorithms with analysis.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'csc201_dsa.pdf',
    fileType: 'pdf',
    downloadCount: 88
  },
  {
    id: 'acad-4',
    type: 'academic',
    title: 'Introduction to Legal Method I',
    code: 'PUL 111',
    author: 'Prof. Y. O. Elias',
    faculty: 'law',
    department: 'Public Law',
    level: '100L',
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60',
    description: 'Analysis of legal rules, structure of law, sources of Nigerian Law, judicial reasoning, and legal research techniques.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'pul111_legal_method.pdf',
    fileType: 'pdf',
    downloadCount: 62
  },
  {
    id: 'acad-5',
    type: 'academic',
    title: 'Principles of Financial Accounting',
    code: 'ACC 201',
    author: 'Dr. (Mrs) A. A. Adebayo',
    faculty: 'management',
    department: 'Accounting',
    level: '200L',
    cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60',
    description: 'Theory and practice of financial accounting, recording business transactions, ledger entries, trial balances, and preparation of final accounts.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'acc201_accounting.pdf',
    fileType: 'pdf',
    downloadCount: 95
  },
  {
    id: 'acad-6',
    type: 'academic',
    title: 'Engineering Drawing & Graphics',
    code: 'MEG 211',
    author: 'Dr. Engr. T. O. Awotola',
    faculty: 'engineering',
    department: 'Mechanical Engineering',
    level: '200L',
    cover: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
    description: 'Principles of engineering drawing, projections (orthographic, isometric, auxiliary), sectioning, dimensioning, and use of CAD tools.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'meg211_drawing.pdf',
    fileType: 'pdf',
    downloadCount: 71
  },
  {
    id: 'acad-7',
    type: 'academic',
    title: 'Microeconomic Theory & Principles',
    code: 'ECN 201',
    author: 'Prof. O. A. Soludo',
    faculty: 'social_sciences',
    department: 'Economics',
    level: '200L',
    cover: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60',
    description: 'Introduction to pricing mechanisms, demand and supply, consumer behavior, production functions, and market structures.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'ecn201_microeconomics.pdf',
    fileType: 'pdf',
    downloadCount: 83
  },
  {
    id: 'acad-8',
    type: 'academic',
    title: 'History of West Africa from 1500 to Present',
    code: 'HIS 301',
    author: 'Dr. G. A. Biobaku',
    faculty: 'arts',
    department: 'History & International Studies',
    level: '300L',
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&auto=format&fit=crop&q=60',
    description: 'Critical analysis of social, political, and economic developments in West Africa since the 16th century, colonization, and independence.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'his301_west_africa.pdf',
    fileType: 'pdf',
    downloadCount: 34
  },
  {
    id: 'acad-9',
    type: 'academic',
    title: 'Control Systems Engineering',
    code: 'ECE 401',
    author: 'Prof. K. A. Ogundeyi',
    faculty: 'engineering',
    department: 'Electronic & Computer Engineering',
    level: '400L',
    cover: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=500&auto=format&fit=crop&q=60',
    description: 'Mathematical modeling of physical systems, transfer functions, block diagrams, transient response analysis, and PID controller design.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'ece401_controls.pdf',
    fileType: 'pdf',
    downloadCount: 49
  },

  // --- SELF DEVELOPMENT (Faith) ---
  {
    id: 'self-1',
    type: 'self-development',
    category: 'Faith',
    title: 'The Pilgrim\'s Progress',
    author: 'John Bunyan',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    description: 'A classic Christian allegory detailing Christian\'s journey from the City of Destruction to the Celestial City, highlighting trials and triumphs.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'pilgrims_progress.pdf',
    fileType: 'pdf',
    downloadCount: 310
  },
  {
    id: 'self-2',
    type: 'self-development',
    category: 'Faith',
    title: 'In His Steps',
    author: 'Charles M. Sheldon',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
    description: 'The narrative of a group of church members who pledge for an entire year not to do anything without first asking: "What would Jesus do?".',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'in_his_steps.pdf',
    fileType: 'pdf',
    downloadCount: 245
  },
  {
    id: 'self-3',
    type: 'self-development',
    category: 'Faith',
    title: 'The Screwtape Letters',
    author: 'C. S. Lewis',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60',
    description: 'A masterpiece of satirical theology consisting of letters from a senior demon, Screwtape, to his nephew Wormwood, a junior tempter.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'screwtape_letters.pdf',
    fileType: 'pdf',
    downloadCount: 420
  },
  {
    id: 'self-4',
    type: 'self-development',
    category: 'Faith',
    title: 'The Pursuit of God',
    author: 'A. W. Tozer',
    cover: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=500&auto=format&fit=crop&q=60',
    description: 'A deep call to Christian mysticism and seeking fellowship with God, encouraging believers to pursue God above all earthly attachments.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'pursuit_of_god.pdf',
    fileType: 'pdf',
    downloadCount: 185
  },

  // --- SELF DEVELOPMENT (General Self Development) ---
  {
    id: 'self-5',
    type: 'self-development',
    category: 'Self Development',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
    description: 'A comprehensive framework for personal effectiveness based on core character principles and aligning with universal natural laws.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'seven_habits.pdf',
    fileType: 'pdf',
    downloadCount: 560
  },
  {
    id: 'self-6',
    type: 'self-development',
    category: 'Self Development',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60',
    description: 'An easy and proven way to build good habits and break bad ones, focusing on tiny 1% daily adjustments that compound into massive results.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'atomic_habits.pdf',
    fileType: 'pdf',
    downloadCount: 780
  },
  {
    id: 'self-7',
    type: 'self-development',
    category: 'Self Development',
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=60',
    description: 'Time-tested advice on how to build relationships, influence others, handle interpersonal conflict, and become an effective communicator.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'win_friends.pdf',
    fileType: 'pdf',
    downloadCount: 612
  },
  {
    id: 'self-8',
    type: 'self-development',
    category: 'Self Development',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    cover: 'https://images.unsplash.com/photo-1554907906-53b706c4495c?w=500&auto=format&fit=crop&q=60',
    description: 'A study of the principles of success gathered from interviews with the most successful individuals of the early 20th century.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'think_grow_rich.pdf',
    fileType: 'pdf',
    downloadCount: 395
  }
];

export const INITIAL_USERS = [
  {
    firstName: 'System',
    lastName: 'Admin',
    email: 'admin@dlcf.org',
    password: 'admin123',
    faculty: 'science',
    department: 'Computer Science',
    level: '400L',
    campus: 'Ojo',
    role: 'ADMIN'
  },
  {
    firstName: 'Promised',
    lastName: 'West',
    email: 'promised@dlcf.org',
    password: 'user123',
    faculty: 'science',
    department: 'Mathematics',
    level: '200L',
    campus: 'Ojo',
    role: 'MEMBER'
  }
];
