import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/ui/Card';

describe('Card Component', () => {
  test('renders with title and content', () => {
    render(
      <Card title="テストカード">
        <p>カードの内容</p>
      </Card>
    );
    
    expect(screen.getByText('テストカード')).toBeInTheDocument();
    expect(screen.getByText('カードの内容')).toBeInTheDocument();
  });

  test('renders with footer', () => {
    render(
      <Card 
        title="フッター付きカード"
        footer={<button>アクション</button>}
      >
        <p>カードの内容</p>
      </Card>
    );
    
    expect(screen.getByText('フッター付きカード')).toBeInTheDocument();
    expect(screen.getByText('カードの内容')).toBeInTheDocument();
    expect(screen.getByText('アクション')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(
      <Card 
        title="スタイル付きカード"
        className="custom-class"
      >
        <p>カードの内容</p>
      </Card>
    );
    
    const cardElement = screen.getByText('スタイル付きカード').closest('.bg-white');
    expect(cardElement).toHaveClass('custom-class');
  });

  test('has correct padding classes', () => {
    render(
      <Card title="レスポンシブカード">
        <p>カードの内容</p>
      </Card>
    );
    
    const titleElement = screen.getByText('レスポンシブカード').closest('div');
    expect(titleElement).toHaveClass('px-4');
    
    const contentElement = screen.getByText('カードの内容').closest('div');
    expect(contentElement).toHaveClass('p-4');
  });
});
