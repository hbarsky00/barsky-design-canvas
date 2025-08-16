
import { useLocation } from "react-router-dom";

export const useProjectPageDetection = () => {
  const location = useLocation();
  return location.pathname.startsWith('/project/');
};
