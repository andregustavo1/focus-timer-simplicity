
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Clock className="w-6 h-6 text-primary animate-pulse-gentle" />
    </div>
  );
};

export default Logo;
