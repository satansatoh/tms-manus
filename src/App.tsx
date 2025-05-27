import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// ページのインポート
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PoliticianDetail from './pages/PoliticianDetail';
import ComparePromises from './pages/ComparePromises';
import DiscussionForum from './pages/DiscussionForum';
import ManifestoDetail from './pages/ManifestoDetail';
import PoliticianDashboard from './pages/politician/Dashboard';

// スタイルのインポート
import './styles/responsive.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 公開ルート */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/politician/:id" element={<PoliticianDetail />} />
          <Route path="/compare" element={<ComparePromises />} />
          <Route path="/discussion" element={<DiscussionForum />} />
          <Route path="/manifestos/:id" element={<ManifestoDetail />} />
          
          {/* 認証が必要なルート */}
          <Route element={<ProtectedRoute requireAuth={true} />}>
            {/* 政治家のみアクセス可能なルート */}
            <Route element={<ProtectedRoute requirePolitician={true} />}>
              <Route path="/politician/dashboard" element={<PoliticianDashboard />} />
            </Route>
          </Route>
          
          {/* 未認可ページ */}
          <Route path="/unauthorized" element={<div>アクセス権限がありません</div>} />
          
          {/* 存在しないページへのリダイレクト */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
