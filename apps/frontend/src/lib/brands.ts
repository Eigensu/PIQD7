export type Brand = {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  intro: string;
  facts: string[];
  image: string;
};

export const DROP_SIZE = 7;
export const DROP_NUMBER = '01';
// When the current drop closes. Bump this (and DROP_NUMBER) for each new drop.
export const DROP_ENDS = '2026-10-08T23:59:59';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const [endYear, endMonth, endDay] = DROP_ENDS.slice(0, 10).split('-');
export const DROP_ENDS_LABEL = `${Number(endDay)} ${MONTHS[Number(endMonth) - 1]} ${endYear}`;

export const imageUrl = (photo: string, width: number, quality = 80) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=${quality}`;

export const pad = (n: number) => String(n).padStart(2, '0');

export const brands: Brand[] = [
  {
    id: 'lilavai',
    name: 'Lilavai',
    subtitle: 'studio.',
    location: 'New Delhi / India',
    intro:
      'A quiet rebellion in cut, texture, and everyday utility. Designed for people who dress with intent.',
    facts: ['₹₹ · mid-range', 'slow fashion', '@lilavai'],
    image: 'photo-1551488831-00ddcb6c6bd3',
  },
  {
    id: 'common-thread',
    name: 'Common',
    subtitle: 'thread.',
    location: 'Mumbai / India',
    intro:
      'Everyday uniforms made from rescued cloth, with a sharp eye for proportion and repair.',
    facts: ['₹₹ · mid-range', 'upcycled', '@commonthread'],
    image: 'photo-1529139574466-a303027c1d8b',
  },
  {
    id: 'house-of-sunday',
    name: 'House of',
    subtitle: 'Sunday.',
    location: 'Bengaluru / India',
    intro:
      'Soft tailoring and sun-washed colour for the days that deserve to move slowly.',
    facts: ['₹₹₹ · premium', 'small batch', '@houseofsunday'],
    image: 'photo-1485230895905-ec40ba36b9bc',
  },
  {
    id: 'form-function',
    name: 'Form /',
    subtitle: 'function.',
    location: 'Pune / India',
    intro:
      'Utility pieces that make room for a life in motion, without losing their point of view.',
    facts: ['₹₹ · mid-range', 'utility wear', '@formfunction'],
    image: 'photo-1558769132-cb1aea458c5e',
  },
];
