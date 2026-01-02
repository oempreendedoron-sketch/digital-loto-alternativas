
import React from 'react';
import { Lottery, Page } from '../types';

interface LotteryCardProps {
  lottery: Lottery;
  onSelect: (lottery: Lottery, page: Page) => void;
}

const LotteryCard: React.FC<LotteryCardProps> = ({ lottery, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-4 flex-grow">
        <h3 className={`text-center font-bold text-lg ${lottery.textColor}`}>{lottery.name}</h3>
        <p className="text-center text-gray-800 text-2xl font-bold my-2">{lottery.prize}</p>
      </div>
      <div className="flex">
        <button 
          onClick={() => onSelect(lottery, 'betting')}
          className={`w-1/2 ${lottery.color} text-white font-semibold py-3 hover:opacity-90 transition-opacity duration-200`}>
            Apostar
        </button>
        <button 
          onClick={() => onSelect(lottery, 'simulator')}
          className="w-1/2 bg-gray-200 text-gray-700 font-semibold py-3 hover:bg-gray-300 transition-colors duration-200">
            Simular
        </button>
      </div>
    </div>
  );
};

export default LotteryCard;
