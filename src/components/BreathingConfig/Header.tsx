import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = { title: string; description: string };

export const Header = ({ title, description }: Props) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="text-navy/70 hover:text-navy">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-4xl font-light text-navy">{title}</h1>
      </div>
      <p className="text-lg text-navy/80">{description}</p>
    </div>
  );
};
