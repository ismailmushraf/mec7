import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/authAtom';

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useRecoilValue(userState);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
