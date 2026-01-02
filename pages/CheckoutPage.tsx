
import React, { useState, useRef } from 'react';
import { Bet } from '../types';
import PixModal from '../components/PixModal';
import BetReceipt from '../components/BetReceipt';
import html2canvas from 'html2canvas';


interface CheckoutPageProps {
  bet: Bet;
  onBack: () => void;
  onConfirm: () => void;
}

const PixIcon = () => (
    <svg className="w-8 h-8 text-gray-700 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 21h8v-8h-8v8zm2-6h4v4h-4v-4z"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2.01C6.58 2.01 2.13 6.46 2.13 11.92c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.14c-1.55 0-3.04-.42-4.32-1.18l-.31-.18-3.21.84.86-3.14-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.49-5.83c-.24-.12-1.45-.71-1.68-.79-.23-.08-.39-.12-.56.12-.17.24-.63.79-.78.95-.14.16-.28.18-.52.06-.23-.12-1-.37-1.9-1.17-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.17 0-.43.06-.66.3.23.24-.88.85-.88 2.07s.9 2.4 1.03 2.57c.12.16 1.77 2.7 4.29 3.78 2.52 1.08 2.52.72 2.97.69.45-.03 1.45-.59 1.65-1.16.2-.56.2-1.04.14-1.16-.06-.12-.23-.19-.48-.31z" />
    </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
);


const CheckoutPage: React.FC<CheckoutPageProps> = ({ bet, onBack, onConfirm }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string, whatsapp?: string }>({});
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  
  const receiptRef = useRef<HTMLDivElement>(null);

  const { lottery, numbers, amount } = bet;
  const pixCode = '00020126360014BR.GOV.BCB.PIX0114+55659925520445204000053039865802BR5925Patrick Rodrigues da Silv6009SAO PAULO621405109lbkBYhrWK6304CB2A';

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

  const handleDownloadReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current, { scale: 2 }).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `comprovante-${lottery.id}.png`;
        link.click();
      });
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsPixModalOpen(true);
    }
  };
  
  const handleWhatsAppRedirect = () => {
    const businessWhatsAppNumber = '65992682978';
    const estimatedPrize = lottery.prizeTiers?.[numbers.length]?.[amount];
    const prizeMessage = estimatedPrize 
      ? `\n*Prêmio Estimado:* ${estimatedPrize.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
      : '';

    const message = `Olá! Confirmo o pagamento da minha aposta para a *${lottery.name}*.\n\n*Números:* ${numbers.join(', ')}\n*Nome:* ${name}\n*WhatsApp:* ${whatsapp}\n*Total:* ${amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}${prizeMessage}\n\nPor favor, envie o comprovante.`;
    const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onConfirm();
  };

  const handleWhatsAppCheckout = () => {
    if (validate()) {
      const businessWhatsAppNumber = '65992682978'; 
      const estimatedPrize = lottery.prizeTiers?.[numbers.length]?.[amount];
      const prizeMessage = estimatedPrize
        ? `\n*Prêmio Estimado:* ${estimatedPrize.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        : '';
      
      const message = `Olá! Gostaria de finalizar minha aposta para a *${lottery.name}*.\n\n*Números:* ${numbers.join(', ')}\n*Nome:* ${name}\n*Total:* ${amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}${prizeMessage}`;

      const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');
      onConfirm();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button onClick={onBack} className="text-orange-500 font-semibold mb-6 flex items-center space-x-2 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        <span>Voltar e editar aposta</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Finalizar Aposta</h1>
          
          <div className="border rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-700">Resumo do Pedido</h2>
               <button onClick={handleDownloadReceipt} className="flex items-center text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-3 rounded-lg transition">
                  <DownloadIcon />
                  Baixar Comprovante
               </button>
            </div>
            
            <div className="mb-4">
                <BetReceipt bet={bet} ref={receiptRef} />
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 text-center">
                <p className="font-semibold">Faça download da sua aposta, ocorrendo premiação, envie o comprovante pelo WhatsApp! Após confirmar os dados de pagamento da aposta, você receberá sua Premiação em até 12 horas.</p>
            </div>
            
            <div className="text-right mt-4 font-bold text-xl text-gray-800">
                Total: <span className="text-green-600">{amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Forma de Pagamento</h2>
            <div className="p-4 border-2 rounded-lg border-green-500 bg-green-50 shadow-md flex items-start space-x-4">
                <PixIcon />
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Pix</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                        Pague seus jogos através da chave pix ou do QR code gerado no pedido pelo Digital Loto.
                    </p>
                </div>
            </div>
          </div>


          <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Seus Dados</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  required 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Número do WhatsApp (com DDD)</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: 11999999999"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                  required 
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail <span className="text-gray-500">(Opcional)</span></label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" 
                />
              </div>
            </div>
            <div className="mt-8">
              <button type="submit" className="w-full bg-green-500 text-white font-bold py-4 rounded-lg text-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                Finalizar Compra
              </button>
              <button 
                type="button" 
                onClick={handleWhatsAppCheckout}
                className="w-full mt-3 bg-emerald-500 text-white font-bold py-4 rounded-lg text-lg hover:bg-emerald-600 transition flex items-center justify-center">
                <WhatsAppIcon />
                Finalizar pelo WhatsApp
              </button>
            </div>
            <p className="text-sm text-red-600 text-center mt-4 font-bold">
                ATENÇÃO: sua aposta só terá validade após a confirmação de pagamento, envie o comprovante no WhatsApp.
            </p>
            <p className="text-xs text-gray-500 text-center mt-4">Ao clicar em Finalizar Compra, você confirma que tem mais de 18 anos e concorda com nossos Termos de Uso.</p>
          </form>
        </div>
      </div>
       <PixModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        pixCode={pixCode}
        onConfirmPayment={handleWhatsAppRedirect}
      />
    </div>
  );
};

export default CheckoutPage;
