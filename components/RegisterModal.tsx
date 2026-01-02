
import React, { useState } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppIcon = () => (
    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2.01C6.58 2.01 2.13 6.46 2.13 11.92c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.14c-1.55 0-3.04-.42-4.32-1.18l-.31-.18-3.21.84.86-3.14-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.49-5.83c-.24-.12-1.45-.71-1.68-.79-.23-.08-.39-.12-.56.12-.17.24-.63.79-.78.95-.14.16-.28.18-.52.06-.23-.12-1-.37-1.9-1.17-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.17 0-.43.06-.66.3.23.24-.88.85-.88 2.07s.9 2.4 1.03 2.57c.12.16 1.77 2.7 4.29 3.78 2.52 1.08 2.52.72 2.97.69.45-.03 1.45-.59 1.65-1.16.2-.56.2-1.04.14-1.16-.06-.12-.23-.19-.48-.31z" />
    </svg>
);

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<{ name?: string, whatsapp?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { name?: string, whatsapp?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
    }
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'O WhatsApp é obrigatório.';
    } else if (!/^\d{10,11}$/.test(whatsapp.replace(/\D/g, ''))) {
        newErrors.whatsapp = 'Número de WhatsApp inválido. Inclua o DDD.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalizeRegistration = () => {
    if (validate()) {
      const businessWhatsAppNumber = '65992682978';
      const message = `Olá! Gostaria de finalizar meu cadastro.\n\n*Nome:* ${name}\n*WhatsApp:* ${whatsapp}`;
      const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      onClose(); // Close modal after redirecting
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Crie sua Conta</h2>
        <p className="text-gray-600 mb-6 text-center">É rápido e fácil. Preencha seus dados para continuar.</p>
        
        <div className="space-y-4">
            <div>
            <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
                type="text" 
                id="register-name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                required 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
            <label htmlFor="register-whatsapp" className="block text-sm font-medium text-gray-700">Número do WhatsApp (com DDD)</label>
            <input 
                type="tel" 
                id="register-whatsapp" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Ex: 11999999999"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                required 
            />
            {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>
        </div>
        
        <button 
          onClick={handleFinalizeRegistration}
          className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-600 transition flex items-center justify-center"
        >
          <WhatsAppIcon />
          Finalizar Cadastro
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">Ao continuar, você concorda com nossos Termos de Uso.</p>
      </div>
    </div>
  );
};

export default RegisterModal;
