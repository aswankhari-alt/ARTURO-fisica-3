
import React, { useState } from 'react';
import TerminalWindow from './ui/TerminalWindow';

const MissionTwo: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [labels, setLabels] = useState({
    force1: '', // Left Mass
    force2: '', // Right Mass
    reaction: '', // Fulcrum
  });
  const [isCorrect, setIsCorrect] = useState(false);

  const checkLabels = () => {
    const f1 = labels.force1.trim().toLowerCase();
    const f2 = labels.force2.trim().toLowerCase();
    const r = labels.reaction.trim().toLowerCase();
    
    // Accept a few variations
    const isF1Correct = f1 === 'fuerza' || f1 === 'peso' || f1 === 'umc';
    const isF2Correct = f2 === 'fuerza' || f2 === 'peso' || f2 === 'umc';
    const isRCorrect = r === 'reacción' || r === 'fuerza de reacción' || r === 'fuerza normal';

    if (isF1Correct && isF2Correct && isRCorrect) {
      setIsCorrect(true);
      alert('SUPERPOSICIÓN DE DIAGNÓSTICO CALIBRADA. TODOS LOS VECTORES CONTABILIZADOS.');
    } else {
      alert('ETIQUETAS INCORRECTAS DETECTADAS. Re-evalúa las fuerzas que actúan sobre el sistema.');
    }
  };

  return (
    <TerminalWindow title="MISIÓN 2: EL ESQUEMA DE DIAGNÓSTICO">
      <p>Activa la Superposición de Diagnóstico Estructural (SDE) en una grabación de tu solución anterior. La SDE es el equivalente moderno de un 'Diagrama de Cuerpo Libre'. Etiqueta correctamente cada vector de fuerza para demostrar tu comprensión.</p>
      
      <div className="my-8 p-4 bg-gray-900/50 rounded-lg flex flex-col items-center">
        <p className="text-sm text-cyan-300 mb-4">// SDE ACTIVA: Mostrando vectores de fuerza en un sistema equilibrado.</p>
        <div className="relative w-[500px] h-40">
          {/* Beam Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-400"></div>
          
          {/* Fulcrum and Reaction Force */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-green-400"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="flex flex-col items-center">
                <span className="text-green-300 text-2xl">↑</span>
                <input value={labels.reaction} onChange={e => setLabels({...labels, reaction: e.target.value})} className="bg-transparent border rounded px-1 w-28 text-center" placeholder="Reacción (?)" />
            </div>
          </div>

          {/* Left Force */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2">
             <div className="flex flex-col items-center">
                <input value={labels.force1} onChange={e => setLabels({...labels, force1: e.target.value})} className="bg-transparent border rounded px-1 w-28 text-center" placeholder="Fuerza (?)" />
                <span className="text-red-400 text-2xl">↓</span>
                <span className="text-sm">UMC</span>
            </div>
          </div>

          {/* Right Force */}
           <div className="absolute top-1/2 left-3/4 -translate-x-1/2">
             <div className="flex flex-col items-center">
                <input value={labels.force2} onChange={e => setLabels({...labels, force2: e.target.value})} className="bg-transparent border rounded px-1 w-28 text-center" placeholder="Fuerza (?)" />
                <span className="text-red-400 text-2xl">↓</span>
                <span className="text-sm">UMC</span>
            </div>
          </div>
        </div>
      </div>
      
      {!isCorrect ? (
         <div className="text-center pt-4">
          <button
            onClick={checkLabels}
            className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 transition-colors"
          >
            CONFIRMAR ETIQUETAS
          </button>
        </div>
      ) : (
        <div className="text-center pt-4">
          <p className="text-green-400 mb-4">Comprensión de SDE Confirmada. Accediendo a la Base de Datos de Principios Fundamentales.</p>
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
          >
            ACCEDER A LA BASE DE DATOS
          </button>
        </div>
      )}
    </TerminalWindow>
  );
};

export default MissionTwo;
