
import React from 'react';
import TerminalWindow from './ui/TerminalWindow';

const KnowledgeModule: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <TerminalWindow title="CÓDICE: LOS PROTOCOLOS INQUEBRANTABLES">
      <p className="text-yellow-300">[Voz de la Oficial T'Val]: Buen trabajo, Cadete. Lo que acabas de demostrar son las leyes fundamentales de la estabilidad estructural. La IA se encargó de estos cálculos durante tanto tiempo que olvidamos lo vitales que son. Grábalas en tu memoria.</p>
      
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="font-orbitron text-cyan-300 text-lg">Momento de Torsión (Torque):</h3>
          <p className="ml-4 text-slate-300">La tendencia de un vector de fuerza a causar una rotación no deseada. Es la fuerza de torsión que puede desgarrar una estructura. Se calcula como Fuerza × Brazo de Palanca.</p>
        </div>
        
        <div>
          <h3 className="font-orbitron text-cyan-300 text-lg">Primera Condición de Equilibrio (Integridad Traslacional):</h3>
          <p className="ml-4 text-slate-300">La suma de todos los vectores de fuerza que actúan sobre un cuerpo debe ser cero para evitar el estrés por desgarro. El objeto no se acelerará linealmente. <span className="font-mono text-yellow-300">ΣF = 0</span>.</p>
        </div>
        
        <div>
          <h3 className="font-orbitron text-cyan-300 text-lg">Segunda Condición de Equilibrio (Estabilidad Rotacional):</h3>
          <p className="ml-4 text-slate-300">La suma de todos los Torques debe ser cero para evitar que la estructura se rompa girando sobre un punto débil. El objeto no se acelerará rotacionalmente. <span className="font-mono text-yellow-300">Στ = 0</span>.</p>
        </div>
      </div>

      <p className="mt-6 text-yellow-300">No son solo teorías abstractas, Cadete. Son lo único que mantiene unida esta estación en este momento. Prepárate para un diagnóstico del sistema en vivo. Esta vez es de verdad.</p>

      <div className="text-center pt-6">
        <button
          onClick={onComplete}
          className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
        >
          PROCEDER AL DIAGNÓSTICO EN VIVO
        </button>
      </div>
    </TerminalWindow>
  );
};

export default KnowledgeModule;
