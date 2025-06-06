import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

const balanceData = [
  { name: 'Jan', revenue: 12000, expenses: 10000 },
  { name: 'Feb', revenue: 18000, expenses: 12000 },
  { name: 'Mar', revenue: 25000, expenses: 15000 },
  { name: 'Apr', revenue: 22000, expenses: 18000 },
  { name: 'May', revenue: 30000, expenses: 20000 },
  { name: 'Jun', revenue: 28000, expenses: 25000 },
  { name: 'Jul', revenue: 35000, expenses: 22000 },
  { name: 'Aug', revenue: 42000, expenses: 28000 },
  { name: 'Sep', revenue: 50000, expenses: 30000 },
  { name: 'Oct', revenue: 45000, expenses: 35000 },
  { name: 'Nov', revenue: 55000, expenses: 38000 },
  { name: 'Dec', revenue: 60000, expenses: 40000 },
];

const totalRevenue = balanceData.reduce((acc, item) => acc + item.revenue, 0);
const totalExpenses = balanceData.reduce((acc, item) => acc + item.expenses, 0);
const profitRatio = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue * 100) : 0;

interface BalanceOverviewChartProps {
  className?: string;
}

const BalanceOverviewChart: React.FC<BalanceOverviewChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('current-year');

  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <CardTitle className="text-base font-semibold">Balance Overview</CardTitle>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-baseline space-x-4 pt-2">
            <p><span className="text-2xl font-bold text-primary">{formatCurrency(totalRevenue)}</span> <span className="text-xs text-muted-foreground">Revenue</span></p>
            <p><span className="text-lg font-semibold text-destructive">{formatCurrency(totalExpenses)}</span> <span className="text-xs text-muted-foreground">Expenses</span></p>
            <p><span className="text-lg font-semibold text-green-600">{profitRatio.toFixed(1)}%</span> <span className="text-xs text-muted-foreground">Profit Ratio</span></p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F87171" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatCurrency} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              />
              <Legend verticalAlign="top" align="right" height={36} iconSize={10} wrapperStyle={{fontSize: '12px'}} />
              <Area type="monotone" dataKey="revenue" stroke="#34D399" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Revenue" dot={{ r: 3, strokeWidth: 1, fill: '#34D399' }} activeDot={{ r: 5, strokeWidth: 2 }} />
              <Area type="monotone" dataKey="expenses" stroke="#F87171" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} name="Expenses" dot={{ r: 3, strokeWidth: 1, fill: '#F87171' }} activeDot={{ r: 5, strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceOverviewChart;
