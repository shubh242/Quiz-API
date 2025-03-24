import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

console.log(isAuthenticated())

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
