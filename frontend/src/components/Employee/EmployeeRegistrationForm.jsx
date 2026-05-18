import { useState } from 'react';
import API from '../../api/axios';
import { UserPlus } from 'lucide-react';

const EmployeeRegistrationForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await API.post('/employees', payload);
      setMessage('Employee stored successfully');
      setFormData({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
      if (onEmployeeAdded) onEmployeeAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving employee');
    }
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
      <h3>Register Employee</h3>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label className="form-label">Department</label>
          <input type="text" name="department" className="form-input" value={formData.department} onChange={handleChange} required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label className="form-label">Skills (comma separated)</label>
          <input type="text" name="skills" className="form-input" value={formData.skills} onChange={handleChange} required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label className="form-label">Performance Score (0-100)</label>
          <input type="number" name="performanceScore" className="form-input" min="0" max="100" value={formData.performanceScore} onChange={handleChange} required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <label className="form-label">Experience (Years)</label>
          <input type="number" name="experience" className="form-input" min="0" value={formData.experience} onChange={handleChange} required />
        </div>
        <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary"><UserPlus size={18} /> Add Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistrationForm;
