
import React from 'react';

const WhatsAppIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2.01C6.58 2.01 2.13 6.46 2.13 11.92c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.14c-1.55 0-3.04-.42-4.32-1.18l-.31-.18-3.21.84.86-3.14-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.49-5.83c-.24-.12-1.45-.71-1.68-.79-.23-.08-.39-.12-.56.12-.17.24-.63.79-.78.95-.14.16-.28.18-.52.06-.23-.12-1-.37-1.9-1.17-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.17 0-.43.06-.66.3.23.24-.88.85-.88 2.07s.9 2.4 1.03 2.57c.12.16 1.77 2.7 4.29 3.78 2.52 1.08 2.52.72 2.97.69.45-.03 1.45-.59 1.65-1.16.2-.56.2-1.04.14-1.16-.06-.12-.23-.19-.48-.31z" />
    </svg>
);

const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/65992682978?text=${encodeURIComponent('Olá! Preciso de suporte.')}`;
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="bg-orange-500 py-8 text-white text-center">
        <h3 className="text-3xl font-bold px-4 mb-4">Digital Loto, sua Loteria Alternativa de confiança.</h3>
        <p className="text-lg px-4 mb-6">E com várias vantagens, como:</p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left px-6">
            <p className="flex items-center text-base"><span className="text-2xl mr-3">✅</span> Jogar sem sair de casa.</p>
            <p className="flex items-center text-base"><span className="text-2xl mr-3">✅</span> Apostar com mais números.</p>
            <p className="flex items-center text-base"><span className="text-2xl mr-3">✅</span> Receba sua premiação em até 12 horas.</p>
            <p className="flex items-center text-base"><span className="text-2xl mr-3">✅</span> Seguimos os resultados oficiais da Caixa Econômica federal.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Digital Loto</h4>
            <p className="text-gray-400 text-sm">A sua sorte a um clique de distância. Jogue com segurança e praticidade.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>E-mail: digitalmind7t@gmail.com</li>
              <li>WhatsApp: 659268-2978</li>
            </ul>
            <div className="mt-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400 hover:text-white transition-colors duration-300">
                    <WhatsAppIcon />
                </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Digital Loto. Todos os direitos reservados.</p>
          <p className="mt-2">Jogo responsável. Proibido para menores de 18 anos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
