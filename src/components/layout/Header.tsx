import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, currentUser, isPolitician, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-blue-600 font-bold text-xl">
              マニフェスト管理
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              ホーム
            </Link>
            <Link to="/politicians" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              政治家一覧
            </Link>
            <Link to="/compare" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              公約比較
            </Link>
            <Link to="/discussion" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              意見交換
            </Link>
          </div>

          {/* 認証関連ボタン */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isPolitician && (
                  <Link to="/politician/dashboard" className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    ダッシュボード
                  </Link>
                )}
                <div className="text-sm font-medium text-gray-700">
                  {currentUser?.username}
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                  ログイン
                </Link>
                <Link to="/register" className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  登録
                </Link>
              </div>
            )}
          </div>

          {/* モバイルメニューボタン */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              onClick={toggleMenu}
              aria-label="メニューを開く"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            ホーム
          </Link>
          <Link
            to="/politicians"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            政治家一覧
          </Link>
          <Link
            to="/compare"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            公約比較
          </Link>
          <Link
            to="/discussion"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            意見交換
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="space-y-1">
              <div className="px-4 py-2 text-base font-medium text-gray-700">
                {currentUser?.username}
              </div>
              {isPolitician && (
                <Link
                  to="/politician/dashboard"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ダッシュボード
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                ログイン
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                登録
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
