import React from 'react';
import { cn } from "../../lib/utils";

// トグルグループのProps型定義
export interface ToggleGroupProps {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

// トグルグループアイテムのProps型定義
export interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  'data-state'?: string;
  onClick?: () => void;
}

// トグルグループコンポーネント
const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ type, value, onValueChange, disabled, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap gap-2",
          disabled ? "opacity-50 pointer-events-none" : "",
          className || ""
        )}
        role={type === 'single' ? 'radiogroup' : 'group'}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<ToggleGroupItemProps>(child)) return child;
          
          // 子要素のpropsを拡張（型安全に修正）
          const childProps: ToggleGroupItemProps = {
            ...child.props,
            disabled: disabled || child.props.disabled,
            'data-state': Array.isArray(value) 
              ? value.includes(child.props.value) ? 'on' : 'off'
              : value === child.props.value ? 'on' : 'off',
            onClick: () => {
              if (!onValueChange) return;
              
              if (type === 'single') {
                onValueChange(child.props.value);
              } else {
                const newValue = Array.isArray(value) ? [...value] : [];
                if (newValue.includes(child.props.value)) {
                  onValueChange(newValue.filter(v => v !== child.props.value));
                } else {
                  onValueChange([...newValue, child.props.value]);
                }
              }
            }
          };
          
          return React.cloneElement(child, childProps);
        })}
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

// トグルグループアイテムコンポーネント
const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="presentation"
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900 bg-transparent hover:bg-slate-100 hover:text-slate-900 h-10 px-3",
          className || ""
        )}
        disabled={disabled}
        data-value={value}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
