
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
  { value: 'red' as const, label: 'Vermelho', class: 'bg-red-600' },
  { value: 'orange' as const, label: 'Laranja', class: 'bg-orange-600' },
  { value: 'yellow' as const, label: 'Amarelo', class: 'bg-yellow-500' },
  { value: 'green' as const, label: 'Verde', class: 'bg-lime-500' },
  { value: 'blue' as const, label: 'Azul', class: 'bg-[#2563eb]' },
  { value: 'purple' as const, label: 'Roxo', class: 'bg-[#883ceb]' },
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
      <SheetContent className="w-[250px] sm:w-[300px] rounded-md border-none">
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
            <div className="flex justify-between">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.value}
                  className={`${color.class} w-7 h-7 rounded-full flex items-center justify-center ring-2 ring-offset-2 ring-offset-background ${primaryColor === color.value ? 'ring-primary' : 'ring-transparent'}`}
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
