import type { Metadata } from 'next';
import { EditList } from '../../components/edit-list';

export const metadata: Metadata = { title: 'Your Edit' };

export default function Edit() {
  return <EditList />;
}
