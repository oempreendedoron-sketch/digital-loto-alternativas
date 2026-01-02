
import React from 'react';
import { Lottery } from '../types';

interface BettingGridProps {
  lottery: Lottery;
  selectedNumbers: number[];
  onNumberSelect: (n: number) => void;
  disabled?: boolean;
}

const BettingGrid: React.FC<BettingGridProps> = ({ lottery, selectedNumbers, onNumberSelect, disabled = false }) => {
  const numbers = Array.from({ length: lottery.totalNumbers }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-4 bg-gray-100 rounded-lg">
      {numbers.map(n => {
        const isSelected = selectedNumbers.includes(n);
        return (
          <button
            key={n}
            disabled={disabled}
            onClick={() => onNumberSelect(n)}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200
              ${isSelected
                ? `${lottery.color} text-white shadow-md transform scale-105`
                : 'bg-white text-gray-700 hover:bg-gray-200'
              }
              ${disabled ? 'cursor-not-allowed opacity-70' : ''}
            `}
          >
            {n.toString().padStart(2, '0')}
          </button>
        );
      })}
    </div>
  );
};

export default BettingGrid;
