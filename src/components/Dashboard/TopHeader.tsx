import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Menu,
  Search,
  Bell,
  Maximize,
  Moon,
  Sun, // For theme toggle example
  Grid3x3,
  Settings,
  LogOut,
  User
} from 'lucide-react';

// Mock theme toggle state
let isDarkMode = false;
const toggleDarkMode = () => { isDarkMode = !isDarkMode; console.log('Dark mode toggled:', isDarkMode); }; 

interface TopHeaderProps {
  onToggleSidebar?: () => void;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar, className }) => {
  // Placeholder states and handlers
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [currentLanguage, setCurrentLanguage] = React.useState<{name: string; flag: string;}>({name: 'English', flag: '🇺🇸'});

  const languages = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Español', flag: '🇪🇸' },
    { name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <header className={cn('h-16 bg-card border-b flex items-center justify-between px-6 fixed top-0 right-0 z-40', className)} style={{left: '16rem'}}> {/* left: w-64 from sidebar */}
      <div className="flex items-center">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4 lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="relative  hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-64 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <span className="text-xl">{currentLanguage.flag}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.name} onClick={() => setCurrentLanguage(lang)}>
                <span className="mr-2 text-lg">{lang.flag}</span> {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Apps Button */}
        <Button variant="ghost" size="icon">
          <Grid3x3 className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New user registered</DropdownMenuItem>
            <DropdownMenuItem>Server #1 overloaded.</DropdownMenuItem>
            <DropdownMenuItem>Your subscription is expiring soon.</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fullscreen Toggle */}
        <Button variant="ghost" size="icon" onClick={() => console.log('Fullscreen toggled')}>
          <Maximize className="h-5 w-5" />
        </Button>

        {/* Dark Mode Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/32?u=annaadame" alt="Anna Adame" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
