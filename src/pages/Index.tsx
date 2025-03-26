
import React from 'react';
import Logo from '@/components/Logo';
import MainTimer from '@/components/MainTimer';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary/20">
      <header className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 w-full flex flex-col items-center justify-center py-10">
        <h1 className="font-mono text-2xl md:text-3xl font-light text-center mb-10 animate-fade-in tracking-wide">
          time to focus
        </h1>
        
        <MainTimer />
      </main>
      
      <footer className="w-full py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Mínimo Focus Timer &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
