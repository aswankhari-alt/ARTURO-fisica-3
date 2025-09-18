
import React, { useState, useMemo } from 'react';
import TerminalWindow from './ui/TerminalWindow';

interface MassUnit {
  id: number;
  mass: number;
}

const massUnits: MassUnit[] = [
  { id: 1, mass: 1 },
  { id: 2, mass: 2 },
  { id: 3, mass: 5 },
];

const beamSlots = Array.from({ length: 10 }, (_, i) => i + 1); // 10 slots on each side

const MissionOne: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [leftSlots, setLeftSlots] = useState<(MassUnit | null)[]>(Array(10).fill(null));
  const [rightSlots, setRightSlots] = useState<(MassUnit | null)[]>(Array(10).fill(null));
  const [draggedMass, setDraggedMass] = useState<MassUnit | null>(null);
  const [isBalanced, setIsBalanced] = useState(false);
  const [isEquationCorrect, setIsEquationCorrect] = useState(false);

  const calculateTorque = (slots: (MassUnit | null)[]) => {
    return slots.reduce((total, massUnit, index) => {
      if (massUnit) {
        return total + massUnit.mass * (index + 1);
      }
      return total;
    }, 0);
  };

  const leftTorque = useMemo(() => calculateTorque(leftSlots), [leftSlots]);
  const rightTorque = useMemo(() => calculateTorque(rightSlots), [rightSlots]);

  const beamTilt = useMemo(() => {
    const diff = leftTorque - rightTorque;
    if (Math.abs(diff) < 0.01 && leftTorque > 0) {
      setIsBalanced(true);
      return 0;
    }
    setIsBalanced(false);
    return Math.max(-15, Math.min(15, diff * -2));
  }, [leftTorque, rightTorque]);

  const handleDragStart = (mass: MassUnit) => {
    setDraggedMass(mass);
  };

  const handleDrop = (side: 'left' | 'right', index: number) => {
    if (!draggedMass) return;
    if (side === 'left') {
      const newSlots = [...leftSlots];
      newSlots[index] = draggedMass;
      setLeftSlots(newSlots);
    } else {
      const newSlots = [...rightSlots];
      newSlots[index] = draggedMass;
      setRightSlots(newSlots);
    }
    setDraggedMass(null);
  };

  const handleEquationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const part1 = formData.get('part1')?.toString().trim().toUpperCase();
    const part2 = formData.get('part2')?.toString().trim().toUpperCase();
    const part3 = formData.get('part3')?.toString().trim().toUpperCase();
    if (part1 === 'VECTOR DE FUERZA' && part2 === 'BRAZO DE PALANCA' && part3 === 'EQUIVALENTE') {
      setIsEquationCorrect(true);
    } else {
      alert('Incorrecto. Revisa los principios de equilibrio.');
    }
  };

  return (
    <TerminalWindow title="MISIÓN 1: CALIBRACIÓN DEL GRAV-BEAM">
      <p>Calibra la interfaz del Holo-Simulador. Coloca las Unidades de Masa Calibrada (UMC) en la Viga de Luz Sólida para alcanzar el equilibrio. La interfaz muestra la distancia digital desde el Emisor de Punto Cero.</p>
      
      {/* Simulation Area */}
      <div className="my-8 p-4 bg-gray-900/50 rounded-lg select-none">
        {/* Beam */}
        <div className="flex justify-center items-start">
            <div className="flex flex-row-reverse">
                {beamSlots.map((_, i) => (
                    <div key={`left-${i}`} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop('left', i)} className="w-10 h-24 border-r border-cyan-700/50 flex justify-center items-end text-xs">{i+1}</div>
                ))}
            </div>
            <div className="w-2 h-24"></div>
            <div className="flex">
                 {beamSlots.map((_, i) => (
                    <div key={`right-${i}`} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop('right', i)} className="w-10 h-24 border-l border-cyan-700/50 flex justify-center items-end text-xs">{i+1}</div>
                ))}
            </div>
        </div>

        <div className="relative w-full h-12 flex justify-center">
            <div className="absolute bottom-0 w-1 h-8 bg-cyan-400"></div>
            <div className="w-[840px] h-2 bg-cyan-400 self-center rounded-full shadow-[0_0_10px_cyan]" style={{ transform: `rotate(${beamTilt}deg)`, transition: 'transform 0.5s ease-out' }}>
                <div className="absolute w-full h-full flex">
                    <div className="w-1/2 flex flex-row-reverse relative">
                        {leftSlots.map((mass, i) => mass && <div key={i} className="absolute bottom-2 bg-yellow-400 text-black w-8 h-8 rounded flex items-center justify-center font-bold" style={{right: `${(i * 40) + 1}px`}}>{mass.mass}</div>)}
                    </div>
                    <div className="w-1/2 relative">
                        {rightSlots.map((mass, i) => mass && <div key={i} className="absolute bottom-2 bg-yellow-400 text-black w-8 h-8 rounded flex items-center justify-center font-bold" style={{left: `${(i * 40) + 1}px`}}>{mass.mass}</div>)}
                    </div>
                </div>
            </div>
        </div>

        {/* Mass Units */}
        <div className="mt-8 flex justify-center space-x-4">
          <p className="self-center">UMCs disponibles:</p>
          {massUnits.map(mu => (
            <div
              key={mu.id}
              draggable
              onDragStart={() => handleDragStart(mu)}
              className="w-12 h-12 bg-yellow-400 text-black rounded-lg flex items-center justify-center font-bold text-xl cursor-grab active:cursor-grabbing"
            >
              {mu.mass}
            </div>
          ))}
           <button onClick={() => { setLeftSlots(Array(10).fill(null)); setRightSlots(Array(10).fill(null)); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-500">REINICIAR</button>
        </div>
        <div className="mt-4 text-center">
          <p>Torque Izquierdo: {leftTorque.toFixed(2)} | Torque Derecho: {rightTorque.toFixed(2)}</p>
          {isBalanced && <p className="text-green-400 font-bold animate-pulse text-lg mt-2">EQUILIBRIO ALCANZADO</p>}
        </div>
      </div>

      {isBalanced && (
        <div className="mt-6 p-4 border-t-2 border-cyan-400/50 animate-fadeIn">
          <h3 className="font-orbitron text-lg text-yellow-300">CONSULTA DEL SISTEMA: Patrón Reconocido</h3>
          <p>Completa la 'Ley de Paridad de Torque' para desbloquear el siguiente módulo del sistema.</p>
          <form onSubmit={handleEquationSubmit} className="mt-4 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-2 text-sm">
            <span>Para lograr la estabilidad rotacional, el producto del</span>
            <input name="part1" className="bg-gray-900 border border-cyan-400 rounded px-2 py-1 w-48" placeholder="[...]" />
            <span>y el</span>
            <input name="part2" className="bg-gray-900 border border-cyan-400 rounded px-2 py-1 w-48" placeholder="[...]" />
            <span>en un lado del pivote debe ser</span>
            <input name="part3" className="bg-gray-900 border border-cyan-400 rounded px-2 py-1 w-48" placeholder="[...]" />
            <span>al producto del otro lado.</span>
            <button type="submit" className="px-4 py-1 bg-green-500 text-black font-bold rounded hover:bg-green-400">ENVIAR</button>
          </form>
        </div>
      )}

      {isEquationCorrect && (
         <div className="text-center pt-4">
          <p className="text-green-400 mb-4">LEY CONFIRMADA. SUPERPOSICIÓN DE DIAGNÓSTICO DESBLOQUEADA.</p>
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
          >
            PROCEDER A LA SIGUIENTE MISIÓN
          </button>
        </div>
      )}
    </TerminalWindow>
  );
};

export default MissionOne;
