
import React, { useState } from 'react';
import TerminalWindow from './ui/TerminalWindow';

const options = [
  "Porque el Pilar A es tecnológicamente más avanzado que el Pilar B.",
  "Porque el peso adicional del droide estaba mucho más cerca del Pilar A, éste tuvo que ejercer una mayor fuerza de reacción para contrarrestar tanto el peso directo como el momento de torsión generado.",
  "Porque la masa del conducto estaba distribuida de manera desigual, concentrándose cerca del Pilar A.",
  "Porque el Pilar B estaba fallando, forzando al Pilar A a compensar la carga."
];

const correctIndex = 1;

const Debriefing: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selectedIndex === correctIndex;

  return (
    <TerminalWindow title="INFORME DE MISIÓN">
      <p className="text-yellow-300">[Voz de la Oficial T'Val]: Cadete, tu desempeño fue ejemplar. La estación está estable, gracias a ti. Una última pregunta para completar tu informe. Tu comprensión es crucial para futuras reparaciones.</p>
      
      <div className="mt-6 p-4 border-t-2 border-cyan-400/50">
        <h3 className="font-orbitron text-lg text-white">Pregunta: Analiza el resultado. ¿Por qué el Pilar A soportó una carga significativamente mayor que el Pilar B?</h3>
        <div className="mt-4 space-y-3">
          {options.map((option, index) => (
            <div key={index}>
              <button
                onClick={() => !submitted && setSelectedIndex(index)}
                className={`w-full text-left p-3 rounded border-2 text-base transition-all duration-300 ${
                  selectedIndex === index 
                    ? 'bg-cyan-700 border-cyan-400' 
                    : 'bg-slate-800 border-slate-600 hover:bg-slate-700'
                } ${
                  submitted && (index === correctIndex ? 'bg-green-700 border-green-400' : selectedIndex === index ? 'bg-red-700 border-red-400' : '')
                }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {!submitted ? (
        <div className="text-center pt-6">
          <button
            onClick={() => setSubmitted(true)}
            disabled={selectedIndex === null}
            className="px-8 py-3 bg-yellow-600 text-white font-bold rounded-md text-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            ENVIAR ANÁLISIS
          </button>
        </div>
      ) : (
        <div className="text-center pt-6">
          <p className={`font-bold text-xl mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'ANÁLISIS CORRECTO. Felicitación añadida a tu expediente.' : 'ANÁLISIS INCORRECTO. Revisa los principios de torque.'}
          </p>
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
          >
            FINALIZAR SIMULACIÓN
          </button>
        </div>
      )}
    </TerminalWindow>
  );
};

export default Debriefing;
