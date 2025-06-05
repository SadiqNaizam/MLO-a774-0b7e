import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional class names

interface BottomNavigationItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  className?: string;
  activeClassName?: string;
}

const BottomNavigationItem: React.FC<BottomNavigationItemProps> = ({
  icon: Icon,
  label,
  to,
  className,
  activeClassName = 'text-primary', // Default active class
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`); // More robust active check

  console.log(`Rendering BottomNavigationItem: ${label}, Path: ${to}, Active: ${isActive}`);

  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors p-2 flex-1',
        isActive && activeClassName,
        className
      )}
    >
      <Icon className={cn('h-6 w-6 mb-0.5', isActive ? 'fill-current opacity-20' : '')} strokeWidth={isActive ? 2.5 : 2} />
      <span className={cn('text-xs', isActive ? 'font-semibold' : 'font-normal')}>{label}</span>
    </Link>
  );
};

export default BottomNavigationItem;