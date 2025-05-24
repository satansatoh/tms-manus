import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import { User, AuthState } from '../types';

// 認証コンテキストの型定義
interface AuthContextType {
  isAuthenticated: boolean;
  isPolitician: boolean;
  user: User | null;
  currentUser: User | null; // DiscussionForum.tsxとの互換性のため追加
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, isPolitician: boolean) => Promise<boolean>;
  logout: () => void;
}

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isPolitician: false,
  user: null,
  currentUser: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// 認証プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 認証状態の管理
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isPolitician: false,
    user: null,
    token: null,
  });

  // トークンの検証と認証状態の初期化
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // verifyTokenの代わりにgetCurrentUserを使用
          const user = await authService.getCurrentUser();
          
          if (user) {
            setAuthState({
              isAuthenticated: true,
              isPolitician: user.is_politician,
              user,
              token,
            });
          } else {
            // トークンが無効な場合
            localStorage.removeItem('token');
            setAuthState({
              isAuthenticated: false,
              isPolitician: false,
              user: null,
              token: null,
            });
          }
        } catch (error) {
          console.error('Token verification error:', error);
          localStorage.removeItem('token');
          setAuthState({
            isAuthenticated: false,
            isPolitician: false,
            user: null,
            token: null,
          });
        }
      }
    };
    
    initAuth();
  }, []);

  // ログイン処理
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login(email, password);
      const { user, token } = response;
      
      localStorage.setItem('token', token);
      
      setAuthState({
        isAuthenticated: true,
        isPolitician: user.is_politician,
        user,
        token,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // 登録処理
  const register = async (name: string, email: string, password: string, isPolitician: boolean): Promise<boolean> => {
    try {
      const response = await authService.register(name, email, password, isPolitician.toString());
      const { user, token } = response;
      
      localStorage.setItem('token', token);
      
      setAuthState({
        isAuthenticated: true,
        isPolitician: user.is_politician,
        user,
        token,
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('token');
    
    setAuthState({
      isAuthenticated: false,
      isPolitician: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        isPolitician: authState.isPolitician,
        user: authState.user,
        currentUser: authState.user, // DiscussionForum.tsxとの互換性のため追加
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 認証コンテキストを使用するためのフック
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
