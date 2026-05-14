import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showReset, setShowReset] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Please check your inbox and spam folder.');
      setShowReset(false);
      setError(''); // Clear any previous errors
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'Failed to send reset email. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled in Firebase. Please go to Firebase Console > Build > Authentication > Sign-in method and enable "Email/Password".');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (showReset) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-8 rounded-[2.5rem] paper-shadow"
        >
          <button 
            onClick={() => setShowReset(false)}
            className="mb-6 p-2 -ml-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Reset Password</h2>
            <p className="text-sm opacity-50 uppercase tracking-widest font-bold">Enter your email to receive a reset link</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100">{error}</div>}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FDFBF7] py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-[#1A1A1A]/10 transition-all font-medium"
              />
            </div>
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-[2.5rem] paper-shadow"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-black/10">
            <span className="text-3xl text-white font-serif font-black">ಕ</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm opacity-50 uppercase tracking-widest font-bold">
            {isLogin ? 'Login to your treasury' : 'Join the literary world'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 leading-relaxed">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-medium border border-green-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="email-fields"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FDFBF7] py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-[#1A1A1A]/10 transition-all font-medium border border-transparent focus:border-[#1A1A1A]/5"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FDFBF7] py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-[#1A1A1A]/10 transition-all font-medium border border-transparent focus:border-[#1A1A1A]/5"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FDFBF7] py-4 pl-12 pr-12 rounded-2xl outline-none focus:ring-2 ring-[#1A1A1A]/10 transition-all font-medium border border-transparent focus:border-[#1A1A1A]/5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-30 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowReset(true)}
                    className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-8 shadow-xl shadow-black/10"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setMessage('');
            }}
            className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>

      {!isLogin && (
        <p className="mt-8 text-[10px] font-bold opacity-30 max-w-[280px] text-center uppercase leading-relaxed tracking-tighter">
          By signing up, you agree to our Terms of Service and Privacy Policy. Immerse yourself in the beauty of Kannada poetry.
        </p>
      )}
    </div>
  );
};

