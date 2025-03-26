
import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskType } from '@/components/TaskCategory';

export interface Session {
  id: string;
  taskType: TaskType;
  duration: number; // duration in seconds
  date: string;
}

interface SessionHistoryProps {
  sessions: Session[];
  className?: string;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({
  sessions,
  className
}) => {
  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    return [
      h > 0 ? h.toString().padStart(2, '0') : '00',
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0')
    ].join(':');
  };

  // Translate task type to Portuguese
  const translateTaskType = (type: TaskType) => {
    const translations = {
      work: 'Trabalho',
      study: 'Estudo',
      personal: 'Pessoal'
    };
    return translations[type];
  };

  return (
    <div className={cn("w-full max-w-md m-auto", className)}>
      <h2 className="text-lg font-medium mb-3 text-center">Histórico de Sessões</h2>
      
      {sessions.length === 0 ? (
        <div className="text-center text-muted-foreground text-sm py-6 animate-pulse ">
          Suas sessões aparecerão aqui
        </div>
      ) : (
        <ScrollArea className="h-[600px] w-full rounded-lg border p-4 bg-[--secondary-bg]">
          <div className="space-y-3 ">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-[--primary-bg] backdrop-blur-sm border border-border/40 shadow-sm animate-slide-up"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{formatTime(session.duration)}</span>
                  <span className="text-xs text-muted-foreground">{new Date(session.date).toLocaleString('pt-BR')}</span>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/90">
                  {translateTaskType(session.taskType)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SessionHistory;
