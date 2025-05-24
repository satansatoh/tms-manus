import { useState } from "react";

// トースト通知の型定義
export interface Toast {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
}

// トースト通知フックの戻り値の型定義
interface UseToastReturn {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
}

// トースト通知を管理するカスタムフック
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // トースト通知を追加
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);

    // 指定された時間後に自動的に削除
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  // トースト通知を削除
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // トースト通知を更新
  const updateToast = (id: string, toast: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  };

  return {
    toasts,
    addToast,
    removeToast,
    updateToast,
  };
}

export default useToast;
