// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// グローバルなモック設定
import { vi } from 'vitest';

// グローバルなモック関数をエクスポート
// TypeScriptのwindowオブジェクト拡張
declare global {
  interface Window {
    jest: {
      fn: typeof vi.fn;
      mock: typeof vi.mock;
    }
  }
}

// グローバルなモック関数を設定
window.jest = {
  fn: vi.fn,
  mock: vi.mock
};
