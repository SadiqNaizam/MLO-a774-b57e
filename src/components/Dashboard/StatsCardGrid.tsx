import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, DollarSign, TrendingUp, BadgeDollarSign, Heart, ArrowUpRight, ArrowDownLeft, HelpCircle } from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  statusColor?: 'green' | 'red';
}

const statsData: StatCardData[] = [
  {
    id: 'campaignSent',
    title: 'CAMPAIGN SENT',
    value: '197',
    icon: Send,
    iconBgColor: 'bg-sky-100 dark:bg-sky-900',
    statusColor: 'green',
  },
  {
    id: 'annualProfit',
    title: 'ANNUAL PROFIT',
    value: '$489.4k',
    icon: DollarSign,
    iconBgColor: 'bg-yellow-100 dark:bg-yellow-900',
    statusColor: 'green',
  },
  {
    id: 'leadConversation',
    title: 'LEAD CONVERSATION',
    value: '32.89%',
    icon: TrendingUp,
    iconBgColor: 'bg-red-100 dark:bg-red-900',
    trend: { value: '32.89%', direction: 'down' }, // Example, image shows simple value
    statusColor: 'red',
  },
  {
    id: 'dailyAverageIncome',
    title: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    icon: BadgeDollarSign,
    iconBgColor: 'bg-green-100 dark:bg-green-900',
    statusColor: 'green',
  },
  {
    id: 'annualDeals',
    title: 'ANNUAL DEALS',
    value: '2,659',
    icon: Heart,
    iconBgColor: 'bg-purple-100 dark:bg-purple-900',
    statusColor: 'red',
  },
];

interface StatCardProps {
  data: StatCardData;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ data, className }) => {
  const Icon = data.icon || HelpCircle;
  const TrendIcon = data.trend?.direction === 'up' ? ArrowUpRight : data.trend?.direction === 'down' ? ArrowDownLeft : null;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-xs font-medium uppercase text-muted-foreground">
          {data.title}
        </CardTitle>
        {data.statusColor && (
          <div className={cn(
            'h-3 w-3 rounded-full',
            data.statusColor === 'green' ? 'bg-green-500' : 'bg-red-500'
          )}></div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className={cn('p-3 rounded-md', data.iconBgColor) }>
            <Icon className={cn('h-6 w-6', 
                data.iconBgColor.includes('sky') ? 'text-sky-500' :
                data.iconBgColor.includes('yellow') ? 'text-yellow-500' :
                data.iconBgColor.includes('red') ? 'text-red-500' :
                data.iconBgColor.includes('green') ? 'text-green-500' :
                data.iconBgColor.includes('purple') ? 'text-purple-500' :
                'text-foreground'
            )} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{data.value}</div>
            {data.trend && TrendIcon && (
              <p className={cn(
                'text-xs text-muted-foreground flex items-center',
                data.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                <TrendIcon className="h-3 w-3 mr-1" />
                {data.trend.value} vs last month
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5', className)}>
      {statsData.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
};

export default StatsCardGrid;
