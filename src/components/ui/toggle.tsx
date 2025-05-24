import React from 'react';
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// トグルボタンのバリエーション定義
export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-slate-100 hover:text-slate-900",
        outline:
          "border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// トグルボタンのProps型定義
export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
}

// トグルボタンコンポーネント
const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      data-state={pressed ? "on" : "off"}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";

export default Toggle;
