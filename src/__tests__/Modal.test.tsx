import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/ui/Modal';

describe('Modal Component', () => {
  test('renders when isOpen is true', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="テストモーダル"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    expect(screen.getByText('テストモーダル')).toBeInTheDocument();
    expect(screen.getByText('モーダルの内容')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal 
        isOpen={false} 
        onClose={() => {}} 
        title="非表示モーダル"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    expect(screen.queryByText('非表示モーダル')).not.toBeInTheDocument();
    expect(screen.queryByText('モーダルの内容')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        title="閉じるテスト"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /閉じる/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        title="背景クリックテスト"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    // モーダルの背景要素を取得（role="dialog"の親要素）
    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders with footer', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="フッター付きモーダル"
        footer={<button>保存</button>}
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    expect(screen.getByText('フッター付きモーダル')).toBeInTheDocument();
    expect(screen.getByText('モーダルの内容')).toBeInTheDocument();
    expect(screen.getByText('保存')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="サイズテスト"
        size="sm"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    let modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('max-w-sm');
    
    rerender(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="サイズテスト"
        size="lg"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('max-w-lg');
  });

  test('has correct padding classes', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="レスポンシブテスト"
      >
        <p>モーダルの内容</p>
      </Modal>
    );
    
    const titleElement = screen.getByText('レスポンシブテスト').closest('div');
    expect(titleElement).toHaveClass('px-4');
    expect(titleElement).toHaveClass('py-3');
    
    const contentElement = screen.getByText('モーダルの内容').closest('div');
    expect(contentElement).toHaveClass('p-4');
  });
});
