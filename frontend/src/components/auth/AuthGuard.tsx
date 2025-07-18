import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState, authLoadingState } from '../../recoil/atoms/authAtom';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useRecoilValue(userState);
  const isLoading = useRecoilValue(authLoadingState);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
