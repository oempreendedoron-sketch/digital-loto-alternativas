
import React, { useState, useRef, useEffect } from 'react';
import { Lottery, Page } from '../types';
import { LOTTERIES } from '../constants';
import RegisterModal from './RegisterModal';

interface HeaderProps {
    onLogoClick: () => void;
    onNavigate: (lottery: Lottery, page: Page) => void;
}

const WhatsAppIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2.01C6.58 2.01 2.13 6.46 2.13 11.92c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.14c-1.55 0-3.04-.42-4.32-1.18l-.31-.18-3.21.84.86-3.14-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.49-5.83c-.24-.12-1.45-.71-1.68-.79-.23-.08-.39-.12-.56.12-.17.24-.63.79-.78.95-.14.16-.28.18-.52.06-.23-.12-1-.37-1.9-1.17-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.17 0-.43.06-.66.3.23.24-.88.85-.88 2.07s.9 2.4 1.03 2.57c.12.16 1.77 2.7 4.29 3.78 2.52 1.08 2.52.72 2.97.69.45-.03 1.45-.59 1.65-1.16.2-.56.2-1.04.14-1.16-.06-.12-.23-.19-.48-.31z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavigate }) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loteriasMenuOpen, setLoteriasMenuOpen] = useState(false);
    const [simuladorMenuOpen, setSimuladorMenuOpen] = useState(false);
    const [mobileLoteriasOpen, setMobileLoteriasOpen] = useState(false);
    const [mobileSimuladorOpen, setMobileSimuladorOpen] = useState(false);

    const loteriasRef = useRef<HTMLDivElement>(null);
    const simuladorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (loteriasRef.current && !loteriasRef.current.contains(event.target as Node)) {
                setLoteriasMenuOpen(false);
            }
            if (simuladorRef.current && !simuladorRef.current.contains(event.target as Node)) {
                setSimuladorMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleNavClick = (lottery: Lottery, page: Page) => {
        onNavigate(lottery, page);
        setLoteriasMenuOpen(false);
        setSimuladorMenuOpen(false);
        setIsMenuOpen(false);
        setMobileLoteriasOpen(false);
        setMobileSimuladorOpen(false);
    };
    
    const handleSupportClick = () => {
        const businessWhatsAppNumber = '65992682978';
        const message = `Olá! Preciso de suporte.`;
        const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const ChevronDownIcon = ({ open }: { open: boolean }) => (
        <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    );

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="cursor-pointer" onClick={onLogoClick}>
                            <span className="text-2xl font-bold text-gray-800">Digital Loto</span>
                            <p className="text-xs text-sky-600">Serviços Digitais</p>
                        </div>

                        <nav className="hidden md:flex items-center space-x-6">
                            <div className="relative" ref={loteriasRef}>
                                <button onClick={() => setLoteriasMenuOpen(!loteriasMenuOpen)} className="flex items-center text-gray-600 hover:text-orange-500 transition duration-300">
                                    Loterias <ChevronDownIcon open={loteriasMenuOpen} />
                                </button>
                                {loteriasMenuOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                        {LOTTERIES.map(lottery => (
                                            <a key={lottery.id} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(lottery, 'betting'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                                {lottery.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative" ref={simuladorRef}>
                                <button onClick={() => setSimuladorMenuOpen(!simuladorMenuOpen)} className="flex items-center text-gray-600 hover:text-orange-500 transition duration-300">
                                    Simulador <ChevronDownIcon open={simuladorMenuOpen} />
                                </button>
                                {simuladorMenuOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                        {LOTTERIES.map(lottery => (
                                            <a key={lottery.id} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(lottery, 'simulator'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                                {lottery.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>

                        <div className="hidden md:flex items-center space-x-2">
                            <button onClick={() => setIsRegisterModalOpen(true)} className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition duration-300">Cadastre-se</button>
                            <svg className="w-6 h-6 text-gray-600 cursor-pointer hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden py-4">
                            <nav className="flex flex-col space-y-2">
                                <div>
                                    <button onClick={() => setMobileLoteriasOpen(!mobileLoteriasOpen)} className="w-full flex justify-between items-center text-gray-600 hover:text-orange-500 transition duration-300 py-2 font-semibold">
                                        <span>Loterias</span>
                                        <ChevronDownIcon open={mobileLoteriasOpen} />
                                    </button>
                                    {mobileLoteriasOpen && (
                                        <div className="pl-4 mt-2 flex flex-col space-y-2 border-l-2 border-orange-200">
                                            {LOTTERIES.map(lottery => (
                                                <a key={lottery.id} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(lottery, 'betting'); }} className="block py-1 text-gray-600 hover:text-orange-500">
                                                    {lottery.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button onClick={() => setMobileSimuladorOpen(!mobileSimuladorOpen)} className="w-full flex justify-between items-center text-gray-600 hover:text-orange-500 transition duration-300 py-2 font-semibold">
                                        <span>Simulador</span>
                                        <ChevronDownIcon open={mobileSimuladorOpen} />
                                    </button>
                                    {mobileSimuladorOpen && (
                                        <div className="pl-4 mt-2 flex flex-col space-y-2 border-l-2 border-orange-200">
                                            {LOTTERIES.map(lottery => (
                                                <a key={lottery.id} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(lottery, 'simulator'); }} className="block py-1 text-gray-600 hover:text-orange-500">
                                                    {lottery.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </nav>
                            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t">
                                <button onClick={() => setIsRegisterModalOpen(true)} className="w-full px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition duration-300">Cadastre-se</button>
                                <button onClick={handleSupportClick} className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
                                    <WhatsAppIcon />
                                    <span>Suporte</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
        </>
    );
};

export default Header;
