import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  representative: {
    name: string;
    avatarUrl: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    representative: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/32?u=donald' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    representative: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/32?u=sofia' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    representative: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/32?u=luis' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    representative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/32?u=vitoria' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Nova Industries',
    lastContacted: 'Oct 02, 2021',
    representative: { name: 'Pedro Alvares', avatarUrl: 'https://i.pravatar.cc/32?u=pedro' },
    status: 'Negotiation' as const,
    dealValue: '$250K',
  },
];

const getStatusBadgeClass = (status: Deal['status']) => {
  switch (status) {
    case 'Deal Won':
      return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
    case 'Intro Call':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200';
    case 'Stuck':
      return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200';
    case 'Negotiation':
      return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
  }
};

interface DealsStatusTableProps {
  className?: string;
}

const DealsStatusTable: React.FC<DealsStatusTableProps> = ({ className }) => {
  const [dateRange, setDateRange] = React.useState<string>('nov-dec-2021');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">Deals Status</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[220px] h-8 text-xs">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct-2021">October 2021</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Last Contacted</TableHead>
              <TableHead className="text-xs">Sales Representative</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs text-right">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium text-sm py-3">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm py-3">{deal.lastContacted}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={deal.representative.avatarUrl} alt={deal.representative.name} />
                      <AvatarFallback>{deal.representative.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.representative.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge variant="outline" className={cn('text-xs capitalize', getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-sm py-3">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsStatusTable;
