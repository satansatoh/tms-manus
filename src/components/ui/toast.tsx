import React from 'react';

export interface ToastProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

export interface ToastActionProps {
  altText: string;
  children?: React.ReactNode;
  className?: string;
}

export interface ToastCloseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ToastDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ToastTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ToastViewportProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ToastProviderProps {
  children?: React.ReactNode;
}

import { cn } from "../../lib/utils";

export function Toast({ id, className, children, ...props }: ToastProps) {
  return (
    <div
      className={cn("bg-white rounded-lg shadow-lg p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToastAction({ className, children, ...props }: ToastActionProps) {
  return (
    <button
      className={cn("inline-flex items-center justify-center px-3 py-1 text-sm font-medium", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ToastClose({ className, children, ...props }: ToastCloseProps) {
  return (
    <button
      className={cn("absolute top-2 right-2 p-1 rounded-md", className)}
      {...props}
    >
      {children || (
        <span className="sr-only">閉じる</span>
      )}
    </button>
  );
}

export function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  return (
    <div
      className={cn("text-sm text-gray-600", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToastTitle({ className, children, ...props }: ToastTitleProps) {
  return (
    <div
      className={cn("text-base font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToastViewport({ className, children, ...props }: ToastViewportProps) {
  return (
    <div
      className={cn("fixed bottom-0 right-0 z-50 flex flex-col p-4 gap-2 max-h-screen w-full sm:max-w-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToastProvider({ children }: ToastProviderProps) {
  return <>{children}</>;
}
