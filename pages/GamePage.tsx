
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Lottery, LotteryType } from '../types';
import BettingGrid from '../components/BettingGrid';
import { DRAW_HISTORY } from '../constants';

interface GamePageProps {
  lottery: Lottery;
  mode: 'betting' | 'simulator';
  onBack: () => void;
  onAddToCart?: (lottery: Lottery, numbers: number[], amount: number) => void;
}

interface SimulationResult {
    drawnNumbers: number[];
    hits: number;
}

const GamePage: React.FC<GamePageProps> = ({ lottery, mode, onBack, onAddToCart }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [betAmount, setBetAmount] = useState<number>(1);
  const [currentPrize, setCurrentPrize] = useState<number | null>(null);

  const minSelection = lottery.selectionCount;
  const maxSelection = lottery.maxSelectionCount || lottery.selectionCount;
  
  const isSelectionValid = useMemo(() => {
    const count = selectedNumbers.length;
    return count >= minSelection && count <= maxSelection;
  }, [selectedNumbers.length, minSelection, maxSelection]);

  const history = useMemo(() => DRAW_HISTORY[lottery.id] || [], [lottery.id]);

  const tieredBetAmounts = useMemo(() => 
    lottery.prizeTiers?.[selectedNumbers.length] 
      ? Object.keys(lottery.prizeTiers[selectedNumbers.length]).map(Number) 
      : [],
  [lottery.prizeTiers, selectedNumbers.length]);

  useEffect(() => {
    if (tieredBetAmounts.length > 0 && !tieredBetAmounts.includes(betAmount)) {
      setBetAmount(tieredBetAmounts[0]);
    }
  }, [tieredBetAmounts, betAmount]);

  useEffect(() => {
    if (lottery.prizeTiers && mode === 'betting') {
        const prize = lottery.prizeTiers[selectedNumbers.length]?.[betAmount];
        setCurrentPrize(prize ?? null);
    } else {
        setCurrentPrize(null);
    }
  }, [selectedNumbers.length, betAmount, lottery.prizeTiers, mode]);

  const handleNumberSelect = useCallback((n: number) => {
    setSimulationResult(null);
    setSelectedNumbers(prev => {
      if (prev.includes(n)) {
        return prev.filter(num => num !== n);
      }
      if (prev.length < maxSelection) {
        return [...prev, n].sort((a, b) => a - b);
      }
      return prev;
    });
  }, [maxSelection]);

  const handleClear = useCallback(() => {
    setSelectedNumbers([]);
    setSimulationResult(null);
  }, []);

  const handleRandomPick = useCallback(() => {
    setSimulationResult(null);
    const numbers = new Set<number>();
    while (numbers.size < minSelection) {
      const randomNum = Math.floor(Math.random() * lottery.totalNumbers) + 1;
      numbers.add(randomNum);
    }
    setSelectedNumbers(Array.from(numbers).sort((a, b) => a - b));
  }, [minSelection, lottery.totalNumbers]);
  
  const handleSimulate = useCallback(() => {
      if (!isSelectionValid) return;

      const drawnNumbers = new Set<number>();
      while(drawnNumbers.size < minSelection) {
          const randomNum = Math.floor(Math.random() * lottery.totalNumbers) + 1;
          drawnNumbers.add(randomNum);
      }

      const drawnArray = Array.from(drawnNumbers).sort((a, b) => a - b);
      const hits = selectedNumbers.filter(n => drawnArray.includes(n)).length;

      setSimulationResult({ drawnNumbers: drawnArray, hits });
  }, [isSelectionValid, minSelection, lottery.totalNumbers, selectedNumbers]);

  const selectionInstruction = useMemo(() => {
    if (lottery.id === LotteryType.MegaSena) {
      return 'Selecione até 40 números dos 60 disponíveis , acerte as 6 sorteadas e FATURE A PREMIAÇÃO.';
    }
    if (lottery.id === LotteryType.Lotofacil) {
      return 'Selecione até 22 números dos 25 disponíveis , acerte as 15 sorteadas e FATURE A PREMIAÇÃO.';
    }
    if (lottery.id === LotteryType.Quina) {
      return 'Selecione até 45 números dos 80 disponíveis, acerte as 5 sorteadas e FATURE A PREMIAÇÃO.';
    }
    if (lottery.id === LotteryType.Lotomania) {
      return 'Selecione até 85 números dos 100 disponíveis , acerte as 20 sorteadas e FATURE A PREMIAÇÃO.';
    }
    if (lottery.id === LotteryType.DiaDeSorte) {
      return 'Selecione até 21 números dos 31 disponíveis , acerte as 7 sorteadas e FATURE A PREMIAÇÃO.';
    }
    return minSelection === maxSelection 
      ? `Selecione ${minSelection} números de 1 a ${lottery.totalNumbers}.`
      : `Selecione de ${minSelection} a ${maxSelection} números de 1 a ${lottery.totalNumbers}.`;
  }, [lottery.id, minSelection, maxSelection, lottery.totalNumbers]);

  const progressText = minSelection === maxSelection
    ? `${selectedNumbers.length} de ${minSelection}`
    : `${selectedNumbers.length} (mín. ${minSelection})`;
  
  const summaryText = minSelection === maxSelection
    ? `Números selecionados: ${selectedNumbers.length}/${minSelection}`
    : `Números selecionados: ${selectedNumbers.length}`;

  const progressPercentage = Math.min(100, (selectedNumbers.length / minSelection) * 100);
  const hasTieredPrizes = lottery.prizeTiers && Object.keys(lottery.prizeTiers).length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
       <button onClick={onBack} className="text-orange-500 font-semibold mb-6 flex items-center space-x-2 hover:underline">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
         <span>Voltar</span>
       </button>
      <div className={`text-center p-6 rounded-t-lg ${lottery.color}`}>
        <h1 className="text-4xl font-bold text-white">
          {mode === 'betting' ? 'Faça sua Aposta' : 'Simulador'} - {lottery.name}
        </h1>
        {mode === 'betting' && <p className="text-white/90 font-semibold mt-1">Loteria Alternativa</p>}
        <p className="text-white/80 mt-2">{selectionInstruction}</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 mt-[-1rem] z-10 relative">
        {/* Left Panel - Betting Grid */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">Progresso da Seleção:</span>
              <span className={`font-bold text-lg ${lottery.textColor}`}>{progressText}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`${lottery.color} h-3 rounded-full transition-all duration-300 ease-in-out`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <BettingGrid lottery={lottery} selectedNumbers={selectedNumbers} onNumberSelect={handleNumberSelect} />
        </div>

        {/* Right Panel - Actions & Summary */}
        <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Seu Jogo</h2>
                <div className="mb-4">
                    <p className="text-gray-600">{summaryText}</p>
                    <div className="mt-2 flex flex-wrap gap-2 min-h-[40px]">
                        {selectedNumbers.map(n => (
                            <span key={n} className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded-full ${lottery.color}`}>{n.toString().padStart(2, '0')}</span>
                        ))}
                    </div>
                </div>

                {mode === 'betting' && (
                  <>
                    <div className="my-6">
                        <h3 className="text-lg font-semibold text-gray-700 text-center">Prêmio Estimado</h3>
                        <div className="mt-2 text-center text-4xl font-bold text-green-600 transition-all duration-300">
                            {currentPrize ? currentPrize.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : lottery.prize}
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            {currentPrize ? 'Prêmio para a aposta atual.' : (hasTieredPrizes ? 'Selecione uma quantidade válida de números para ver os prêmios.' : 'Prêmio estimado.')}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Valor da Aposta:</label>
                        <div className="text-center text-3xl font-bold text-green-600 mb-3">
                            {betAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        
                        {tieredBetAmounts.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                {tieredBetAmounts.map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => setBetAmount(amount)}
                                        className={`py-2 px-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                                            betAmount === amount
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        R$ {amount}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <>
                                <input
                                    id="betAmount"
                                    type="range"
                                    min="1"
                                    max="27"
                                    step="1"
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>R$ 1,00</span>
                                    <span>R$ 27,00</span>
                                </div>
                            </>
                        )}
                    </div>
                  </>
                )}

                 <div className="grid grid-cols-2 gap-3 mt-6">
                    <button onClick={handleRandomPick} className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition">Surpresinha</button>
                    <button onClick={handleClear} className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition">Limpar</button>
                </div>
                
                {mode === 'betting' ? (
                    <button 
                        onClick={() => onAddToCart && onAddToCart(lottery, selectedNumbers, betAmount)} 
                        disabled={!isSelectionValid} 
                        className="w-full mt-3 bg-green-500 text-white font-bold py-4 rounded-lg text-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Gerar e Validar Aposta
                    </button>
                ) : (
                    <button onClick={handleSimulate} disabled={!isSelectionValid} className="w-full mt-3 bg-blue-600 text-white font-bold py-4 rounded-lg text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Simular Sorteio
                    </button>
                )}
            </div>

            {simulationResult && (
                <div className="bg-white p-6 rounded-lg shadow-lg mt-4 animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Resultado da Simulação</h3>
                    <p className="font-semibold text-gray-700">Números Sorteados:</p>
                    <div className="flex flex-wrap gap-2 my-2">
                        {simulationResult.drawnNumbers.map(n => {
                            const isHit = selectedNumbers.includes(n);
                            return <span key={n} className={`w-9 h-9 text-sm flex items-center justify-center font-bold text-white rounded-full transition-all duration-300 ${isHit ? `${lottery.color} ring-4 ring-yellow-400 ring-opacity-75 transform scale-110` : 'bg-gray-400'}`}>{n.toString().padStart(2, '0')}</span>
                        })}
                    </div>
                    <div className={`mt-4 p-4 rounded-lg text-center ${lottery.color} text-white`}>
                        <p className="text-lg">Você acertou</p>
                        <p className="text-4xl font-bold">{simulationResult.hits} número(s)</p>
                    </div>
                </div>
            )}
        </div>
      </div>
      
      {history.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Últimos Resultados - {lottery.name}</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {history.map((draw) => (
              <div key={draw.drawNumber} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${lottery.accentColor}`}>
                 <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-gray-700">Concurso: {draw.drawNumber}</p>
                    <p className="text-sm text-gray-500">{draw.date}</p>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {draw.winningNumbers.map(n => (
                        <span key={n} className={`w-9 h-9 flex items-center justify-center font-bold text-white rounded-full text-sm ${lottery.color}`}>
                            {n.toString().padStart(2, '0')}
                        </span>
                    ))}
                 </div>
                 <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Ganhadores (Prêmio Principal):{' '}
                        {draw.winners > 0 ? (
                            <span className="font-bold text-green-600">{draw.winners}</span>
                        ) : (
                            <span className="font-bold text-red-600">Nenhum (Acumulou!)</span>
                        )}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
