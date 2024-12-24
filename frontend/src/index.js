import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global styles
import App from '../src/App'; // Main App component
import reportWebVitals from './reportWebVitals';

// Render the React app into the root element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: Measure performance of your app (can be removed if not needed)
reportWebVitals(console.log);
