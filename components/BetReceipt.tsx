
import React, { forwardRef } from 'react';
import { Bet } from '../types';

interface BetReceiptProps {
  bet: Bet;
}

const BetReceipt = forwardRef<HTMLDivElement, BetReceiptProps>(({ bet }, ref) => {
  const { lottery, numbers, amount } = bet;
  const estimatedPrize = lottery.prizeTiers?.[numbers.length]?.[amount];

  return (
    <div ref={ref} className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 font-mono text-gray-800">
      {/* Header */}
      <div className="text-center pb-4 border-b border-dashed border-gray-300">
        <h2 className="text-xl font-bold">Comprovante de Aposta</h2>
        <p className="text-sm">Digital Loto - Loterias</p>
      </div>

      {/* Lottery Info */}
      <div className="text-center py-4">
        <p className={`text-2xl font-bold ${lottery.textColor}`}>{lottery.name}</p>
      </div>

      {/* Selected Numbers */}
      <div className="py-4 border-t border-b border-dashed border-gray-300">
        <p className="font-semibold mb-3 text-center">Números Selecionados:</p>
        <div className="grid grid-cols-5 gap-2 justify-items-center">
          {numbers.map(n => (
            <span key={n} className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded-full ${lottery.color}`}>
              {n.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bet Details */}
      <div className="py-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Quantidade de Números:</span>
          <span className="font-bold">{numbers.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Valor da Aposta:</span>
          <span className="font-bold">{amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        {estimatedPrize && (
            <div className="flex justify-between text-green-600">
                <span className="font-semibold">Prêmio Estimado:</span>
                <span className="font-bold">{estimatedPrize.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-dashed border-gray-300 text-center text-xs text-gray-500">
        <p>Aposta registrada em:</p>
        <p className="font-semibold">{new Date().toLocaleString('pt-BR')}</p>
        <p className="mt-2 text-red-600 font-semibold">Sua aposta terá validade após a confirmação de pagamento.</p>
        <p className="mt-2 font-bold">BOA SORTE!</p>
      </div>
    </div>
  );
});

export default BetReceipt;
