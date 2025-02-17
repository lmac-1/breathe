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
        'bg-navy/80 text-cream px-4 focus:ring ring-blue-500/75 outline-none py-2 rounded-md hover:bg-navy/85 transition-colors',
        className
      )}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};
