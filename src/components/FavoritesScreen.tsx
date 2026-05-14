import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Clock, ChevronRight, Search } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import { poems } from '../data/poems';
import { Poem } from '../types';
import { poets } from '../data/poets';

interface LibraryScreenProps {
  onSelectPoem: (poem: Poem) => void;
  onBack: () => void;
}

export const FavoritesScreen: React.FC<LibraryScreenProps> = ({ onSelectPoem, onBack }) => {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');
  const [search, setSearch] = useState('');

  const favoritePoems = useMemo(() => 
    poems.filter(p => favorites.includes(p.id))
  , [favorites]);

  const filteredFavorites = favoritePoems.filter(p => 
    p.kannadaTitle.includes(search) || p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-32 px-6 pt-12 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-serif font-black mb-6">Library</h1>
        
        <div className="relative group mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
          <input 
            type="text" 
            placeholder="Search your library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--ink-current)]/5 border-2 border-transparent focus:border-[var(--ink-current)]/20 rounded-2xl py-4 pl-12 pr-6 outline-none transition-all text-lg font-serif"
          />
        </div>

        <div className="flex bg-[var(--ink-current)]/5 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'favorites' ? 'bg-[var(--bg-current)] paper-shadow' : 'opacity-40'}`}
          >
            <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-red-500 text-red-500' : ''}`} />
            Favorites
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-[var(--bg-current)] paper-shadow' : 'opacity-40'}`}
          >
            <Clock className="w-4 h-4" />
            History
          </button>
        </div>
      </header>

      {activeTab === 'favorites' ? (
        <section>
          {filteredFavorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
              <Heart className="w-16 h-16 mb-4" />
              <p className="font-serif italic text-lg">No treasures saved yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredFavorites.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onSelectPoem(p)}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex items-center gap-4 cursor-pointer group hover:border-indigo-100 transition-all"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-bold">{p.kannadaTitle}</h4>
                    <p className="text-xs opacity-50 italic">{poets.find(poet => poet.id === p.poetId)?.kannadaName}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <div className="text-center py-20 opacity-30 italic font-serif">
          Reading history will appear here.
        </div>
      )}

      {/* Suggested for You */}
      <section className="mt-12">
        <h3 className="text-xs uppercase tracking-widest font-black opacity-30 mb-6 px-2">Discover New Treasures</h3>
        <div className="space-y-4">
          {poems.slice(0, 2).map((p) => (
            <div 
              key={p.id}
              onClick={() => onSelectPoem(p)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--ink-current)]/5 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-serif font-bold">{p.kannadaTitle}</h4>
                <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Recommended</p>
              </div>
              <ChevronRight className="w-4 h-4 opacity-20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
