import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Quote } from 'lucide-react';
import { Meaning } from '../types';

interface BottomDrawerProps {
  meaning: Meaning | null;
  onClose: () => void;
}

export const BottomDrawer: React.FC<BottomDrawerProps> = ({ meaning, onClose }) => {
  return (
    <AnimatePresence>
      {meaning && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-current)] rounded-t-3xl p-6 paper-shadow border-t border-[var(--ink-current)]/10 max-h-[60vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-[var(--ink-current)] flex items-center gap-2">
                <BookOpen className="w-6 h-6 opacity-60" />
                {meaning.word}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-[var(--ink-current)]" />
              </button>
            </div>
            
            <div className="space-y-6">
              <section>
                <h4 className="text-xs uppercase tracking-widest opacity-50 mb-2 font-bold">Meaning</h4>
                <p className="text-xl leading-relaxed text-[var(--ink-current)]/90">
                  {meaning.meaning}
                </p>
              </section>
              
              <section>
                <h4 className="text-xs uppercase tracking-widest opacity-50 mb-2 font-bold">Example Usage</h4>
                <div className="bg-[var(--ink-current)]/5 p-4 rounded-xl border-l-4 border-[var(--ink-current)]/20 italic flex gap-3">
                  <Quote className="w-5 h-5 opacity-30 shrink-0" />
                  <p className="text-lg text-[var(--ink-current)]/80">
                    {meaning.example}
                  </p>
                </div>
              </section>
            </div>
            
            <div className="h-8" /> {/* Spacer */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
