// 共通データモデルの型定義

// ユーザー関連の型定義
export interface User {
  id: string;
  user_id?: string; // authServiceとの互換性のため追加
  username: string;
  email: string;
  is_politician: boolean;
  user_type?: string; // authServiceとの互換性のため追加
  created_at: string;
}

// 認証関連の型定義
export interface AuthState {
  isAuthenticated: boolean;
  isPolitician: boolean;
  user: User | null;
  token: string | null;
}

// 政治家関連の型定義
export interface Politician {
  id: string;
  name: string;
  party: string;
  position: string;
  profile: string;
  nationality: string;
  imageUrl: string;
  links?: Array<{
    type: string;
    url: string;
  }>;
}

// マニフェスト関連の型定義
export interface Manifesto {
  id: string;
  politician_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// 公約関連の型定義
export interface Promise {
  id: string;
  politician_id: string;
  title: string;
  description: string;
  category_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

// カテゴリ注力度関連の型定義
export interface CategoryFocus {
  category_id: string;
  politician_id: string;
  category_name: string;
  focus_percentage: number;
}

// 進捗レポート関連の型定義
export interface ProgressReport {
  id: string;
  promise_id: string;
  politician_id: string;
  content: string;
  created_at: string;
}

// コメント関連の型定義
export interface Comment {
  id: string;
  user_id: string;
  promise_id: string;
  content: string;
  created_at: string;
  username?: string;
}

// いいね関連の型定義
export interface Like {
  id: string;
  user_id: string;
  promise_id: string;
  created_at: string;
}

// UI コンポーネント関連の型定義
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

// 政治家カード関連の型定義
export interface PoliticianCardProps {
  id: string;
  name: string;
  party: string;
  position: string;
  profile: string;
  nationality: string;
  imageUrl: string;
  categories?: Array<{
    name: string;
    percentage: number;
  }>;
  onClick?: () => void;
}

// API レスポンス関連の型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ページネーション関連の型定義
export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 検索パラメータ関連の型定義
export interface SearchParams {
  query?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}
