import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, ChevronRight, BookOpen, Clock, User } from 'lucide-react';
import { Poem, Poet } from '../types';
import { poems, getPoemOfTheDay } from '../data/poems';
import { poets } from '../data/poets';
import { useAuth } from './AuthContext';

interface HomeScreenProps {
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
  onNavigate: (tab: 'HOME' | 'EXPLORE' | 'LIBRARY' | 'PROFILE') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onSelectPoem, 
  onSelectPoet,
  onNavigate
}) => {
  const { profile } = useAuth();
  const poemOfTheDay = useMemo(() => getPoemOfTheDay(), []);
  const trendingPoems = useMemo(() => {
    // Return 3 poems that are not the poem of the day, consistent for the day
    const day = new Date().getDate();
    return [...poems]
      .filter(p => p.id !== poemOfTheDay.id)
      .sort((a, b) => {
        const hashA = a.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = b.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return ((hashA + day) % 10) - ((hashB + day) % 10);
      })
      .slice(0, 3);
  }, [poemOfTheDay.id]);
  
  const continueReadingPoem = profile?.lastReadPoemId 
    ? poems.find(p => p.id === profile.lastReadPoemId) 
    : poems[1]; // Default to second poem if none found

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  return (
    <div className="pb-32">
      {/* Header & Stats */}
      <header className="px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-sm uppercase tracking-widest font-bold opacity-40 mb-1">{greeting}</h2>
            <h1 className="text-3xl font-serif font-black text-[var(--ink-current)] line-clamp-1">
              {profile?.name || 'Vachana Premi'}
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-orange-500 font-bold">
              <Flame className="w-5 h-5 fill-current" />
              <span>{profile?.readingStreak || 0}</span>
            </div>
            <span className="text-[10px] uppercase font-black opacity-30 mt-1">Day Streak</span>
          </div>
        </div>

        {/* Continue Reading Card */}
        {continueReadingPoem && (
          <section className="mb-10">
            <h3 className="text-xs uppercase tracking-widest font-black opacity-30 px-2 mb-4 flex items-center gap-2">
              <Clock className="w-3 h-3" /> Continue Reading
            </h3>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPoem(continueReadingPoem)}
              className="bg-indigo-600 text-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-200/50 relative overflow-hidden group cursor-pointer"
            >
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-white/60">Currently Exploring</p>
                <h4 className="text-3xl font-serif font-bold mb-4 leading-tight">
                  {continueReadingPoem.kannadaTitle}
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-white" />
                  </div>
                  <span className="text-[10px] font-bold">Resume</span>
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            </motion.div>
          </section>
        )}

        {/* Poem of the Day */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 opacity-60">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs uppercase tracking-widest font-bold">Poem of the Day • ಇಂದಿನ ಕವಿತೆ</h3>
            </div>
            <span className="text-[10px] font-bold text-indigo-500 opacity-40 uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPoem(poemOfTheDay)}
            className="relative bg-white border border-indigo-100/50 shadow-2xl shadow-indigo-500/5 rounded-[3rem] p-10 cursor-pointer overflow-hidden group"
          >
            {/* Background Accent */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />
            
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Daily Selection</p>
              <h4 className="text-5xl font-serif font-black mb-6 leading-[1.1] transition-colors group-hover:text-indigo-600">
                {poemOfTheDay.kannadaTitle}
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="opacity-60 text-lg italic font-serif">— {poets.find(p => p.id === poemOfTheDay.poetId)?.kannadaName}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                  <ChevronRight className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trending Horizontal Scroll */}
        <section>
          <div 
            className="flex items-center justify-between mb-4 px-2 opacity-60 cursor-pointer group"
            onClick={() => onNavigate('EXPLORE')}
          >
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <h3 className="text-xs uppercase tracking-widest font-bold">Trending Now</h3>
            </div>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span className="text-[10px] font-bold uppercase tracking-tighter">See All</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {trendingPoems.map((p) => (
              <motion.div
                key={p.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectPoem(p)}
                className="min-w-[280px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-8 rounded-[2.5rem] border border-[var(--ink-current)]/5 cursor-pointer"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-serif font-bold mb-2">{p.kannadaTitle}</h4>
                <p className="text-sm opacity-40 italic">{poets.find(poet => poet.id === p.poetId)?.kannadaName}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </header>
    </div>
  );
};
