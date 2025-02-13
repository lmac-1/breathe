import {
  Moon,
  ChevronRight,
  ArrowRightLeft,
  Box,
  Scale,
  Brain,
} from 'lucide-react';
import Link from 'next/link';

const exercises = [
  {
    title: 'Resonant Breathing',
    description: 'Align your breath and mind',
    perfect: 'Mental clarity & focus',
    icon: Scale,
    href: '/resonant',
  },
  {
    title: 'Equal Breathing',
    description: 'Gentle, balanced breaths',
    perfect: 'Anxiety relief & relaxation',
    icon: ArrowRightLeft,
    href: '/even',
  },
  {
    title: 'Box Breathing',
    description: 'Four simple sides of calm',
    perfect: 'Anxiety & stress management',
    icon: Box,
    href: '/box',
  },
  {
    title: '4-7-8 Breathing',
    description: 'The natural tranquiliser',
    perfect: 'Relaxation & better sleep',
    icon: Moon,
    href: '/478',
  },
  {
    title: 'Pursed-lip breathing',
    description: 'Gain control over your breathing',
    perfect: 'Calming your nervous system',
    icon: Brain,
    href: '/',
  },
];

export default function Home() {
  //B7C4B5
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-light text-navy mb-2">breathe</h1>
        <p className="text-lg text-navy/80">
          What kind of calm do you need today?
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise, index) => {
          const Icon = exercise.icon;
          return (
            <Link
              href={exercise.href}
              key={index}
              className="group flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white/50 backdrop-blur-sm rounded-xl p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="shrink-0 w-6 h-6 text-navy/70" />
                    <h3 className="text-xl md:leading-6 md:text-lg font-medium text-navy">
                      {exercise.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-navy/50 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
                <div className="text-navy/70 md:text-base text-lg mt-2">
                  {exercise.description}
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-xs flex-1 text-navy/60 mt-3">
                  Perfect for: {exercise.perfect}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
