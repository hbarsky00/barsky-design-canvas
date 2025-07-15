
import React from "react";
import { createRoot } from "react-dom/client";

// Completely isolated React app - no external dependencies
function IsolatedApp() {
  console.log("🔥 IsolatedApp - Zero dependencies test");
  
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Isolated React App</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        ✅ React is working correctly!
      </p>
      
      <div style={{ 
        marginTop: '20px',
        padding: '20px', 
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>React Hook Test</h2>
        <p style={{ color: '#666', marginBottom: '10px' }}>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>System Status</h2>
        <ul style={{ color: '#666', lineHeight: '1.6' }}>
          <li>✅ React: Working</li>
          <li>✅ DOM: Mounted</li>
          <li>✅ useState Hook: Working</li>
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
root.render(<IsolatedApp />);
