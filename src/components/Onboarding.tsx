import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Mic, Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: 'Culturally Rich',
    description: 'Explore the finest Kannada poetry from master poets like Kuvempu and Bendre.',
    icon: <BookOpen className="w-12 h-12" />,
    color: 'bg-emerald-500'
  },
  {
    title: 'Audio Narration',
    description: 'Listen to beautiful narrations of your favorite poems with immersive audio.',
    icon: <Mic className="w-12 h-12" />,
    color: 'bg-amber-500'
  },
  {
    title: 'Smart Insights',
    description: 'Understand deep meanings and philosophical backgrounds with AI assistance.',
    icon: <Sparkles className="w-12 h-12" />,
    color: 'bg-indigo-500'
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem('has-onboarded', 'true');
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-between p-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <div className={`${steps[current].color} w-24 h-24 rounded-[2rem] flex items-center justify-center text-white mb-12 paper-shadow`}>
            {steps[current].icon}
          </div>
          <h2 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-4">
            {steps[current].title}
          </h2>
          <p className="text-lg opacity-60 font-medium leading-relaxed max-w-xs">
            {steps[current].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full flex flex-col items-center gap-12">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`h-2 transition-all rounded-full ${i === current ? 'w-8 bg-[#1A1A1A]' : 'w-2 bg-[#1A1A1A]/10'}`}
            />
          ))}
        </div>

        <button 
          onClick={next}
          className="w-full max-w-xs bg-[#1A1A1A] text-white py-5 rounded-[2rem] font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {current === steps.length - 1 ? 'Get Started' : 'Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
