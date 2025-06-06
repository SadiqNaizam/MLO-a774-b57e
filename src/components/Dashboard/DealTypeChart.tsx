import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';

const dealTypeData = [
  { subject: '2016', Pending: 80, Loss: 30, Won: 70, fullMark: 100 },
  { subject: '2017', Pending: 60, Loss: 70, Won: 90, fullMark: 100 },
  { subject: '2018', Pending: 50, Loss: 85, Won: 60, fullMark: 100 },
  { subject: '2019', Pending: 75, Loss: 40, Won: 50, fullMark: 100 },
  { subject: '2020', Pending: 90, Loss: 60, Won: 80, fullMark: 100 },
  { subject: '2021', Pending: 65, Loss: 50, Won: 75, fullMark: 100 },
];

interface DealTypeChartProps {
  className?: string;
}

const DealTypeChart: React.FC<DealTypeChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('monthly');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Deal Type</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <defs>
                <radialGradient id="pendingGradient">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.1}/>
                </radialGradient>
                 <radialGradient id="lossGradient">
                  <stop offset="0%" stopColor="#F87171" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#F87171" stopOpacity={0.1}/>
                </radialGradient>
                 <radialGradient id="wonGradient">
                  <stop offset="0%" stopColor="#34D399" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#34D399" stopOpacity={0.1}/>
                </radialGradient>
              </defs>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              <Radar name="Pending" dataKey="Pending" stroke="#FBBF24" fill="url(#pendingGradient)" fillOpacity={1} strokeWidth={2}/>
              <Radar name="Loss" dataKey="Loss" stroke="#F87171" fill="url(#lossGradient)" fillOpacity={1} strokeWidth={2}/>
              <Radar name="Won" dataKey="Won" stroke="#34D399" fill="url(#wonGradient)" fillOpacity={1} strokeWidth={2}/>
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealTypeChart;
