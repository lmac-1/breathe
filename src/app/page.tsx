import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-9xl font-mono tracking-tighter text-blue-400">
        breathe
      </h1>
      <div className="flex gap-4">
        <Button href="/box">box breathing</Button>
        <Button href="/even">even breathing</Button>
        <Button href="/resonant">resonant breathing</Button>
        <Button href="/478">4-7-8</Button>
      </div>
    </div>
  );
}
