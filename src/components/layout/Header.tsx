import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void; // For mobile sidebar toggle, passed to TopHeader
  // Props for future enhancements like dynamic sidebar width affecting TopHeader's 'left' style could be added here
  // For example: currentSidebarActualWidth?: string; // e.g., '16rem' or '5rem'
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar }) => {
  // TopHeader component handles its own fixed positioning (top, right, left: '16rem'), height (h-16), and styling.
  // This Header wrapper component integrates TopHeader into the application's layout structure.
  // It is intended to be placed within a grid cell defined in MainAppLayout.
  // TopHeader's fixed positioning will make it appear correctly within its designated layout area.
  return (
    <header className={cn('h-full w-full', className)}>
      <TopHeader onToggleSidebar={onToggleSidebar} className="w-full" />
      {/* TopHeader itself is fixed positioned; className="w-full" on TopHeader ensures it conceptually fills its container if it were in-flow. */}
      {/* The parent header element having h-full and w-full ensures it fills the grid cell. */}
    </header>
  );
};

export default Header;
