
import React from 'react';
import { Lottery, Page } from '../types';

interface HeroProps {
    lottery: Lottery;
    onPlay: (lottery: Lottery, page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ lottery, onPlay }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden my-8 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left max-w-lg">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 drop-shadow-sm">
                Com apenas R$1,00 você aposta com mais Números e pode Faturar até R$45.000,00 💰
            </h1>
             <div className="space-y-3 text-left">
                <p className="flex items-center text-base md:text-lg text-gray-700"><span className="text-2xl mr-3">🟣</span> <strong className="text-purple-600 mr-2">LOTOFÁCIL</strong> até 22 números.</p>
                <p className="flex items-center text-base md:text-lg text-gray-700"><span className="text-2xl mr-3">🟠</span> <strong className="text-orange-500 mr-2">LOTOMANIA</strong> até 85 números.</p>
                <p className="flex items-center text-base md:text-lg text-gray-700"><span className="text-2xl mr-3">🔵</span> <strong className="text-blue-800 mr-2">QUINA</strong> até 45 números.</p>
                <p className="flex items-center text-base md:text-lg text-gray-700"><span className="text-2xl mr-3">🟢</span> <strong className="text-green-500 mr-2">MEGA SENA</strong> até 40 números.</p>
                <p className="flex items-center text-base md:text-lg text-gray-700"><span className="text-2xl mr-3">🟡</span> <strong className="text-yellow-500 mr-2">DIA DE SORTE</strong> até 21 números.</p>
            </div>
        </div>

        <div className={`flex-shrink-0 text-white ${lottery.color} rounded-2xl px-6 py-4 text-center transform md:scale-110`}>
          <h2 className="text-2xl font-bold">{lottery.name}</h2>
          <p className="text-5xl md:text-6xl font-extrabold tracking-tighter my-2">{lottery.prize}</p>
        </div>

        <div className="flex flex-col items-center">
          <button 
            onClick={() => onPlay(lottery, 'betting')}
            className="mt-4 w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            APOSTAR AGORA
          </button>
          <p className="text-sm text-gray-500 mt-2">Sorteio hoje, às 21h no horário de Brasília.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
