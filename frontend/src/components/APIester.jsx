// components/APITester.jsx
import React, { useState } from 'react';
import API from '../api';

export default function APITester() {
  const [result, setResult] = useState(null);

  const testAPI = async () => {
    try {
      const response = await API.testConnection();
      setResult(response);
    } catch (error) {
      setResult({ success: false, error: error.message });
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>API Connection Test</h3>
      <button onClick={testAPI}>Test API Connection</button>
      {result && (
        <div style={{ marginTop: '10px', color: result.success ? 'green' : 'red' }}>
          {result.success ? '✅ API Connected Successfully' : `❌ Error: ${result.error}`}
        </div>
      )}
    </div>
  );
}