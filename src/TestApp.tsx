function TestApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Emergency Test App</h1>
        <p>This is a completely separate component to test React functionality</p>
        <p>If you see this, React is working correctly</p>
      </div>
    </div>
  );
}

export default TestApp;