// グローバルなテスト関数の型定義
declare global {
  namespace NodeJS {
    interface Global {
      test: jest.It;
      expect: jest.Expect;
      describe: jest.Describe;
      beforeEach: jest.Lifecycle;
      afterEach: jest.Lifecycle;
      it: jest.It;
    }
  }
}

// Jest関連の型定義
declare namespace jest {
  interface It {
    (name: string, fn?: jest.ProvidesCallback, timeout?: number): void;
    only: It;
    skip: It;
    todo: It;
  }

  interface Expect {
    (value: any): any;
  }

  interface Describe {
    (name: string, fn: () => void): void;
    only: Describe;
    skip: Describe;
  }

  interface Lifecycle {
    (fn: () => void, timeout?: number): void;
  }

  interface ProvidesCallback {
    (): void | Promise<void>;
  }
}

// テスト関数のグローバル宣言
declare const test: jest.It;
declare const expect: jest.Expect;
declare const describe: jest.Describe;
declare const beforeEach: jest.Lifecycle;
declare const afterEach: jest.Lifecycle;
declare const it: jest.It;

export {};
