import React from 'react';

interface BottomTabBarProps {
  children: React.ReactNode;
  className?: string;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ children, className }) => {
  console.log("Rendering BottomTabBar");
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border shadow-md flex justify-around items-center md:hidden ${className || ''}`}
    >
      {children}
    </nav>
  );
};

export default BottomTabBar;