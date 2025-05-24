import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

// APIのベースURL
const API_URL = 'http://localhost:5000/api';

// トークンからユーザー情報を取得
const getUserFromToken = (token: string): User => {
  try {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.user_id,
      user_id: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
      is_politician: decoded.user_type === 'politician',
      user_type: decoded.user_type,
      created_at: decoded.created_at
    };
  } catch (error) {
    throw new Error('トークンの解析に失敗しました');
  }
};

// 認証サービス
const authService = {
  // ログイン
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token } = response.data;
      const user = getUserFromToken(token);
      return { user, token };
    } catch (error) {
      throw new Error('ログインに失敗しました');
    }
  },

  // 登録
  register: async (username: string, email: string, password: string, userType: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        user_type: userType
      });
      const { token } = response.data;
      const user = getUserFromToken(token);
      return { user, token };
    } catch (error) {
      throw new Error('登録に失敗しました');
    }
  },

  // 現在のユーザー情報を取得
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      // トークンをヘッダーに設定
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data.user;
    } catch (error) {
      throw new Error('ユーザー情報の取得に失敗しました');
    }
  },

  // リクエストインターセプターの設定
  setupInterceptors: () => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // 認証エラーの場合、ログアウト処理
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
};

// インターセプターの初期設定
authService.setupInterceptors();

export default authService;
