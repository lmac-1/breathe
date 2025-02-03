import { cn } from '@/utils';
import Link, { LinkProps } from 'next/link';
import React from 'react';

type ButtonBaseProps = {
  className?: string;
};

interface ButtonLinkProps extends ButtonBaseProps, LinkProps {
  children: React.ReactNode | string;
  onClick?: never;
}

interface ButtonElementProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  onClick?: any;
}

type ButtonProps = ButtonLinkProps | ButtonElementProps;

export const Button = ({
  className,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const { href } = props as ButtonLinkProps;
  const { disabled } = props as ButtonElementProps;

  const Component = href ? Link : 'button';
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'bg-blue-200 text-blue-900 px-4 py-2 rounded-md',
        className
      )}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};
