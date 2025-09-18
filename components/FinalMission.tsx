
import React, { useState, useMemo } from 'react';
import TerminalWindow from './ui/TerminalWindow';

const FinalMission: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [faInput, setFaInput] = useState('');
  const [fbInput, setFbInput] = useState('');
  const [status, setStatus] = useState<'pending' | 'correct' | 'incorrect'>('pending');

  const g = 10; // m/s^2
  const conduitMass = 200 * 1000; // 200 tons in kg
  const droidMass = 100 * 1000; // 100 tons in kg

  const F_conduit = conduitMass * g;
  const F_droid = droidMass * g;

  const correctFb = useMemo(() => {
    // Sum of torques around A = 0
    // (F_droid * 2) + (F_conduit * 5) - (FB * 10) = 0
    // (1,000,000 * 2) + (2,000,000 * 5) = FB * 10
    // 2,000,000 + 10,000,000 = FB * 10
    // 12,000,000 = FB * 10
    return 1200000; // N
  }, [F_conduit, F_droid]);

  const correctFa = useMemo(() => {
    // Sum of forces = 0
    // FA + FB = F_droid + F_conduit
    // FA = (1,000,000 + 2,000,000) - 1,200,000
    const totalForce = F_droid + F_conduit;
    return totalForce - correctFb; // 1,800,000 N
  }, [F_conduit, F_droid, correctFb]);

  const handleSubmit = () => {
    const fa = parseFloat(faInput);
    const fb = parseFloat(fbInput);
    
    // Check with a 1% tolerance
    const isFaCorrect = Math.abs(fa - correctFa) < correctFa * 0.01;
    const isFbCorrect = Math.abs(fb - correctFb) < correctFb * 0.01;

    if (isFaCorrect && isFbCorrect) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
      setTimeout(() => setStatus('pending'), 3000); // Reset after 3 seconds
    }
  };

  return (
    <TerminalWindow title="MISIÓN FINAL: CRISIS EN EL CONDUCTO INA-73">
      <p className="text-red-400 font-bold animate-pulse">!!! ALERTA ROJA !!!</p>
      <p>Un conducto de plasma de 10 metros y 200 toneladas se ha desestabilizado. Sus dos pilares de soporte magnético, A y B, están descalibrados. Un Droide de Carga Pesada de 100 toneladas está atascado a 2 metros del pilar A, aplicando una tensión crítica.</p>
      <p>Tu Misión: Calcula las fuerzas de reacción exactas (F<sub className="text-xs">A</sub> y F<sub className="text-xs">B</sub>) en Newtons que los pilares deben generar para estabilizar el conducto. El tiempo es crítico antes de una brecha de contención.</p>
      <p className="text-sm text-yellow-300 mt-2">RECORDATORIO: Fuerza (N) = Masa (kg) × Gravedad Local (g = 10 m/s²)</p>
      
      {/* SDO Diagram */}
      <div className="my-8 p-4 bg-gray-900/50 rounded-lg text-center">
        <p className="text-sm text-cyan-300 mb-4">// SDE ACTIVO: CONDUCTO INA-73</p>
        <div className="relative w-full max-w-2xl h-40 mx-auto font-mono text-sm">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-400"></div>
            {/* Pillar A */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-8 bg-cyan-600"></div>
             <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-[150%] flex flex-col items-center">
                <span className="text-green-400 text-3xl">↑</span>
                <span>F<sub className="text-xs">A</sub></span>
            </div>
            {/* Pillar B */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-8 bg-cyan-600"></div>
             <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-[150%] flex flex-col items-center">
                <span className="text-green-400 text-3xl">↑</span>
                <span>F<sub className="text-xs">B</sub></span>
            </div>
            {/* Droid */}
            <div className="absolute top-1/2 left-[20%] -translate-x-1/2 translate-y-2 flex flex-col items-center">
                <span className="text-red-400 text-3xl">↓</span>
                <span>P<sub className="text-xs">droid</sub> (100t)</span>
                <span className="text-xs">@ 2m</span>
            </div>
            {/* Conduit Weight */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 flex flex-col items-center">
                <span className="text-orange-400 text-3xl">↓</span>
                <span>P<sub className="text-xs">viga</sub> (200t)</span>
                <span className="text-xs">@ 5m</span>
            </div>
        </div>
      </div>
      
      {/* Calculation Inputs */}
      <div className="flex justify-center items-center space-x-8 mt-6">
        <div className="flex flex-col items-center">
          <label htmlFor="fa" className="font-orbitron text-lg text-cyan-300">Fuerza del Pilar A (F<sub className="text-xs">A</sub>)</label>
          <input id="fa" type="number" value={faInput} onChange={e => setFaInput(e.target.value)} className="w-48 text-center bg-gray-900 border border-cyan-400 rounded p-2 text-xl mt-2" placeholder="Newtons" />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="fb" className="font-orbitron text-lg text-cyan-300">Fuerza del Pilar B (F<sub className="text-xs">B</sub>)</label>
          <input id="fb" type="number" value={fbInput} onChange={e => setFbInput(e.target.value)} className="w-48 text-center bg-gray-900 border border-cyan-400 rounded p-2 text-xl mt-2" placeholder="Newtons" />
        </div>
      </div>
      
      {status === 'incorrect' && <p className="text-center text-red-500 font-bold mt-4 animate-ping">!!! TENSIÓN ESTRUCTURAL CRÍTICA - RECALCULAR !!!</p>}

      {status !== 'correct' ? (
         <div className="text-center pt-8">
          <button onClick={handleSubmit} className="px-8 py-3 bg-green-600 text-white font-bold rounded-md text-lg hover:bg-green-500 transition-colors transform hover:scale-105">
            ACTIVAR PILARES MAGNÉTICOS
          </button>
        </div>
      ) : (
        <div className="text-center pt-8">
          <p className="text-green-400 text-2xl font-orbitron animate-pulse mb-4">CONDUCTO ESTABILIZADO. CATÁSTROFE EVITADA.</p>
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
          >
            PROCEDER AL INFORME
          </button>
        </div>
      )}
    </TerminalWindow>
  );
};

export default FinalMission;
