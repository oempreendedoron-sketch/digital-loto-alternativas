
export enum LotteryType {
  MegaSena = 'mega-sena',
  Lotofacil = 'lotofacil',
  Quina = 'quina',
  Lotomania = 'lotomania',
  DiaDeSorte = 'dia-de-sorte',
}

export interface Lottery {
  id: LotteryType;
  name: string;
  color: string;
  textColor: string;
  accentColor: string;
  totalNumbers: number;
  selectionCount: number;
  maxSelectionCount?: number;
  prize: string;
  nextDraw: string;
  prizeTiers?: Record<number, Record<number, number>>;
}

export interface Bet {
  lottery: Lottery;
  numbers: number[];
  amount: number;
}

export type Page = 'home' | 'betting' | 'simulator' | 'checkout';
