import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Search } from 'lucide-react';

const EmployeeList = ({ refreshTrigger, onSelectForAI }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async (department = '') => {
    setLoading(true);
    try {
      const url = department ? `/employees/search?department=${department}` : '/employees';
      const res = await API.get(url);
      setEmployees(res.data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshTrigger]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchTerm);
  };

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>Employee Directory</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px', padding: '0.5rem 1rem' }}
          />
          <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <Search size={18} />
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Skills</th>
                <th>Score</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No employees found</td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {emp.skills.map(s => <span key={s} className="badge">{s}</span>)}
                      </div>
                    </td>
                    <td>{emp.performanceScore}</td>
                    <td>{emp.experience} yrs</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        onClick={() => onSelectForAI(emp)}
                      >
                        AI Insights
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {employees.length > 0 && (
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => onSelectForAI(employees)}>
                Analyze All (AI Ranking)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
