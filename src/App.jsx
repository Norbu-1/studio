import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Header/Sidebar';
import Navbar from './Header/Navbar';
// import Dashboard from './pages/Dashboard';
import Students from './Section/StudentTable';
// import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="md:flex bg-gray-50">
        <Sidebar />

        {/* Main Content */}
        {<div className="md:w-5/6">
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/students" element={<Students />} />
            {/* <Route path="/reports" element={<Reports />} /> */}
          </Routes>
        </div> }
      </div>
    </Router>
  );
}

export default App;
