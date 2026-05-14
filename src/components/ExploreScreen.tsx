import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Book, User, Sparkles, Wand2, Music, Heart, Wind, Moon, Sun, Loader2 } from 'lucide-react';
import { Poem, Poet } from '../types';
import { poems } from '../data/poems';
import { poets } from '../data/poets';
import { generateSimilarPoem } from '../services/geminiService';

interface ExploreScreenProps {
  onSelectPoem: (poem: Poem) => void;
  onSelectPoet: (poet: Poet) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ 
  onSelectPoem, 
  onSelectPoet 
}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'poems' | 'poets' | 'ai'>('poems');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  // AI State
  const [aiMood, setAiMood] = useState('Peaceful');
  const [aiPoem, setAiPoem] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const themes = ['Nature', 'Philosophy', 'Devotion', 'Social', 'Love'];
  
  const handleGeneratePoem = async () => {
    setIsGenerating(true);
    setAiPoem(null);
    try {
      const result = await generateSimilarPoem(aiMood);
      setAiPoem(result);
    } catch (err) {
      alert("AI generator failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const filteredPoems = poems.filter(p => {
    const matchesSearch = p.kannadaTitle.includes(search) || p.title.toLowerCase().includes(search.toLowerCase());
    const matchesTheme = !selectedTheme || p.category === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  const filteredPoets = poets.filter(p => 
    p.kannadaName.includes(search) || 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-32 px-6 pt-12 min-h-screen">
      <header className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-30 mb-1">Discover</p>
            <h1 className="text-4xl font-serif font-black">Explore</h1>
          </div>
          <Sparkles className="w-8 h-8 text-indigo-500 opacity-20" />
        </div>
        
        <div className="relative group mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
          <input 
            type="text" 
            placeholder={activeTab === 'poets' ? "Search poets..." : "Search poems..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--ink-current)]/5 border-2 border-transparent focus:border-indigo-500/20 rounded-3xl py-5 pl-12 pr-6 outline-none transition-all text-lg font-serif"
          />
        </div>

        <div className="flex bg-[var(--ink-current)]/5 p-1 rounded-3xl mb-8">
          {[
            { id: 'poems', label: 'Poems', icon: Book },
            { id: 'poets', label: 'Poets', icon: User },
            { id: 'ai', label: 'AI Generator', icon: Wand2 }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id 
                  ? 'bg-white shadow-xl shadow-indigo-500/5 text-indigo-600' 
                  : 'opacity-40 hover:opacity-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'poems' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            <button
              onClick={() => setSelectedTheme(null)}
              className={`px-8 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap ${!selectedTheme ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-gray-100'}`}
            >
              All
            </button>
            {themes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTheme(t)}
                className={`px-8 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedTheme === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-gray-100'}`}
              >
                {t}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'poems' && (
          <motion.div
            key="poems-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredPoems.length > 0 ? (
              filteredPoems.map((p, i) => (
                <PoemCard key={p.id} poem={p} index={i} onClick={() => onSelectPoem(p)} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center opacity-30 italic font-serif">
                No poems found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'poets' && (
          <motion.div
            key="poets-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            {filteredPoets.map((poet, i) => (
              <PoetCard key={poet.id} poet={poet} index={i} onClick={() => onSelectPoet(poet)} />
            ))}
          </motion.div>
        )}

        {activeTab === 'ai' && (
          <motion.div
            key="ai-generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <AIGenerator 
              aiMood={aiMood} 
              setAiMood={setAiMood} 
              aiPoem={aiPoem} 
              setAiPoem={setAiPoem}
              isGenerating={isGenerating}
              onGenerate={handleGeneratePoem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PoemCard: React.FC<{ poem: Poem; index: number; onClick: () => void }> = ({ poem, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    onClick={onClick}
    className="bg-white border border-gray-100 rounded-[2.5rem] p-8 cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
      <Book className="w-24 h-24 rotate-12" />
    </div>
    <div className="relative z-10">
      <span className="text-[10px] uppercase font-black tracking-widest px-3 py-1 bg-indigo-50 text-indigo-500 rounded-full mb-4 inline-block">
        {poem.category}
      </span>
      <h4 className="text-3xl font-serif font-bold mb-3 group-hover:text-indigo-600 transition-colors">
        {poem.kannadaTitle}
      </h4>
      <p className="opacity-40 text-sm font-serif italic">
        — {poets.find(p => p.id === poem.poetId)?.kannadaName}
      </p>
    </div>
  </motion.div>
);

const PoetCard: React.FC<{ poet: Poet; index: number; onClick: () => void }> = ({ poet, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
    onClick={onClick}
    className="flex flex-col items-center text-center cursor-pointer group"
  >
    <div className="w-28 h-28 rounded-[2rem] overflow-hidden mb-4 shadow-xl group-hover:scale-110 transition-transform duration-500 ring-4 ring-transparent group-hover:ring-indigo-500/20 relative">
      <img 
        src={poet.imageUrl} 
        alt={poet.name} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
        <span className="text-[8px] text-white font-bold uppercase tracking-widest">View Profile</span>
      </div>
    </div>
    <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-indigo-600 transition-colors">{poet.kannadaName}</h4>
    <p className="text-[10px] uppercase font-black tracking-tighter opacity-30">{poet.period}</p>
  </motion.div>
);

const AIGenerator: React.FC<{
  aiMood: string;
  setAiMood: (mood: string) => void;
  aiPoem: string | null;
  setAiPoem: (poem: string | null) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}> = ({ aiMood, setAiMood, aiPoem, setAiPoem, isGenerating, onGenerate }) => {
  const moods = [
    { name: 'Peaceful', icon: Wind, color: 'bg-emerald-500' },
    { name: 'Romantic', icon: Heart, color: 'bg-rose-500' },
    { name: 'Spiritual', icon: Moon, color: 'bg-indigo-500' },
    { name: 'Energetic', icon: Sun, color: 'bg-amber-500' },
    { name: 'Melancholic', icon: Music, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Wand2 className="w-10 h-10 text-indigo-200" />
            <h3 className="text-3xl font-serif font-bold">Mood based Creator</h3>
          </div>
          <p className="text-indigo-100 text-sm mb-8 leading-relaxed opacity-80">Select a mood and let AI craft a soul-stirring Kannada poem just for you.</p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {moods.map((m) => (
              <button
                key={m.name}
                onClick={() => setAiMood(m.name)}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold transition-all ${
                  aiMood === m.name 
                    ? 'bg-white text-indigo-600 shadow-xl scale-105' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <m.icon className={`w-4 h-4 ${aiMood === m.name ? 'fill-current' : ''}`} />
                {m.name}
              </button>
            ))}
          </div>

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-white text-indigo-600 py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-black/10"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Crafting Magic...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Poem
              </>
            )}
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />
      </div>

      {aiPoem && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--bg-current)] paper-shadow rounded-[3rem] p-10 border border-indigo-500/10"
        >
          <div className="flex items-center gap-2 mb-6 text-indigo-500">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 fill-current" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-widest">AI Generated Masterpiece</span>
          </div>
          <div className="font-serif text-2xl leading-relaxed whitespace-pre-wrap text-center mb-10">
            {aiPoem}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigator.clipboard.writeText(aiPoem)}
              className="flex-1 py-4 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              Copy Text
            </button>
            <button 
              onClick={() => setAiPoem(null)}
              className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              Clear
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};


