import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  className
}) => {
  return (
    <div className={cn('flex items-center justify-between py-6 px-0', className)}>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {crumb.href ? (
              <a href={crumb.href} className="hover:text-primary">
                {crumb.label}
              </a>
            ) : (
              <span>{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
