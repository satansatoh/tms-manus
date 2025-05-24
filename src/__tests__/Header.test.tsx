import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/layout/Header';

// モックコンテキスト
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    currentUser: null,
    isPolitician: false,
    logout: vi.fn(),
  }),
}));

describe('Header Component', () => {
  test('renders logo and navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // ロゴが表示されていることを確認
    expect(screen.getByText('マニフェスト管理')).toBeInTheDocument();
    
    // ナビゲーションリンクが表示されていることを確認
    // 複数の「ホーム」リンクがある場合、最初のものを検証
    const homeLinks = screen.getAllByText('ホーム');
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(homeLinks[0]).toBeInTheDocument();
    
    const politicianLinks = screen.getAllByText('政治家一覧');
    expect(politicianLinks.length).toBeGreaterThan(0);
    expect(politicianLinks[0]).toBeInTheDocument();
    
    const compareLinks = screen.getAllByText('公約比較');
    expect(compareLinks.length).toBeGreaterThan(0);
    expect(compareLinks[0]).toBeInTheDocument();
    
    const discussionLinks = screen.getAllByText('意見交換');
    expect(discussionLinks.length).toBeGreaterThan(0);
    expect(discussionLinks[0]).toBeInTheDocument();
  });

  test('shows login and register buttons when not authenticated', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // 未認証時にログインと登録ボタンが表示されていることを確認
    // 複数の「ログイン」リンクがある場合、最初のものを検証
    const loginLinks = screen.getAllByText('ログイン');
    expect(loginLinks.length).toBeGreaterThan(0);
    expect(loginLinks[0]).toBeInTheDocument();
    
    const registerLinks = screen.getAllByText('登録');
    expect(registerLinks.length).toBeGreaterThan(0);
    expect(registerLinks[0]).toBeInTheDocument();
  });

  test('mobile menu toggle works', () => {
    // テストの実装を簡略化し、モバイルメニューの表示/非表示ロジックのみをテスト
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // モバイルメニューボタンを取得
    const menuButton = screen.getByLabelText('メニューを開く');
    expect(menuButton).toBeInTheDocument();
    
    // メニューボタンをクリック
    fireEvent.click(menuButton);
    
    // クリック後にモバイルメニューの内容が表示されることを確認
    // ホームリンクが複数あるため、モバイルメニュー内のリンクを特定するためにcontainerから直接検索
    const mobileLinks = container.querySelectorAll('.sm\\:hidden a');
    expect(mobileLinks.length).toBeGreaterThan(0);
    
    // 少なくとも1つのリンクが存在することを確認
    const homeLink = Array.from(mobileLinks).find(link => link.textContent === 'ホーム');
    expect(homeLink).toBeDefined();
  });
});
