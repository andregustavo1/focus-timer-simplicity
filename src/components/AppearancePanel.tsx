
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

const THEME_OPTIONS = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
];

const COLOR_OPTIONS = [
  { value: 'red', label: 'Vermelho', class: 'bg-red-500' },
  { value: 'orange', label: 'Laranja', class: 'bg-orange-500' },
  { value: 'yellow', label: 'Amarelo', class: 'bg-yellow-500' },
  { value: 'green', label: 'Verde', class: 'bg-green-500' },
  { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
  { value: 'purple', label: 'Roxo', class: 'bg-purple-500' },
];

const AppearancePanel = () => {
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Configurações de aparência</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Aparência</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tema</h3>
            <ToggleGroup 
              type="single" 
              value={theme} 
              onValueChange={(value) => value && setTheme(value as 'light' | 'dark')}
              className="justify-start"
            >
              {THEME_OPTIONS.map((option) => (
                <ToggleGroupItem 
                  key={option.value} 
                  value={option.value}
                  className="flex-1"
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Cor</h3>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.value}
                  className={`${color.class} w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-offset-2 ring-offset-background ${primaryColor === color.value ? 'ring-primary' : 'ring-transparent'}`}
                  onClick={() => setPrimaryColor(color.value)}
                  title={color.label}
                >
                  {primaryColor === color.value && (
                    <span className="h-2 w-2 bg-white rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppearancePanel;
