import type { Metadata } from 'next';
import { DropDeck } from '../../components/drop-deck';

export const metadata: Metadata = { title: 'This drop' };

export default function Brands() {
  return (
    <div className="shell">
      <DropDeck />
    </div>
  );
}
