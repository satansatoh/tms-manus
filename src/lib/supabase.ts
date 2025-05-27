// src/lib/supabase.ts
// Supabaseクライアントの設定

// 実際の環境では環境変数から取得
const supabaseUrl = 'https://example.supabase.co';
const supabaseKey = 'your-supabase-key';

// テンプレート実装のため、実際のSupabaseクライアントは初期化しない
// 本番環境では以下のようにクライアントを初期化する
// import { createClient } from '@supabase/supabase-js';
// export const supabase = createClient(supabaseUrl, supabaseKey);

// テンプレートユーザー
export const templateUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: '一般ユーザー',
    role: 'user'
  },
  {
    id: '2',
    email: 'politician@example.com',
    password: 'password123',
    name: '山田太郎',
    role: 'politician',
    politician_id: '1'
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'password123',
    name: '管理者',
    role: 'admin'
  }
];

// エラー型の定義
interface SupabaseError {
  message: string;
}

// テンプレートSupabaseクライアント
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // テンプレートユーザーで認証
      const user = templateUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        return {
          data: {
            user: {
              id: user.id,
              email: user.email,
              user_metadata: {
                name: user.name,
                role: user.role,
                politician_id: user.role === 'politician' ? user.politician_id : null
              }
            },
            session: {
              access_token: 'fake-access-token',
              refresh_token: 'fake-refresh-token',
              expires_at: Date.now() + 3600 * 1000 // 1時間後
            }
          },
          error: null as null | SupabaseError
        };
      }

      return {
        data: { user: null, session: null },
        error: {
          message: 'メールアドレスまたはパスワードが正しくありません。'
        } as SupabaseError
      };
    },

    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
      // 実際のサインアップ処理は行わず、成功レスポンスを返す
      return {
        data: {
          user: {
            id: 'new-user-id',
            email,
            user_metadata: options?.data || {}
          },
          session: null
        },
        error: null as null | SupabaseError
      };
    },

    signOut: async () => {
      // サインアウト処理（実際には何もしない）
      return { error: null as null | SupabaseError };
    },

    getSession: async () => {
      // ローカルストレージからセッション情報を取得
      const sessionStr = typeof localStorage !== 'undefined' ? localStorage.getItem('supabase.auth.session') : null;
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          return { data: { session }, error: null as null | SupabaseError };
        } catch (e) {
          return { data: { session: null }, error: null as null | SupabaseError };
        }
      }
      return { data: { session: null }, error: null as null | SupabaseError };
    }
  }
};

// Server Actions用のラッパー関数
export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // セッション情報をローカルストレージに保存（実際のSupabaseクライアントは自動で行う）
    if (data.session && typeof localStorage !== 'undefined') {
      localStorage.setItem('supabase.auth.session', JSON.stringify(data.session));
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function registerUser(email: string, password: string, userData: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      user: data.user
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'ユーザー登録中に不明なエラーが発生しました';
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, error: error.message };
    }

    // ローカルストレージからセッション情報を削除
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('supabase.auth.session');
    }

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'ログアウト中に不明なエラーが発生しました';
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function getCurrentSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      session: data.session
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'セッション取得中に不明なエラーが発生しました';
    return {
      success: false,
      error: errorMessage
    };
  }
}
