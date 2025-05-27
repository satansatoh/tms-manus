'use server';

import { loginUser, registerUser, logoutUser } from '../lib/supabase';

// ログイン処理のServer Action
export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      success: false,
      error: 'メールアドレスとパスワードを入力してください。'
    };
  }

  return await loginUser(email, password);
}

// ユーザー登録処理のServer Action
export async function register(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string || 'user';

  if (!email || !password || !name) {
    return {
      success: false,
      error: '必須項目をすべて入力してください。'
    };
  }

  const userData = {
    name,
    role
  };

  return await registerUser(email, password, userData);
}

// ログアウト処理のServer Action
export async function logout() {
  return await logoutUser();
}
