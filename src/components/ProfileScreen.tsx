import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, LogOut, User as UserIcon, Flame, BookText, Heart, 
  Settings, ChevronRight, Edit3, Sparkles 
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { useFavorites } from './FavoritesContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (tab: 'HOME' | 'EXPLORE' | 'LIBRARY' | 'PROFILE') => void;
  onShowSettings: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onBack,
  onNavigate,
  onShowSettings
}) => {
  const { user, profile } = useAuth();
  const { favorites } = useFavorites();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // App.tsx handles the redirection when user becomes null
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-current)] pb-24">
      <nav className="sticky top-0 z-30 p-4 flex items-center justify-between bg-[var(--bg-current)]/80 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif font-bold">Profile</h1>
        <button 
          onClick={handleLogout}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </nav>

      <div className="px-6 pt-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 bg-[var(--ink-current)]/5 rounded-[2rem] flex items-center justify-center mb-4 relative">
            <UserIcon className="w-12 h-12 opacity-30" />
            <button className="absolute -bottom-1 -right-1 p-2 bg-[var(--ink-current)] text-[var(--bg-current)] rounded-full paper-shadow">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-2xl font-serif font-bold">{user?.displayName || 'User'}</h2>
          <p className="text-sm opacity-40 font-medium">{user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--ink-current)]/5 p-6 rounded-[2rem] flex flex-col items-center text-center">
            <Flame className="w-6 h-6 text-orange-500 mb-2" />
            <span className="text-2xl font-bold">{profile?.readingStreak || 0}</span>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Day Streak</span>
          </div>
          <div className="bg-[var(--ink-current)]/5 p-6 rounded-[2rem] flex flex-col items-center text-center">
            <BookText className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{profile?.totalReadCount || 0}</span>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Poems Read</span>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-[2.5rem] mb-10 border border-white/20">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Daily Goal</h4>
              <p className="text-xl font-serif font-bold">Poetry Progress</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">{(profile?.totalReadCount || 0) % (profile?.dailyGoal || 5)}</span>
              <span className="text-sm opacity-40 font-bold"> / {profile?.dailyGoal || 5}</span>
            </div>
          </div>
          <div className="h-3 bg-[var(--ink-current)]/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, ((profile?.totalReadCount || 0) % (profile?.dailyGoal || 5)) / (profile?.dailyGoal || 5) * 100)}%` }}
              className="h-full bg-indigo-500"
            />
          </div>
          <p className="text-[10px] font-bold opacity-40 mt-4 uppercase tracking-[0.2em] text-center">
            {((profile?.totalReadCount || 0) % (profile?.dailyGoal || 5)) >= (profile?.dailyGoal || 5) ? 'Goal Accomplished!' : 'Keep reading to reach your goal'}
          </p>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <MenuItem 
            icon={<Heart className="w-5 h-5 text-red-500" />} 
            label="Favorites" 
            value={favorites.length}
            onClick={() => onNavigate('LIBRARY')}
          />
          <MenuItem 
            icon={<Settings className="w-5 h-5 opacity-60" />} 
            label="Preferences" 
            onClick={onShowSettings}
          />
          
          <div className="pt-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-6 bg-red-50 hover:bg-red-100 rounded-[2rem] transition-all group border border-red-100"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm text-red-500">
                  <LogOut className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-black uppercase tracking-widest text-[10px] text-red-500 mb-0.5">Secure Exit</span>
                  <span className="block font-bold text-sm text-red-900">Sign Out of Account</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-300 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-widest font-black opacity-30 px-2 mb-4">Achievements</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <AchievementBadge 
              icon={<Flame className="w-5 h-5" />} 
              label="Early Bird" 
              unlocked={profile?.totalReadCount ? profile.totalReadCount > 0 : false}
              color="bg-orange-500"
            />
            <AchievementBadge 
              icon={<BookText className="w-5 h-5" />} 
              label="Scholar" 
              unlocked={profile?.totalReadCount ? profile.totalReadCount >= 5 : false}
              color="bg-blue-500"
            />
            <AchievementBadge 
              icon={<Sparkles className="w-5 h-5" />} 
              label="AI Explorer" 
              unlocked={true}
              color="bg-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementBadge: React.FC<{ icon: React.ReactNode, label: string, unlocked: boolean, color: string }> = ({ icon, label, unlocked, color }) => (
  <div className={`min-w-[120px] p-6 rounded-[2rem] flex flex-col items-center gap-3 transition-all ${unlocked ? 'opacity-100' : 'opacity-20 grayscale'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${color} paper-shadow`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-center whitespace-nowrap">{label}</span>
  </div>
);

const MenuItem: React.FC<{ icon: React.ReactNode, label: string, value?: string | number, onClick?: () => void }> = ({ icon, label, value, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-5 bg-[var(--ink-current)]/5 hover:bg-[var(--ink-current)]/10 rounded-2xl transition-all group"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-[var(--bg-current)] rounded-lg paper-shadow">
        {icon}
      </div>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {value !== undefined && <span className="text-xs font-bold opacity-40">{value}</span>}
      <ChevronRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
    </div>
  </button>
);
