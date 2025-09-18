
import React from 'react';
import TerminalWindow from './ui/TerminalWindow';

interface IntroductionProps {
  onComplete: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onComplete }) => {
  return (
    <TerminalWindow title="TRANSMISIÓN ENTRANTE // PRIORIDAD ALFA">
      <p className="text-yellow-300 animate-pulse">[ESTÁTICA]... ¿Cadete? ¿Puedes oírme? Soy la Oficial T'Val. La IA de estabilización de la estación... ha desaparecido. Un fallo completo del sistema.</p>
      <p>Las computadoras que gestionaban la integridad estructural están fuera de línea. Aegis VII se está desgarrando por la tensión de torsión. Todos nuestros sistemas avanzados son inútiles.</p>
      <p>Tu expediente dice que eres el único a bordo entrenado en los 'Principios Clásicos'. Física del viejo mundo. Es una posibilidad remota, pero es todo lo que tenemos.</p>
      <p>Te estoy conectando al Holo-Simulador de ingeniería. Necesitas calibrar manualmente los sistemas de soporte. El destino de miles de almas descansa en tus cálculos. No nos falles.</p>
      <div className="text-center pt-4">
        <button
          onClick={onComplete}
          className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
        >
          ACCEDER AL HOLO-SIMULADOR
        </button>
      </div>
    </TerminalWindow>
  );
};

export default Introduction;
