
import { useState, useEffect, createContext, useContext } from 'react';

type Theme = 'light' | 'dark';
type PrimaryColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (color: PrimaryColor) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Tenta recuperar o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Se não existir, verifica a preferência do sistema
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
  });

  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    const savedColor = localStorage.getItem('primaryColor') as PrimaryColor;
    return savedColor || 'orange';
  });

  useEffect(() => {
    // Salva o tema no localStorage sempre que ele mudar
    localStorage.setItem('theme', theme);
    
    // Aplica a classe 'dark' ao elemento HTML quando o tema for escuro
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Salva a cor primária no localStorage
    localStorage.setItem('primaryColor', primaryColor);
    
    // Remove todas as classes de cor primária
    document.documentElement.classList.remove(
      'theme-red', 'theme-orange', 'theme-yellow', 
      'theme-green', 'theme-blue', 'theme-purple'
    );
    
    // Adiciona a classe para a cor selecionada
    document.documentElement.classList.add(`theme-${primaryColor}`);
  }, [primaryColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
