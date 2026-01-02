
import React, { useState } from 'react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
  pixCode: string;
}

const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose, onConfirmPayment, pixCode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleConfirm = () => {
      onConfirmPayment();
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full relative text-center">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pague com PIX</h2>
        <p className="text-gray-600 mb-6">Copie o código abaixo e pague no app do seu banco. Após o pagamento, clique em "Confirmar Pagamento".</p>
        
        <div className="bg-gray-100 p-4 rounded-lg break-words text-sm text-gray-700 font-mono mb-4">
          {pixCode}
        </div>

        <button 
          onClick={handleCopy}
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition mb-3"
        >
          {copied ? 'Copiado!' : 'Copiar Código'}
        </button>
        
        <button 
          onClick={handleConfirm}
          className="w-full bg-green-500 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-600 transition"
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default PixModal;
