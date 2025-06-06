import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingBag,
  Bitcoin,
  FolderKanban,
  Ticket,
  BriefcaseBusiness,
  Rss,
  Grid3x3,
  AppWindow,
  FileTextIcon,
  ImageIcon,
  ShieldCheck,
  ExternalLink,
  SlidersHorizontal,
  Palette,
  Puzzle,
  ChevronDown,
  ChevronRight,
  CircleUserRound
} from 'lucide-react';

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: { text: string; type: 'new' | 'hot' };
  children?: NavItemProps[];
  isActive?: boolean;
}

const navItemsData: NavItemProps[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    isActive: true,
    children: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '#' },
      { id: 'crm', label: 'CRM', icon: FolderKanban, href: '#', isActive: true },
      { id: 'ecommerce', label: 'Ecommerce', icon: ShoppingBag, href: '#' },
    ],
  },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin, href: '#' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, href: '#' },
  { id: 'nft', label: 'NFT', icon: Ticket, href: '#', badge: { text: 'New', type: 'new' } },
  { id: 'job', label: 'Job', icon: BriefcaseBusiness, href: '#' },
  { id: 'blog', label: 'Blog', icon: Rss, href: '#', badge: { text: 'New', type: 'new' } },
  {
    id: 'apps',
    label: 'Apps',
    icon: Grid3x3,
    children: [
      { id: 'app-calendar', label: 'Calendar', icon: AppWindow, href: '#' },
      { id: 'app-chat', label: 'Chat', icon: AppWindow, href: '#' },
    ],
  },
  {
    id: 'layouts',
    label: 'Layouts',
    icon: AppWindow,
    badge: { text: 'Hot', type: 'hot' },
    children: [
      { id: 'layout-horizontal', label: 'Horizontal', icon: ExternalLink, href: '#' },
    ],
  },
];

const pagesNavItems: NavItemProps[] = [
  {
    id: 'authentication',
    label: 'Authentication',
    icon: ShieldCheck,
    children: [{ id: 'auth-signin', label: 'Sign In', icon: ExternalLink, href: '#' }],
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileTextIcon,
    children: [{ id: 'pages-starter', label: 'Starter', icon: ExternalLink, href: '#' }],
  },
  { id: 'landing', label: 'Landing', icon: ImageIcon, href: '#' },
];

const componentsNavItems: NavItemProps[] = [
  {
    id: 'base-ui',
    label: 'Base UI',
    icon: SlidersHorizontal,
    children: [{ id: 'ui-alerts', label: 'Alerts', icon: ExternalLink, href: '#' }],
  },
  { id: 'advance-ui', label: 'Advance UI', icon: Palette, href: '#' },
  { id: 'widgets', label: 'Widgets', icon: Puzzle, href: '#' },
];

interface SidebarNavItemProps {
  item: NavItemProps;
  currentOpen, setCurrentOpen: (id: string | null) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, currentOpen, setCurrentOpen }) => {
  const isOpen = item.children && currentOpen === item.id;
  const Icon = item.icon;

  const handleToggle = useCallback(() => {
    if (item.children) {
      setCurrentOpen(isOpen ? null : item.id);
    }
  }, [item.id, item.children, isOpen, setCurrentOpen]);

  const itemBaseClasses = 'flex items-center p-2 space-x-3 rounded-md cursor-pointer';
  const itemHoverClasses = 'hover:bg-sidebar-foreground/10';
  const itemTextClasses = item.isActive && !item.children ? 'text-primary' : 'text-sidebar-foreground/80 hover:text-sidebar-foreground';
  const iconClasses = item.isActive && !item.children ? 'text-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground';

  if (item.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={(open) => setCurrentOpen(open ? item.id : null)} className="w-full">
        <CollapsibleTrigger asChild onClick={handleToggle}>
          <div className={cn(itemBaseClasses, itemHoverClasses, 'group w-full justify-between')}>
            <div className="flex items-center space-x-3">
              <Icon className={cn('h-5 w-5', isOpen ? 'text-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground')} />
              <span className={cn('text-sm font-medium', isOpen ? 'text-primary' : itemTextClasses)}>{item.label}</span>
            </div>
            <div className="flex items-center">
              {item.badge && (
                <Badge
                  variant="default"
                  className={cn(
                    'text-xs px-1.5 py-0.5',
                    item.badge.type === 'new' ? 'bg-green-500 text-white'
                      : item.badge.type === 'hot' ? 'bg-red-500 text-white' : 'bg-primary text-primary-foreground'
                  )}
                >
                  {item.badge.text}
                </Badge>
              )}
              <ChevronDown className={cn('h-4 w-4 ml-2 transform transition-transform duration-200', isOpen ? 'rotate-180 text-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground')} />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 mt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarNavItem key={child.id} item={child} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a href={item.href || '#'} className={cn(itemBaseClasses, itemHoverClasses, 'group')}>
      <Icon className={cn('h-5 w-5', iconClasses)} />
      <span className={cn('text-sm font-medium', itemTextClasses)}>{item.label}</span>
      {item.badge && (
        <Badge
          variant="default"
          className={cn(
            'ml-auto text-xs px-1.5 py-0.5',
            item.badge.type === 'new' ? 'bg-green-500 text-white'
              : item.badge.type === 'hot' ? 'bg-red-500 text-white' : 'bg-primary text-primary-foreground'
          )}
        >
          {item.badge.text}
        </Badge>
      )}
    </a>
  );
};

const SidebarNav: React.FC = () => {
  const [currentOpen, setCurrentOpen] = useState<string | null>('dashboards');

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground h-screen flex flex-col fixed top-0 left-0">
      <div className="h-16 flex items-center justify-center px-4 border-b border-sidebar-foreground/10">
        <h1 className="text-2xl font-bold text-primary">VELZON</h1>
      </div>

      <div className="flex items-center p-4 space-x-3 border-b border-sidebar-foreground/10">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-sidebar-foreground">Anna Adame</p>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-1">
          <p className="px-2 py-1 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">Menu</p>
          {navItemsData.map((item) => (
            <SidebarNavItem key={item.id} item={item} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} />
          ))}

          <p className="px-2 py-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">Pages</p>
          {pagesNavItems.map((item) => (
            <SidebarNavItem key={item.id} item={item} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} />
          ))}

          <p className="px-2 py-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">Components</p>
          {componentsNavItems.map((item) => (
            <SidebarNavItem key={item.id} item={item} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} />
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
