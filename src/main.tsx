
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Ultra-minimal React app to test basic functionality
function TestApp() {
  console.log("✅ TestApp - Basic React test");
  
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>React Test App</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        ✅ React is working correctly!
      </p>
      <p style={{ color: '#999', fontSize: '14px' }}>
        Current time: {new Date().toLocaleTimeString()}
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>System Status</h2>
        <ul style={{ color: '#666', lineHeight: '1.6' }}>
          <li>✅ React: Working</li>
          <li>✅ DOM: Mounted</li>
          <li>✅ JavaScript: Executing</li>
          <li>✅ No external dependencies</li>
        </ul>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(<TestApp />);
