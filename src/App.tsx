/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { FavoritesProvider } from './components/FavoritesContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import { HomeScreen } from './components/HomeScreen';
import { PoemReader } from './components/PoemReader';
import { FavoritesScreen } from './components/FavoritesScreen';
import { PoetModal } from './components/PoetModal';
import { SettingsModal } from './components/SettingsModal';
import { AuthScreen } from './components/AuthScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { Onboarding } from './components/Onboarding';
import { Poem, Poet } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Library, User } from 'lucide-react';

type Tab = 'HOME' | 'EXPLORE' | 'LIBRARY' | 'PROFILE';

const MainApp = () => {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('HOME');
  const [currentScreen, setCurrentScreen] = useState<'MAIN' | 'READER' | 'SPLASH'>('SPLASH');
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [selectedPoet, setSelectedPoet] = useState<Poet | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('has-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }

    if (!loading) {
      const timer = setTimeout(() => {
        setCurrentScreen('MAIN');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const navigateToPoem = (poem: Poem) => {
    setSelectedPoem(poem);
    setCurrentScreen('READER');
    window.scrollTo(0, 0);
  };

  if (loading) return null;

  if (!user && currentScreen !== 'SPLASH') {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen selection:bg-[var(--ink-current)] selection:text-[var(--bg-current)]">
      {showOnboarding && (
        <AnimatePresence>
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        </AnimatePresence>
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 'SPLASH' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-white/10 rounded-[2rem] mb-8 mx-auto flex items-center justify-center border border-white/20">
                <span className="text-5xl font-serif font-black">ಕ</span>
              </div>
              <h1 className="text-4xl font-serif font-bold tracking-widest mb-2">Kavya-Kanaja</h1>
              <p className="text-sm uppercase tracking-[0.4em] opacity-40 italic">The Poetry Treasury</p>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === 'MAIN' && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {activeTab === 'HOME' && (
              <HomeScreen 
                onSelectPoem={navigateToPoem}
                onSelectPoet={(poet) => setSelectedPoet(poet)}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}
            {activeTab === 'EXPLORE' && (
              <ExploreScreen 
                onSelectPoem={navigateToPoem}
                onSelectPoet={(poet) => setSelectedPoet(poet)}
              />
            )}
            {activeTab === 'LIBRARY' && (
              <FavoritesScreen 
                onSelectPoem={navigateToPoem}
                onBack={() => setActiveTab('HOME')}
              />
            )}
            {activeTab === 'PROFILE' && (
              <ProfileScreen 
                onBack={() => setActiveTab('HOME')} 
                onNavigate={(tab) => setActiveTab(tab)}
                onShowSettings={() => setShowSettings(true)}
              />
            )}

            {/* Premium Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[var(--bg-current)]/95 backdrop-blur-md border-t border-[var(--ink-current)]/10 flex items-center justify-around px-4 z-40 pb-safe">
              {[
                { id: 'HOME', icon: Home, label: 'Home' },
                { id: 'EXPLORE', icon: Compass, label: 'Explore' },
                { id: 'LIBRARY', icon: Library, label: 'Library' },
                { id: 'PROFILE', icon: User, label: 'Profile' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`relative flex flex-col items-center gap-1 transition-all flex-1 py-2 ${
                    activeTab === tab.id ? 'text-indigo-500' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute -top-1 w-12 h-1 bg-indigo-500 rounded-full"
                    />
                  )}
                  <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">{tab.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}

        {currentScreen === 'READER' && selectedPoem && (
          <motion.div
            key="reader"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[var(--bg-current)]"
          >
            <PoemReader 
              poem={selectedPoem} 
              onBack={() => setCurrentScreen('MAIN')} 
              onSelectPoet={(poet) => setSelectedPoet(poet)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPoet && (
          <PoetModal poet={selectedPoet} onClose={() => setSelectedPoet(null)} />
        )}
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <MainApp />
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

