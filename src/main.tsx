
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Ensure React is properly available
console.log("React version:", React.version);
console.log("ReactDOM available:", !!ReactDOM);

function App() {
  console.log("App component rendering");
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ 
        color: '#1e293b', 
        marginBottom: '20px',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        React Application
      </h1>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <p style={{ 
          color: '#64748b', 
          marginBottom: '15px',
          fontSize: '1.1rem'
        }}>
          Counter: {count}
        </p>
        
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Increment
        </button>
      </div>
      
      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f1f5f9',
        borderRadius: '8px',
        maxWidth: '400px'
      }}>
        <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Status:</h3>
        <ul style={{ color: '#64748b', listStyle: 'none', padding: 0 }}>
          <li>✅ React: {React.version}</li>
          <li>✅ useState: Working</li>
          <li>✅ Component: Rendering</li>
        </ul>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

console.log("Creating React root...");
const root = ReactDOM.createRoot(rootElement);

console.log("Rendering App...");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
