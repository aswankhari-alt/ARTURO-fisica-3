
import React, { useState, useCallback } from 'react';
import { GamePhase } from './types';
import Introduction from './components/Introduction';
import MissionOne from './components/MissionOne';
import MissionTwo from './components/MissionTwo';
import KnowledgeModule from './components/KnowledgeModule';
import FinalMission from './components/FinalMission';
import Debriefing from './components/Debriefing';

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.INTRO);

  const advancePhase = useCallback(() => {
    setGamePhase(prevPhase => {
      const phases = Object.values(GamePhase);
      const currentIndex = phases.indexOf(prevPhase);
      return (phases[currentIndex + 1] || GamePhase.END) as GamePhase;
    });
  }, []);

  const renderPhase = () => {
    switch (gamePhase) {
      case GamePhase.INTRO:
        return <Introduction onComplete={advancePhase} />;
      case GamePhase.MISSION_1:
        return <MissionOne onComplete={advancePhase} />;
      case GamePhase.MISSION_2:
        return <MissionTwo onComplete={advancePhase} />;
      case GamePhase.KNOWLEDGE:
        return <KnowledgeModule onComplete={advancePhase} />;
      case GamePhase.FINAL_MISSION:
        return <FinalMission onComplete={advancePhase} />;
      case GamePhase.DEBRIEFING:
        return <Debriefing onComplete={advancePhase} />;
      case GamePhase.END:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-orbitron text-green-400 mb-4">AEGIS VII ESTABILIZADA</h1>
            <p className="text-lg text-cyan-200">Tu comprensión de la mecánica clásica ha salvado miles de vidas. Ya no eres solo un cadete... eres El Último Ingeniero.</p>
             <button
              onClick={() => setGamePhase(GamePhase.INTRO)}
              className="mt-8 px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
            >
              REINICIAR SIMULACIÓN
            </button>
          </div>
        );
      default:
        return <div>Fase desconocida</div>;
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen text-white p-4 sm:p-8 flex items-center justify-center bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center">
      <div className="w-full max-w-5xl bg-black/70 backdrop-blur-md border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 p-6 sm:p-8">
        {renderPhase()}
      </div>
    </main>
  );
};

export default App;
