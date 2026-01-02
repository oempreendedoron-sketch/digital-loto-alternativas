
import React from 'react';
import { Lottery, Page } from '../types';
import { LOTTERIES } from '../constants';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import LotteryCard from '../components/LotteryCard';

interface HomePageProps {
  onSelectLottery: (lottery: Lottery, page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectLottery }) => {
  const lotofacil = LOTTERIES.find(l => l.name === 'Lotofácil')!;
  
  return (
    <div className="container mx-auto px-4">
      <Hero lottery={lotofacil} onPlay={onSelectLottery} />
      
      <HowItWorks />

      <div className="my-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Escolha sua loteria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {LOTTERIES.map(lottery => (
            <LotteryCard key={lottery.id} lottery={lottery} onSelect={onSelectLottery} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;