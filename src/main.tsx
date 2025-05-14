
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize Google Analytics
const initGoogleAnalytics = () => {
  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-VYKW0Y9K0T`;
  
  // Add script to document head
  document.head.appendChild(script);
  
  // Initialize the dataLayer
  window.dataLayer = window.dataLayer || [];
  
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  
  // Configure Google Analytics
  gtag('js', new Date());
  gtag('config', 'G-VYKW0Y9K0T', {
    send_page_view: false, // We'll handle page views manually through useAnalytics
    site_speed_sample_rate: 100 // Track site speed for all users
  });
  
  // Make gtag available globally
  window.gtag = gtag as any;
};

// Call the initialization function
if (typeof window !== 'undefined') {
  initGoogleAnalytics();
}

createRoot(document.getElementById("root")!).render(<App />);
