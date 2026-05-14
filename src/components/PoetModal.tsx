import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, History, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { Poet } from '../types';
import { generateSimilarPoem } from '../services/geminiService';

interface PoetModalProps {
  poet: Poet | null;
  onClose: () => void;
}

export const PoetModal: React.FC<PoetModalProps> = ({ poet, onClose }) => {
  const [generating, setGenerating] = useState(false);
  const [aiPoem, setAiPoem] = useState<string | null>(null);

  if (!poet) return null;

  const handleGenerate = async () => {
    setGenerating(true);
    setAiPoem(null);
    try {
      const text = await generateSimilarPoem(poet.name);
      setAiPoem(text);
    } catch (err) {
      alert("AI failed to generate. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--bg-current)] w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden paper-shadow max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={poet.imageUrl} 
            alt={poet.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-current)] to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 pb-12 -mt-12 relative z-10">
          <h2 className="text-4xl font-serif font-bold text-[var(--ink-current)] mb-1">
            {poet.kannadaName}
          </h2>
          <p className="text-sm uppercase tracking-widest opacity-50 font-bold mb-6">
            {poet.name} • {poet.period}
          </p>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-2 opacity-60">
                <History className="w-4 h-4" />
                <h4 className="text-xs uppercase tracking-widest font-bold">Biography</h4>
              </div>
              <p className="text-lg leading-relaxed text-[var(--ink-current)]/80 font-serif">
                {poet.kannadaBio}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3 opacity-60">
                <Award className="w-4 h-4" />
                <h4 className="text-xs uppercase tracking-widest font-bold">Notable Works</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {poet.notableWorks.map((work, i) => (
                  <span key={i} className="px-4 py-2 bg-[var(--ink-current)]/5 rounded-xl text-sm font-medium border border-[var(--ink-current)]/10">
                    {work}
                  </span>
                ))}
              </div>
            </section>

            {/* AI Generator Section */}
            <section className="pt-6 border-t border-[var(--ink-current)]/10">
              <div className="bg-indigo-500/5 rounded-3xl p-6 border border-indigo-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">AI Style Mimic</span>
                  </div>
                  {!aiPoem && (
                    <button 
                      onClick={handleGenerate}
                      disabled={generating}
                      className="text-xs font-bold bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <BookOpen className="w-3 h-3" />}
                      Generate Poem
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {aiPoem ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/50 p-6 rounded-2xl border border-indigo-500/10 italic text-center font-serif text-lg leading-relaxed"
                    >
                      <p className="whitespace-pre-wrap">{aiPoem}</p>
                      <div className="mt-4 flex justify-center gap-2">
                        <button onClick={() => setAiPoem(null)} className="text-[10px] font-bold opacity-40 hover:opacity-100 uppercase tracking-widest">Clear</button>
                        <button onClick={handleGenerate} className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-widest">Regenerate</button>
                      </div>
                    </motion.div>
                  ) : generating ? (
                    <div className="flex flex-col items-center py-8 opacity-40">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <p className="text-xs font-bold uppercase tracking-widest">AI is composing in {poet.name}'s style...</p>
                    </div>
                  ) : (
                    <p className="text-xs opacity-50 text-center px-4">
                      Let AI write a small original poem inspired by {poet.name}'s legendary style.
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
