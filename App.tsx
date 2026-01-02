
import React, { useState, useCallback } from 'react';
import { Lottery, Page, Bet } from './types';
import { LOTTERIES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import CheckoutPage from './pages/CheckoutPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null);
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);

  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedLottery(null);
    setCurrentBet(null);
  }, []);

  const handleSelectLottery = useCallback((lottery: Lottery, page: Page) => {
    setSelectedLottery(lottery);
    setCurrentPage(page);
  }, []);

  const handleAddToCart = useCallback((lottery: Lottery, numbers: number[], amount: number) => {
    setCurrentBet({ lottery, numbers, amount });
    setCurrentPage('checkout');
  }, []);

  const renderPage = () => {
    if (currentPage === 'betting' && selectedLottery) {
      return <GamePage lottery={selectedLottery} mode="betting" onBack={navigateToHome} onAddToCart={handleAddToCart} />;
    }
    if (currentPage === 'simulator' && selectedLottery) {
      return <GamePage lottery={selectedLottery} mode="simulator" onBack={navigateToHome} />;
    }
    if (currentPage === 'checkout' && currentBet) {
        const handleBackFromCheckout = () => {
            setSelectedLottery(currentBet.lottery);
            setCurrentPage('betting');
        }
        const handleConfirmCheckout = () => {
            alert('Aposta registrada com sucesso! Enviaremos a confirmação para o seu WhatsApp. Boa sorte!');
            navigateToHome();
        }
        return <CheckoutPage bet={currentBet} onBack={handleBackFromCheckout} onConfirm={handleConfirmCheckout} />;
    }
    return <HomePage onSelectLottery={handleSelectLottery} />;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Header onLogoClick={navigateToHome} onNavigate={handleSelectLottery} />
      <main className="flex-grow w-full">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
