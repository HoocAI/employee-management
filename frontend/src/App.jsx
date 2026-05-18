import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import EmployeeRegistrationForm from './components/Employee/EmployeeRegistrationForm';
import EmployeeList from './components/Employee/EmployeeList';
import AIRecommendationDisplay from './components/AI/AIRecommendationDisplay';
import { LogOut } from 'lucide-react';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const Dashboard = () => {
  const [refreshList, setRefreshList] = useState(0);
  const [selectedForAI, setSelectedForAI] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="navbar">
        <h2>AI HR System</h2>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <LogOut size={18} /> Logout
        </button>
      </nav>
      <div className="app-container">
        <EmployeeRegistrationForm onEmployeeAdded={() => setRefreshList(prev => prev + 1)} />
        <EmployeeList refreshTrigger={refreshList} onSelectForAI={setSelectedForAI} />
        {selectedForAI && <AIRecommendationDisplay selectedData={selectedForAI} />}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
