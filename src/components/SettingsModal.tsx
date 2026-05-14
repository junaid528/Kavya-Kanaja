import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Info, Moon, BookOpen, Coffee, LogOut } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--bg-current)] w-full max-w-sm rounded-[2.5rem] p-8 paper-shadow"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif font-black">App Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center gap-4 p-4 bg-[var(--ink-current)]/5 rounded-2xl hover:bg-[var(--ink-current)]/10 transition-colors">
            <BookOpen className="w-5 h-5 opacity-60" />
            <div className="text-left">
              <p className="font-bold text-sm">Reading Mode</p>
              <p className="text-xs opacity-40">Adjust spacing and font sizes</p>
            </div>
          </button>

          <div className="bg-[var(--ink-current)]/5 rounded-2xl p-4">
            <div className="flex items-center gap-4 mb-4">
              <Moon className="w-5 h-5 opacity-60" />
              <div className="text-left">
                <p className="font-bold text-sm">Theme Selection</p>
                <p className="text-xs opacity-40">Choose your visual style</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'dark', 'sepia'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                    theme === t 
                      ? 'bg-[var(--ink-current)] text-[var(--bg-current)]' 
                      : 'bg-[var(--bg-current)] border border-[var(--ink-current)]/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[var(--ink-current)]/10 my-4" />

          <button className="w-full flex items-center gap-4 p-4 hover:opacity-100 transition-opacity opacity-70">
            <Shield className="w-5 h-5" />
            <p className="font-bold text-sm">Privacy Policy</p>
          </button>

          <button className="w-full flex items-center gap-4 p-4 hover:opacity-100 transition-opacity opacity-70">
            <Info className="w-5 h-5" />
            <p className="font-bold text-sm">About Kavya-Kanaja v1.0</p>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <p className="font-bold text-sm">Sign Out</p>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--ink-current)]/10 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30 mb-4">Crafted with ❤️ for Kannada</p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold transition-all hover:scale-105">
            <Coffee className="w-4 h-4" /> Support the Project
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
