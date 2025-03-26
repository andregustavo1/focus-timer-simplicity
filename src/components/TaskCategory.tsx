
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type TaskType = 'work' | 'study' | 'personal';

interface TaskCategoryProps {
  selectedTask: TaskType;
  onSelectTask: (task: TaskType) => void;
  className?: string;
}

const TaskCategory: React.FC<TaskCategoryProps> = ({
  selectedTask,
  onSelectTask,
  className
}) => {
  const tasks: { type: TaskType; label: string }[] = [
    { type: 'work', label: 'Trabalho' },
    { type: 'study', label: 'Estudo' },
    { type: 'personal', label: 'Pessoal' }
  ];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground mb-1">Categoria:</span>
      <div className="flex gap-2 flex-wrap justify-center">
        {tasks.map((task) => (
          <Button
            key={task.type}
            variant={selectedTask === task.type ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectTask(task.type)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-all duration-300 transform hover:scale-105 active:scale-95",
              selectedTask === task.type 
                ? "bg-primary/90 text-primary-foreground shadow-md" 
                : "bg-background/50 backdrop-blur-sm border-border/60 text-foreground/80 hover:text-foreground"
            )}
          >
            {task.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TaskCategory;
