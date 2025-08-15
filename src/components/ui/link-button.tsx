
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface LinkButtonProps {
  href: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}) => {
  // If it's an external link, use regular anchor tag
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn(className)}
        {...props}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  // For internal links, use React Router Link
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    >
      <Link to={href}>
        {children}
      </Link>
    </Button>
  );
};
