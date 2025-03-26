
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {!isRunning ? (
        <Button 
          onClick={onStart} 
          size="lg" 
          className="rounded-full w-16 h-16 text-primary-foreground backdrop-blur-sm hover:bg-primary/110 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 animate-scale-in"
          aria-label="Start timer"
        >
          <Play size={24} className="ml-1" />
        </Button>
      ) : (
        <Button 
          onClick={onPause} 
          size="lg" 
          className="rounded-full w-16 h-16 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 animate-scale-in"
          aria-label="Pause timer"
        >
          <Pause size={24} />
        </Button>
      )}
      
      <Button 
        onClick={onReset} 
        size="lg" 
        variant="outline" 
        className="rounded-full w-12 h-12 border border-border/60 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        aria-label="Reset timer"
      >
        <RefreshCw size={18} />
      </Button>
    </div>
  );
};

export default TimerControls;
