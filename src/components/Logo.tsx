
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Clock className="w-5 h-5 text-primary animate-pulse-gentle" />
      <span className="font-medium text-lg tracking-tight">mínimo</span>
    </div>
  );
};

export default Logo;
