
import React from "react";
import { createRoot } from "react-dom/client";

function FreshStart() {
  console.log("🚀 FreshStart - completely new entry point");
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Fresh Start - Cache Cleared</h1>
      <p>If you can see this, React is working correctly!</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(<FreshStart />);
