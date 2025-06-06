import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const chartData = [
  { name: 'Goal', value: 37, fill: '#38BDF8' }, // primary color
  { name: 'Pending Forecast', value: 12, fill: '#34D399' }, // a green color
  { name: 'Revenue', value: 18, fill: '#FBBF24' }, // an orange/yellow color
];

interface SalesForecastChartProps {
  className?: string;
}

const SalesForecastChart: React.FC<SalesForecastChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('nov-2021');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Sales Forecast</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-2021">Nov 2021</SelectItem>
            <SelectItem value="oct-2021">Oct 2021</SelectItem>
            <SelectItem value="q4-2021">Q4 2021</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              {/* <Tooltip cursor={{ fill: 'transparent' }} /> */}
              {/* The image implies a simple bar chart where each bar is a category itself not time series */}
              {/* Using horizontal bars to mimic the image, but with labels shown via legend. Image has vertical bars. Let's use vertical. */}
            </BarChart>
          </ResponsiveContainer>
          {/* Custom rendering for the specific visual style in the image - Recharts default BarChart might not directly replicate it */}
          {/* The image shows 3 vertical bars without X/Y axis labels, values inside bars.  */}
          <div className="flex justify-around items-end h-[250px] pt-4 border-t border-dashed mt-2">
            {chartData.map((item) => (
              <div key={item.name} className="flex flex-col items-center w-1/3 px-1">
                <div className="text-xs font-medium text-muted-foreground mb-1">{item.value}</div>
                <div 
                  className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{ height: `${item.value * 4.5}px`, backgroundColor: item.fill }}
                >
                </div>
              </div>
            ))}
          </div>
          <CardDescription className="text-center text-sm font-medium mt-2">Total Forecasted Value</CardDescription>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center">
              <span className="h-2.5 w-2.5 rounded-sm mr-1.5" style={{ backgroundColor: item.fill }}></span>
              {item.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesForecastChart;
