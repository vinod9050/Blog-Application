import { Outlet, Navigate } from 'react-router-dom';

function PrivateOutlet() {
  const auth = sessionStorage.getItem('role') !== undefined && sessionStorage.getItem('role') === 'admin';
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateOutlet;   
