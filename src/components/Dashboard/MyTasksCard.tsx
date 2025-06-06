import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: '1',
    description: 'Review and make sure nothing slips through cracks',
    dueDate: '15 Sep, 2021',
    completed: false,
  },
  {
    id: '2',
    description: 'Send meeting invites for sales upcampaign',
    dueDate: '20 Sep, 2021',
    completed: true,
  },
  {
    id: '3',
    description: 'Weekly closed sales won checking with sales team',
    dueDate: '24 Sep, 2021',
    completed: false,
  },
  {
    id: '4',
    description: 'Add notes that can be viewed from the individual view',
    dueDate: '27 Sep, 2021',
    completed: false,
  },
  {
    id: '5',
    description: 'Move stuff to another page',
    dueDate: '30 Sep, 2021',
    completed: true,
  },
   {
    id: '6',
    description: 'Follow up with leads from last week conference',
    dueDate: '02 Oct, 2021',
    completed: false,
  },
   {
    id: '7',
    description: 'Prepare Q4 sales report',
    dueDate: '05 Oct, 2021',
    completed: false,
  },
];

interface MyTasksCardProps {
  className?: string;
}

const MyTasksCard: React.FC<MyTasksCardProps> = ({ className }) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const handleToggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const remainingTasksCount = tasks.length - completedTasksCount;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="text-base font-semibold">My Tasks</CardTitle>
            <CardDescription className="text-xs">{remainingTasksCount} of {tasks.length} remaining</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-8 text-xs">
                <Plus className="h-4 w-4 mr-1.5" /> Add Task
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <ul className="space-y-3">
            {tasks.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() ).map((task) => (
              <li key={task.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted/50">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  className="mt-1 shrink-0"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={cn(
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                      task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    )}
                  >
                    {task.description}
                  </label>
                  <p className={cn('text-xs mt-0.5', task.completed ? 'text-muted-foreground/70' : 'text-muted-foreground')}>{task.dueDate}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MyTasksCard;
