import React from 'react';
import { cn } from "../../lib/utils";

// ツールチップのProps型定義
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  contentClassName?: string;
}

// ツールチップコンポーネント
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className,
  contentClassName,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  // ツールチップの位置を計算
  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top = 0;
    let left = 0;

    // 縦方向の位置
    switch (side) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        break;
      case 'left':
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // 横方向の位置
    switch (side) {
      case 'left':
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        left = triggerRect.right + 8;
        break;
      case 'top':
      case 'bottom':
        switch (align) {
          case 'start':
            left = triggerRect.left;
            break;
          case 'end':
            left = triggerRect.right - tooltipRect.width;
            break;
          default: // center
            left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
        }
        break;
    }

    setPosition({ top, left });
  }, [side, align]);

  // マウスオーバー時の処理
  const handleMouseEnter = React.useCallback(() => {
    setIsVisible(true);
    // 次のフレームで位置を計算（DOMが更新された後）
    requestAnimationFrame(updatePosition);
  }, [updatePosition]);

  // マウスアウト時の処理
  const handleMouseLeave = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <div className={cn("relative inline-block", className || "")}>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 rounded-md bg-slate-900 px-3 py-1.5 text-xs text-slate-50",
            contentClassName || ""
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// 追加のTooltipコンポーネント
export const TooltipProvider: React.FC<{children: React.ReactNode, delayDuration?: number}> = ({children}) => {
  return <>{children}</>;
};

export const TooltipTrigger: React.FC<{children: React.ReactNode, asChild?: boolean}> = ({children}) => {
  return <>{children}</>;
};

export const TooltipContent: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => {
  return <div className={className}>{children}</div>;
};

export default Tooltip;
