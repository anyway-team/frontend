import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
  const { id } = useParams();

  return <div>NewsDetailPage</div>;
}
