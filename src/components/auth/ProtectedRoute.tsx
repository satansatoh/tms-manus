import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  requirePolitician?: boolean;
  requireCitizen?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = false,
  requirePolitician = false,
  requireCitizen = false
}) => {
  const { isAuthenticated, isPolitician } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 認証が必要なルートで未認証の場合
  if (requireAuth && !isAuthenticated) {
    // 現在のURLをリダイレクト後に戻れるよう保存
    React.useEffect(() => {
      navigate('/login', { state: { from: location.pathname } });
    }, [navigate, location]);
    return null;
  }

  // 政治家のみアクセス可能なルートで政治家でない場合
  if (requirePolitician && !isPolitician) {
    React.useEffect(() => {
      navigate('/unauthorized');
    }, [navigate]);
    return null;
  }

  // 一般市民のみアクセス可能なルートで一般市民でない場合
  if (requireCitizen && !isPolitician) {
    React.useEffect(() => {
      navigate('/unauthorized');
    }, [navigate]);
    return null;
  }

  // 条件を満たしている場合は子コンポーネントを表示
  return <Outlet />;
};

export default ProtectedRoute;
