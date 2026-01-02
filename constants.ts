
import { Lottery, LotteryType } from './types';

export const LOTTERIES: Lottery[] = [
  {
    id: LotteryType.MegaSena,
    name: 'Mega-Sena',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    accentColor: 'border-green-500',
    totalNumbers: 60,
    selectionCount: 13,
    maxSelectionCount: 40,
    prize: 'Até R$45.000',
    nextDraw: 'Amanhã',
    prizeTiers: {
      13: { 1: 9000, 2: 18000, 6: 45000 },
      18: { 1: 1300, 2: 2800, 6: 6500 },
      20: { 1: 700, 2: 1500, 4: 2300, 6: 3500, 12: 7500, 17: 11000, 22: 15000, 27: 19000 },
      25: { 1: 150, 2: 300, 4: 450, 6: 800, 12: 1500, 17: 2400, 22: 3200, 27: 4000 },
      30: { 1: 50, 2: 100, 4: 150, 6: 250, 12: 500, 17: 800, 22: 1000, 27: 1300 },
      35: { 1: 20, 2: 40, 4: 60, 6: 100, 12: 200, 17: 300, 22: 400, 27: 500 },
      40: { 6: 40, 12: 75, 17: 120, 22: 160, 27: 200 },
    }
  },
  {
    id: LotteryType.Lotofacil,
    name: 'Lotofácil',
    color: 'bg-purple-600',
    textColor: 'text-purple-600',
    accentColor: 'border-purple-600',
    totalNumbers: 25,
    selectionCount: 17,
    maxSelectionCount: 22,
    prize: 'Até R$45.000',
    nextDraw: 'Amanhã',
    prizeTiers: {
      17: { 1: 6500, 2: 13000, 4: 20000, 6: 30000, 10: 45000 },
      18: { 1: 1300, 2: 2800, 4: 4200, 6: 7000, 12: 14000, 17: 21000, 22: 28000 },
      19: { 1: 500, 2: 1000, 4: 1600, 6: 2800, 12: 5500, 17: 8000, 22: 10000, 27: 13000 },
      20: { 1: 110, 2: 240, 4: 400, 6: 650, 12: 1300, 17: 2000, 22: 2650, 27: 3200 },
      21: { 1: 40, 2: 90, 4: 140, 6: 240, 12: 450, 17: 730, 22: 1000, 27: 1200 },
      22: { 1: 10, 2: 22, 4: 35, 6: 60, 12: 120, 17: 180, 22: 240, 27: 300 },
    }
  },
  {
    id: LotteryType.Quina,
    name: 'Quina',
    color: 'bg-blue-800',
    textColor: 'text-blue-800',
    accentColor: 'border-blue-800',
    totalNumbers: 80,
    selectionCount: 20,
    maxSelectionCount: 45,
    prize: 'Até R$20.000',
    nextDraw: 'Amanhã',
    prizeTiers: {
      20: { 1: 700, 2: 1500, 4: 2200, 6: 4000, 12: 8000, 17: 12000, 22: 13000, 35: 20000 },
      25: { 1: 240, 2: 500, 4: 750, 6: 1000, 12: 2000, 17: 3100, 22: 4300, 27: 5000 },
      30: { 1: 102, 2: 210, 4: 330, 6: 550, 12: 900, 17: 1400, 22: 1900, 27: 2300 },
      35: { 1: 50, 2: 100, 4: 150, 6: 200, 12: 450, 17: 700, 22: 900, 27: 1150 },
      40: { 1: 22, 2: 50, 4: 70, 6: 90, 12: 180, 17: 250, 22: 380, 27: 480 },
      45: { 1: 8, 2: 20, 4: 30, 6: 50, 12: 112, 17: 180, 22: 250, 27: 300 },
    }
  },
  {
    id: LotteryType.Lotomania,
    name: 'Lotomania',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    accentColor: 'border-orange-500',
    totalNumbers: 100,
    selectionCount: 55,
    maxSelectionCount: 85,
    prize: 'Até R$45.000',
    nextDraw: 'Amanhã',
    prizeTiers: {
      55: { 1: 7000, 2: 15000, 5: 33000 },
      60: { 1: 6000, 2: 12000, 4: 19000, 25: 45000 },
      65: { 1: 1300, 2: 2600, 4: 4000, 6: 6000, 12: 12000, 17: 18000, 22: 25000, 27: 30000 },
      70: { 1: 450, 2: 900, 4: 1400, 6: 2300, 12: 4500, 17: 7000, 22: 9000, 27: 12000 },
      75: { 1: 250, 2: 500, 4: 750, 6: 1200, 12: 2500, 17: 3800, 22: 5000, 27: 6250 },
      80: { 1: 70, 2: 125, 4: 200, 6: 350, 12: 700, 17: 1000, 22: 1400, 27: 1675 },
      85: { 6: 60, 12: 120, 17: 200, 22: 250, 27: 325, 60: 700 },
    }
  },
  {
    id: LotteryType.DiaDeSorte,
    name: 'Dia de Sorte',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    accentColor: 'border-yellow-400',
    totalNumbers: 31,
    selectionCount: 10,
    maxSelectionCount: 21,
    prize: 'Até R$34.000',
    nextDraw: 'Próximos',
    prizeTiers: {
      10: { 1: 3330, 2: 6500, 6: 17000, 12: 34000 },
      14: { 1: 400, 2: 800, 4: 1100, 6: 2000, 12: 4000, 17: 6000, 22: 8000, 27: 10000 },
      17: { 1: 80, 2: 160, 4: 250, 6: 400, 12: 800, 17: 1250, 22: 1600, 27: 2100 },
      18: { 1: 50, 2: 100, 4: 150, 6: 250, 12: 500, 17: 800, 22: 1000, 27: 1275 },
      19: { 1: 30, 2: 60, 4: 90, 6: 160, 12: 340, 17: 500, 22: 650, 27: 800 },
      20: { 1: 20, 2: 40, 4: 60, 6: 100, 12: 200, 17: 330, 22: 430, 27: 530 },
      21: { 1: 12, 2: 27, 4: 40, 6: 70, 12: 140, 17: 220, 22: 300, 27: 380 },
    }
  },
];

type DrawHistory = {
  drawNumber: number;
  date: string;
  winningNumbers: number[];
  winners: number;
};

export const DRAW_HISTORY: Record<LotteryType, DrawHistory[]> = {
  [LotteryType.MegaSena]: [],
  [LotteryType.Lotofacil]: [],
  [LotteryType.Quina]: [],
  [LotteryType.Lotomania]: [],
  [LotteryType.DiaDeSorte]: [],
};