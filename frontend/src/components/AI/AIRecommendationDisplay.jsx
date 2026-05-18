import { useState } from 'react';
import API from '../../api/axios';
import { Sparkles, Loader } from 'lucide-react';

const AIRecommendationDisplay = ({ selectedData }) => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const dataToSend = Array.isArray(selectedData) ? selectedData : [selectedData];
      const res = await API.post('/ai/recommend', { employees: dataToSend });
      setAiData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedData) return null;

  const isMultiple = Array.isArray(selectedData);
  const title = isMultiple ? `Analyze ${selectedData.length} Employees` : `Analyze ${selectedData.name}`;

  return (
    <div className="glass-panel" style={{ marginTop: '2rem', border: '1px solid var(--accent-primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa' }}>
          <Sparkles size={20} /> AI Insights
        </h3>
        <button className="btn btn-primary" onClick={generateRecommendations} disabled={loading}>
          {loading ? <><Loader className="spin" size={18} /> Analyzing...</> : 'Generate AI Report'}
        </button>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{title}</p>
      
      {error && <div className="error-message">{error}</div>}

      {aiData && (
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {aiData.promotions && aiData.promotions.length > 0 && (
            <div>
              <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Promotion Recommendations</h4>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {aiData.promotions.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}

          {aiData.rankings && aiData.rankings.length > 0 && (
            <div>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Employee Rankings</h4>
              <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {aiData.rankings.map((r, i) => <li key={i}>{r}</li>)}
              </ol>
            </div>
          )}

          {aiData.training && aiData.training.length > 0 && (
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Training Suggestions</h4>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {aiData.training.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}

          {aiData.feedback && aiData.feedback.length > 0 && (
            <div>
              <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Constructive Feedback</h4>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {aiData.feedback.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default AIRecommendationDisplay;
