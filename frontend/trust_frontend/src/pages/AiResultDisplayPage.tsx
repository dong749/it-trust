import React, { useEffect, useState } from 'react';
import { getAnalysisResultUsingGet } from '@/services/it-trust/quizController';

type AiAnalysisResultVO = {
  finishedTime: string;
  questionCategory: string;
  aiResponse: string;
};

const AiResultDisplayPage: React.FC = () => {
  const [data, setData] = useState<AiAnalysisResultVO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalysisResultUsingGet()
      .then((res) => {
        if (res && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch result:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: '#fff', marginBottom: 20 }}>📊 AI Feedback Results</h2>
      {loading ? (
        <p style={{ color: '#ccc' }}>⏳ Loading...</p>
      ) : data.length === 0 ? (
        <p style={{ color: '#ccc' }}>No data available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
          <thead>
            <tr>
              <th style={thStyle}>Quiz Time</th>
              <th style={thStyle}>Quiz Category</th>
              <th style={thStyle}>AI Feedback</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{new Date(item.finishedTime).toLocaleString()}</td>
                <td style={tdStyle}>{item.questionCategory}</td>
                <td style={tdStyle}>{item.aiResponse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: 8,
  backgroundColor: 'transparent', // 去掉表头填充色
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#fff',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: 8,
  verticalAlign: 'top',
  color: '#eee',
};

export default AiResultDisplayPage;
