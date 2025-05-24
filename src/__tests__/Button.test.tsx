import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/ui/Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>テストボタン</Button>);
    
    const button = screen.getByText('テストボタン');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); // primaryバリアントのデフォルトクラス
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">プライマリ</Button>);
    expect(screen.getByText('プライマリ')).toHaveClass('bg-blue-600');
    
    rerender(<Button variant="secondary">セカンダリ</Button>);
    expect(screen.getByText('セカンダリ')).toHaveClass('bg-slate-200');
    
    rerender(<Button variant="outline">アウトライン</Button>);
    expect(screen.getByText('アウトライン')).toHaveClass('bg-transparent');
    expect(screen.getByText('アウトライン')).toHaveClass('border-slate-300');
    
    rerender(<Button variant="danger">危険</Button>);
    expect(screen.getByText('危険')).toHaveClass('bg-red-600');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">小</Button>);
    expect(screen.getByText('小')).toHaveClass('text-sm');
    
    rerender(<Button size="md">中</Button>);
    expect(screen.getByText('中')).toHaveClass('text-base');
    
    rerender(<Button size="lg">大</Button>);
    expect(screen.getByText('大')).toHaveClass('text-lg');
  });

  test('handles fullWidth prop', () => {
    render(<Button fullWidth>全幅</Button>);
    expect(screen.getByText('全幅')).toHaveClass('w-full');
  });

  test('handles disabled state', () => {
    render(<Button disabled>無効</Button>);
    const button = screen.getByText('無効');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  test('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    
    fireEvent.click(screen.getByText('クリック'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>無効クリック</Button>);
    
    fireEvent.click(screen.getByText('無効クリック'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
