
import React from 'react';

interface EmergencyButtonProps {
  onClick: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 animate-pulse-slow"
      aria-label="Botão de emergência"
    >
      <span className="absolute h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
      <div className="relative z-10 text-white text-3xl sm:text-4xl font-extrabold tracking-wider uppercase">
        SOS
      </div>
    </button>
  );
};

// Add custom animation to tailwind config if possible, or use a style tag.
// For simplicity in this environment, we'll rely on existing animations, but a custom `tailwind.config.js` would look like:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  }
}
*/
export default EmergencyButton;
