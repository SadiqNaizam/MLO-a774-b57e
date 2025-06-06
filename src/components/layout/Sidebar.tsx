import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  // Props for future enhancements like collapsed state could be added here
  // For example: isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav component handles its own fixed positioning, width (w-64), height (h-screen), and styling.
  // This Sidebar wrapper component integrates SidebarNav into the application's layout structure.
  // It is intended to be placed within a grid cell defined in MainAppLayout.
  // The SidebarNav's fixed positioning will make it appear correctly within its designated layout area.
  return (
    <aside className={cn('h-full', className)}>
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
