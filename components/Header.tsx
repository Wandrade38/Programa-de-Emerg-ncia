
import React from 'react';
import { HeartPulseIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl text-center py-4">
      <div className="flex items-center justify-center gap-4">
        <HeartPulseIcon className="w-12 h-12 text-red-500" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
          Ajuda Rápida
        </h1>
      </div>
      <p className="mt-2 text-lg text-slate-300">Seu assistente de emergência pessoal</p>
    </header>
  );
};

export default Header;
