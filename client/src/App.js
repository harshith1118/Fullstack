// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // 1️⃣  Replace this entire fetchCount
  const fetchCount = async () => {
    try {
      const { data } = await axios.get('http://localhost:3002/api/count');
      setCount(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  // 2️⃣  Leave incrementCount unchanged
  const incrementCount = async () => {
    try {
      await axios.post('http://localhost:3002/api/count');
      fetchCount();
    } catch (err) {
      console.error('Error incrementing count:', err);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Count App</h1>
      </header>
      <p>Count: {count}</p>
      <button onClick={fetchCount}>Fetch Count</button>
      <button onClick={incrementCount}>Increment Count</button>
      
    </div>
  );
}

export default App;