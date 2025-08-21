import { useNavigate, useLocation } from 'react-router-dom';

export const useScrollToHomeTop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToHomeTop = () => {
    if (location.pathname !== '/') {
      // Navigate to homepage first
      navigate('/');
      // Add a small delay to ensure the navigation completes before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Already on homepage, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return scrollToHomeTop;
};