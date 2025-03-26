
import React from 'react';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  hours, 
  minutes, 
  seconds,
  className
}) => {
  // Format the time values to always be two digits
  const formatNumber = (num: number) => String(num).padStart(2, '0');
  
  return (
    <div className={cn("flex items-center justify-center gap-2 font-mono tracking-tight", className)}>
      <div className="flex flex-col items-center">
        <span className="text-7xl md:text-8xl lg:text-9xl font-light animate-fade-in">
          {formatNumber(hours)}
        </span>
        <span className="text-xs uppercase tracking-widest opacity-60 mt-1">horas</span>
      </div>
      <div className="text-5xl md:text-6xl lg:text-7xl font-light opacity-60 -mt-5">:</div>
      <div className="flex flex-col items-center">
        <span className="text-7xl md:text-8xl lg:text-9xl font-light animate-fade-in">
          {formatNumber(minutes)}
        </span>
        <span className="text-xs uppercase tracking-widest opacity-60 mt-1">minutos</span>
      </div>
      <div className="text-5xl md:text-6xl lg:text-7xl font-light opacity-60 -mt-5">:</div>
      <div className="flex flex-col items-center">
        <span className="text-7xl md:text-8xl lg:text-9xl font-light animate-fade-in">
          {formatNumber(seconds)}
        </span>
        <span className="text-xs uppercase tracking-widest opacity-60 mt-1">segundos</span>
      </div>
    </div>
  );
};

export default TimerDisplay;
