
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import AppearancePanel from './AppearancePanel';
import { toast } from 'sonner';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
        aria-label="Alternar tema"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
      <AppearancePanel />
    </div>
  );
};

export default ThemeToggle;
