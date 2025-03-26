
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import TimerDisplay from '@/components/TimerDisplay';
import TimerControls from '@/components/TimerControls';
import TaskCategory, { TaskType } from '@/components/TaskCategory';
import SessionHistory, { Session } from '@/components/SessionHistory';
import { toast } from '@/components/ui/sonner';

interface MainTimerProps {
  className?: string;
}

const MainTimer: React.FC<MainTimerProps> = ({ className }) => {
  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Task state
  const [selectedTask, setSelectedTask] = useState<TaskType>('work');
  
  // Session history state
  const [sessions, setSessions] = useState<Session[]>(() => {
    const savedSessions = localStorage.getItem('timerSessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  
  // Current session start time
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // Format seconds to hours, minutes, seconds
  const formatTimeValues = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return { hours, minutes, seconds: secs };
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(sessions));
  }, [sessions]);

  // Timer controls
  const handleStart = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      
      // Record session start time if starting from 0
      if (seconds === 0) {
        setSessionStartTime(Date.now());
      }
      
      toast.success("Timer iniciado", {
        description: "Continue focado na sua tarefa",
        position: "bottom-center",
      });
    }
  }, [isRunning, seconds]);

  const handlePause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      toast.info("Timer pausado", {
        description: "Você pode continuar mais tarde",
        position: "bottom-center",
      });
    }
  }, [isRunning]);

  const handleReset = useCallback(() => {
    // Only save session if we have accumulated some time
    if (seconds > 0) {
      // Create new session
      const newSession: Session = {
        id: Date.now().toString(),
        taskType: selectedTask,
        duration: seconds,
        date: new Date().toISOString(),
      };
      
      setSessions(prevSessions => [newSession, ...prevSessions]);
      
      toast.success("Sessão registrada", {
        description: `Você foi focado por ${formatTimeValues(seconds).hours}h ${formatTimeValues(seconds).minutes}m ${formatTimeValues(seconds).seconds}s`,
        position: "bottom-center",
      });
    }
    
    // Reset the timer
    setIsRunning(false);
    setSeconds(0);
    setSessionStartTime(null);
  }, [seconds, selectedTask, formatTimeValues]);

  // Handle task selection
  const handleTaskSelect = useCallback((task: TaskType) => {
    setSelectedTask(task);
  }, []);

  // Extract time values
  const { hours, minutes, seconds: displaySeconds } = formatTimeValues(seconds);

  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4", className)}>
      <div className="w-full space-y-12">
        {/* Timer Display */}
        <div className="glass rounded-2xl p-8 mb-8 shadow-lg animate-fade-in">
          <TimerDisplay 
            hours={hours} 
            minutes={minutes} 
            seconds={displaySeconds} 
            className="mb-8"
          />
          
          <div className="space-y-6">
            <TaskCategory 
              selectedTask={selectedTask}
              onSelectTask={handleTaskSelect}
              className="mb-6"
            />
            
            <TimerControls 
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
            />
          </div>
        </div>
        
        {/* Session History */}
        <SessionHistory sessions={sessions} className="animate-slide-up" />
      </div>
    </div>
  );
};

export default MainTimer;
