# DLCF LASUojo E-Library System

Welcome to the frontend of the **Deeper Life Campus Fellowship (DLCF), Lagos State University, Ojo (LASUojo) E-Library**. This application is built as a highly aesthetic, responsive React Single Page Application (SPA) utilizing Vite, Bootstrap 5 (for utility grids), and custom Vanilla CSS (for layout structures, glassmorphism, sliders, custom panels, and typography).

## Key Features

### 1. Eye-Catching Authentication Portal
*   **Dynamic Background Slideshow**: Features cross-fading, high-quality university and library backgrounds changing automatically at 5-second intervals.
*   **Responsive Forms**: Covers Sign In, Sign Up, and Forgot Password screens inside a glassmorphic dark container.
*   **Comprehensive Registration**: Sign Up captures First Name, Last Name, Email, Password, Faculty, Department (cascaded dynamically by Faculty), Academic Level (100L - 600L), and Campus location (Ojo, Epe, Ikeja).
*   **Simulated Reset Flow**: Interactive 3-step password recovery (Email request, verification code simulation, and password override).

### 2. Interactive Library Shelves (User Dashboard)
*   **Home Dashboard**: Welcomes the user by name. Displays library quick stats, a fellowship announcement board showing weekly themes and service schedules, and direct card links to specific shelves.
*   **Academics Shelf**:
    *   **Cascaded Dropdowns**: Select Faculty (e.g., Science, Engineering, Law) to dynamically populate corresponding Departments.
    *   **Level Filtering**: Filter textbooks and resources between 100L and 600L.
    *   **Randomized Initial Feed**: Displays all academic books in a random/mixed order on loading, which filters automatically as dropdown parameters adjust.
*   **Self-Development Shelf**:
    *   Pill-based category selector for separating **Faith & Christian Growth** books from general **Leadership & Skill** resources.
    *   Initially random order, filterable by selection.
*   **Simulated PDF Reading Deck**: Click "Read Book" to open a custom, pageable browser reader simulated deck, complete with mathematical expressions, chapters, syllabus descriptions, and document download capabilities.

### 3. Fully-Functional Administrative Panel (Admin Hub)
*   **Role Protection**: Restricted to administrators. Log in using `admin@dlcf.org` with password `admin123` to test.
*   **Manage Members & Admins**:
    *   Directory of all registered fellowship members.
    *   Promote or demote users to/from the admin role.
    *   Delete or revoke member accounts.
    *   Register new administrators manually.
*   **Upload Material**:
    *   **Local File Upload**: Simulates dragging-and-dropping or clicking to upload `.pdf`, `.docx`, or `.pptx` documents.
    *   **Google Drive Integration**: Input external Google Drive or Cloud share URLs.
    *   *Real-time addition*: Uploaded books instantly populate the Academics or Self-Development tables and sync immediately with the user views.
*   **Catalog Database**: View, search, and delete books in the active catalog.

### 4. Client-Side Persistence
*   No database servers are required to test. The application seeds default catalogs, users, and admin accounts into the browser's `localStorage` on first load, enabling complete persistent additions, deletes, and state changes across reloads.

---

## Project Structure

```text
src/
├── assets/            # Static assets
├── data/
│   └── mockData.js    # LASU faculties, depts, levels, campuses, and preseeded books
├── component/
│   ├── Signin.jsx     # Login form
│   ├── Signup.jsx     # Registration form (dynamic dropdowns)
│   ├── Forgotpassword.jsx # Recovery flow
│   └── sidebar.jsx    # Left navigation panel with user profile summary
├── pages/
│   ├── authpage.jsx   # Authentication wrapper with slideshow
│   ├── dashboard.jsx  # Main library UI (Home, Academics, Self-Development shelves)
│   └── adminPanel.jsx # Administrator hub (Admin toggle, uploads, catalog deletion)
├── App.jsx            # Route dispatcher and path configuration
├── main.jsx           # App entry point importing Bootstrap and index.css
└── index.css          # Design tokens, variables, custom fonts, and glassmorphic animations
```

---

## How to Get Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 1. Install Dependencies
Navigate to the project directory in your terminal and run:
```bash
npm install
```

### 2. Start the Development Server
Launch the local dev environment by running:
```bash
npm run dev
```
Open the URL shown in your terminal (usually `http://localhost:5173`) in your web browser.

### 3. Testing Credentials
*   **Member Login**:
    *   **Email**: `promised@dlcf.org`
    *   **Password**: `user123`
*   **Admin Login**:
    *   **Email**: `admin@dlcf.org`
    *   **Password**: `admin123`
*   *Note: You can also use the **Sign Up** form to create a new student account, select your faculty/department, and log in.*
