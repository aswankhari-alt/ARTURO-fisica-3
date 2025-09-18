
import React from 'react';

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-6 animate-fadeIn">
      <div className="flex justify-between items-center pb-3 mb-4 border-b border-cyan-400/30">
        <h2 className="text-xl sm:text-2xl font-orbitron text-cyan-400 tracking-widest">{title}</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="text-slate-200 text-base sm:text-lg leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
