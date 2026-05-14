import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Poet, Poem, Meaning } from '../types';
import { poets } from '../data/poets';
import { BottomDrawer } from './BottomDrawer';
import { AudioPlayer, AudioPlayerHandle } from './AudioPlayer';
import { 
  Bookmark, Share2, Copy, ArrowLeft, User, Sparkles, 
  Languages, BrainCircuit, Type, Minus, Plus, Loader2, 
  Volume2, VolumeX, Image as ImageIcon, Download,
  PenLine, GraduationCap, CheckCircle2, AlertCircle,
  MessageSquare, Send, XCircle,Maximize2, Minimize2
} from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import { explainPoem, translatePoem, generateQuiz, chatAboutPoem } from '../services/geminiService';
import { useAuth } from './AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';
import * as htmlToImage from 'html-to-image';

interface PoemReaderProps {
  poem: Poem;
  onBack: () => void;
  onSelectPoet: (poet: Poet) => void;
}

export const PoemReader: React.FC<PoemReaderProps> = ({ poem, onBack, onSelectPoet }) => {
  const [selectedMeaning, setSelectedMeaning] = useState<Meaning | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { profile, refreshProfile } = useAuth();
  const [copying, setCopying] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [aiResult, setAiResult] = useState<{ type: 'explanation' | 'translation', content: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  useEffect(() => {
    const fetchNote = async () => {
      if (profile?.userId) {
        const noteRef = doc(db, 'users', profile.userId, 'notes', poem.id);
        const docSnap = await getDoc(noteRef);
        if (docSnap.exists()) {
          setNote(docSnap.data().content);
        }
      }
    };
    fetchNote();
  }, [poem.id, profile?.userId]);

  useEffect(() => {
    // Record reading progress after 5 seconds of being on the page
    const timer = setTimeout(async () => {
      if (profile?.userId) {
        try {
          const userRef = doc(db, 'users', profile.userId);
          await updateDoc(userRef, {
            totalReadCount: increment(1),
            lastReadPoemId: poem.id,
            lastReadDate: new Date().toISOString()
          });
          refreshProfile();
        } catch (err) {
          console.warn("Silent failure recording reading progress", err);
        }
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [poem.id]);

  const downloadCard = async () => {
    if (cardRef.current) {
      const dataUrl = await htmlToImage.toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = `${poem.title}-kavya-kanaja.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const saveNote = async () => {
    if (!profile?.userId) return;
    setSavingNote(true);
    try {
      const noteRef = doc(db, 'users', profile.userId, 'notes', poem.id);
      await setDoc(noteRef, {
        userId: profile.userId,
        poemId: poem.id,
        content: note,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.WRITE, `users/${profile.userId}/notes/${poem.id}`);
    } finally {
      setSavingNote(false);
    }
  };

  const startQuiz = async () => {
    setLoadingAi(true);
    setShowQuiz(true);
    setQuizFinished(false);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    try {
      const questions = await generateQuiz(poem.kannadaTitle, poem.content);
      setQuiz(questions);
    } catch (err) {
      console.error("Quiz Error:", err);
      alert("AI failed to prepare the quiz. Please ensure your Gemini API Key is set in Settings.");
      setShowQuiz(false);
    } finally {
      setLoadingAi(false);
    }
  };

  const artist = poets.find(p => p.id === poem.poetId);

  const handleAiAction = async (action: 'explain' | 'translate') => {
    setLoadingAi(true);
    setAiResult(null);
    try {
      const text = action === 'explain' 
        ? await explainPoem(poem.kannadaTitle, poem.content)
        : await translatePoem(poem.kannadaTitle, poem.content);
      setAiResult({ type: action === 'explain' ? 'explanation' : 'translation', content: text });
    } catch (err) {
      console.error("AI Action Error:", err);
      alert("AI failed to process. Please check your Gemini API key in Settings.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleListen = () => {
    const playerElement = document.getElementById('audio-player-container');
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth' });
      // Trigger play
      setTimeout(() => {
        audioPlayerRef.current?.play();
      }, 500);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMessage = chatInput;
    setChatInput('');
    // Use an intermediate variable for state consistency
    const updatedHistory: { role: 'user' | 'model', parts: { text: string }[] }[] = 
      [...chatHistory, { role: 'user', parts: [{ text: userMessage }] }];
    
    setChatHistory(updatedHistory);
    setIsChatLoading(true);
    
    try {
      // Pass the state as it was BEFORE this message was added, since startChat will use it as 'previous' history
      const prevHistoryForService = chatHistory;
      const response = await chatAboutPoem(poem.kannadaTitle, poem.content, prevHistoryForService, userMessage);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: "ನನ್ನ ಕಡೆಯಿಂದ ಏನೋ ತೊಂದರೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಇನ್ನೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ. (Something went wrong, please try again.)" }] }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const renderContent = () => {
    return poem.content.split('\n').map((line, i) => (
      <div key={i} className="mb-2 min-h-[1.5em]" style={{ fontSize: `${fontSize}px` }}>
        {line.split(' ').map((word, j) => {
          const cleanWord = word.replace(/[.,!?;:]/g, '');
          const meaning = poem.meanings[cleanWord];
          
          if (meaning) {
            return (
              <span key={j}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMeaning(meaning)}
                  className="bg-indigo-50 border-b-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-100/50 transition-all px-1 rounded-sm cursor-help font-bold text-indigo-900"
                >
                  {word}
                </motion.button>
                {' '}
              </span>
            );
          }
          return <span key={j} className="opacity-80">{word} </span>;
        })}
      </div>
    ));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${poem.kannadaTitle}\n\n${poem.content}\n\n-- ${artist?.kannadaName}`);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div className={`min-h-screen pb-32 transition-colors duration-700 ${isReadingMode ? 'bg-[#FDFBF7]' : ''}`}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-[100] rounded-r-full shadow-lg shadow-indigo-500/20" 
        style={{ scaleX }}
      />

      {/* Dynamic Header */}
      {!isReadingMode && (
        <nav className="sticky top-0 z-30 p-4 flex justify-between items-center bg-[var(--bg-current)]/80 backdrop-blur-md">
          <div className="flex items-center gap-1">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full transition-colors mr-2"
              title="Back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => toggleFavorite(poem.id)}
              className={`p-2 rounded-full transition-all ${isFavorite(poem.id) ? 'bg-red-500/10 text-red-500' : 'hover:bg-[var(--ink-current)]/10'}`}
              title="Save to Favorites"
            >
              <Bookmark className={`w-6 h-6 ${isFavorite(poem.id) ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleCopy}
              className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full transition-colors relative"
              title="Copy Poem"
            >
              <Copy className="w-6 h-6" />
              {copying && (
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -20 }}
                  className="absolute text-[10px] bg-[var(--ink-current)] text-[var(--bg-current)] px-2 py-0.5 rounded whitespace-nowrap"
                >
                  Copied!
                </motion.span>
              )}
            </button>
            <button 
              onClick={() => setShowShareCard(true)}
              className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full transition-colors"
              title="Download/Share Image"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsReadingMode(true)}
              className="p-2 hover:bg-[var(--ink-current)]/10 rounded-full transition-colors text-indigo-500"
              title="Reading Mode"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </nav>
      )}

      {isReadingMode && (
        <button 
          onClick={() => setIsReadingMode(false)}
          className="fixed top-8 right-8 z-[60] bg-black/5 hover:bg-black/10 p-3 rounded-full backdrop-blur-md transition-colors"
        >
          <Minimize2 className="w-6 h-6 text-black/40" />
        </button>
      )}

        {/* Hero Header */}
        <header className={`px-6 pt-8 pb-12 text-center max-w-2xl mx-auto transition-opacity duration-1000 ${isReadingMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-40 mb-4 block">
              {poem.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 px-4 leading-[1.1] text-[var(--ink-current)]">
              {poem.kannadaTitle}
            </h1>
            <button 
              onClick={() => artist && onSelectPoet(artist)}
              className="text-xl italic opacity-60 font-serif hover:opacity-100 transition-opacity flex items-center gap-2 mx-auto justify-center"
            >
              — {poem.title} <User className="w-4 h-4" />
            </button>
          </motion.div>
        </header>

        {/* Main Content Area */}
        <main className="px-6 max-w-2xl mx-auto">
          {/* Quick Tools */}
          {!isReadingMode && (
            <div className="mb-8 flex items-center justify-center gap-4 bg-[var(--ink-current)]/5 p-2 rounded-2xl">
              <div className="flex items-center gap-2 border-r border-[var(--ink-current)]/10 pr-4">
                <Type className="w-4 h-4 opacity-40" />
                <button onClick={() => setFontSize(s => Math.max(16, s - 2))} className="p-1 hover:bg-[var(--ink-current)]/10 rounded"><Minus className="w-4 h-4" /></button>
                <span className="text-xs font-bold w-6 text-center">{fontSize}</span>
                <button onClick={() => setFontSize(s => Math.min(48, s + 2))} className="p-1 hover:bg-[var(--ink-current)]/10 rounded"><Plus className="w-4 h-4" /></button>
              </div>
              
              <button 
                onClick={() => handleAiAction('explain')}
                className="flex items-center gap-2 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
              >
                <BrainCircuit className="w-4 h-4" /> Explain
              </button>
              <button 
                onClick={() => handleAiAction('translate')}
                className="flex items-center gap-2 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
              >
                <Languages className="w-4 h-4" /> Translate
              </button>
              
              <div className="w-[1px] h-4 bg-[var(--ink-current)]/10" />

              <button 
                onClick={handleListen}
                className="flex items-center gap-2 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
              >
                <Volume2 className="w-4 h-4" /> Listen
              </button>

              <div className="w-[1px] h-4 bg-[var(--ink-current)]/10" />

              <button 
                onClick={startQuiz}
                className="flex items-center gap-2 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
              >
                <GraduationCap className="w-4 h-4" /> Quiz
              </button>
            </div>
          )}

        {/* Notes Area */}
        <div className="mb-12 bg-[var(--ink-current)]/5 p-8 rounded-[2.5rem] border border-[var(--ink-current)]/5">
          <div className="flex items-center gap-2 mb-4 opacity-40">
            <PenLine className="w-4 h-4" />
            <h4 className="text-[10px] font-black uppercase tracking-widest">My reflections</h4>
          </div>
          <textarea
            placeholder="Write your thoughts on this poem..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm leading-relaxed font-serif min-h-[100px] resize-none"
          />
          <div className="mt-4 flex justify-end">
            <button 
              onClick={saveNote}
              disabled={savingNote}
              className="text-[10px] font-black uppercase tracking-widest bg-[var(--ink-current)] text-[var(--bg-current)] px-6 py-2 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {savingNote ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save Note'}
            </button>
          </div>
        </div>

        {/* AI Result Area */}
        <AnimatePresence>
          {(loadingAi || aiResult) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-[var(--ink-current)]/5 to-[var(--ink-current)]/[0.02] p-6 rounded-[2rem] border border-[var(--ink-current)]/5 relative">
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-indigo-500 opacity-40" />
                <h4 className="text-[10px] uppercase tracking-widest font-black opacity-40 mb-3 flex items-center gap-2">
                  {loadingAi ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  AI {aiResult?.type === 'explanation' ? 'Explanation' : 'Poetic Translation'}
                </h4>
                {loadingAi ? (
                  <div className="space-y-2 py-2">
                    <div className="h-3 bg-[var(--ink-current)]/5 rounded-full w-full animate-pulse" />
                    <div className="h-3 bg-[var(--ink-current)]/5 rounded-full w-[90%] animate-pulse" />
                    <div className="h-3 bg-[var(--ink-current)]/5 rounded-full w-[80%] animate-pulse" />
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap italic">
                    {aiResult?.content}
                  </p>
                )}
                {!loadingAi && (
                  <button 
                    onClick={() => setAiResult(null)}
                    className="mt-4 text-[10px] font-bold opacity-30 hover:opacity-100 transition-opacity"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif leading-[1.8] text-[var(--ink-current)]/90 text-center md:text-left space-y-6"
        >
          {renderContent()}
        </motion.article>

        {/* Footnotes / Tips */}
        <div className="mt-16 p-6 border-t border-[var(--ink-current)]/10 text-sm opacity-40 italic text-center">
          Tap underlined words to see their meaning and context.
        </div>
        
        {/* Audio Section */}
        <div id="audio-player-container" className="mt-12 sticky bottom-8 z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AudioPlayer 
              ref={audioPlayerRef}
              url={poem.audioUrl} 
              speechContent={poem.content} 
              title={poem.kannadaTitle}
            />
          </motion.div>
        </div>
      </main>



      {/* Share Card Modal */}
      <AnimatePresence>
        {showShareCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm flex flex-col items-center">
              <div 
                ref={cardRef}
                className="w-full aspect-[3/4] bg-[#FDFBF7] p-8 rounded-[2rem] flex flex-col justify-between border-8 border-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="text-9xl font-serif font-black">ಕ</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-4 border-b-2 border-[#1A1A1A]/10 pb-4">
                    {poem.kannadaTitle}
                  </h3>
                  <p className="text-lg font-serif leading-relaxed text-[#1A1A1A]/80 line-clamp-[8]">
                    {poem.content}
                  </p>
                </div>
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-1">Poet</p>
                    <p className="font-serif font-bold text-xl">{artist?.kannadaName}</p>
                  </div>
                  <div className="text-right">
                    <p className="inline-block px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full">Kavya Kanaja</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setShowShareCard(false)}
                  className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={downloadCard}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" /> Save Image
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Chat */}
      {!isReadingMode && (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-24 right-6 z-50 p-6 bg-indigo-600 text-white rounded-full paper-shadow hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask AI about this poem
          </span>
        </button>
      )}

      {/* Quiz Separate "Page" (Full Screen Overlay) */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-white flex flex-col"
          >
            <nav className="p-4 flex justify-between items-center border-b border-gray-100">
              <button 
                onClick={() => setShowQuiz(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="font-serif font-black text-indigo-900 italic">Kavya Quiz Exploration</h2>
              <div className="w-10 h-10" /> {/* Spacer */}
            </nav>

            <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-2xl mx-auto w-full">
              {loadingAi ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-8"
                  >
                    <Sparkles className="w-16 h-16 text-indigo-500" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-indigo-900 mb-2">Engaging AI Wisdom...</h3>
                  <p className="text-sm opacity-50 max-w-xs mx-auto">Crafting unique challenges based on the nuances of this poem's verses.</p>
                </div>
              ) : quizFinished ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="mb-12 relative">
                    <div className="w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-indigo-100">
                      <div className="text-6xl font-black text-indigo-600">
                        {Math.round((quizScore / (quiz?.length || 1)) * 100)}%
                      </div>
                    </div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 }}
                      className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-3xl shadow-xl"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                  </div>

                  <h3 className="text-4xl font-serif font-bold text-indigo-900 mb-4">Masterful Reading!</h3>
                  <p className="text-lg opacity-60 mb-12">You've successfully explored the depths of "{poem.kannadaTitle}". Your understanding score was {quizScore}/{quiz?.length}.</p>
                  
                  <div className="flex flex-col gap-4 w-full">
                    <button 
                      onClick={startQuiz}
                      className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Retake Exploration
                    </button>
                    <button 
                      onClick={() => setShowQuiz(false)}
                      className="w-full text-indigo-600 font-bold py-4 hover:bg-indigo-50 rounded-3xl transition-colors"
                    >
                      Return to the Verses
                    </button>
                  </div>
                </motion.div>
              ) : quiz && quiz[currentQuizIndex] ? (
                <div className="py-8">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex gap-2">
                      {quiz.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            i === currentQuizIndex ? 'w-12 bg-indigo-600' : (i < currentQuizIndex ? 'w-4 bg-indigo-200' : 'w-4 bg-gray-100')
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs font-black opacity-30 uppercase tracking-widest">Verse {currentQuizIndex + 1} of {quiz.length}</span>
                  </div>

                  <motion.div
                    key={currentQuizIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                  >
                    <h3 className="text-3xl font-serif font-bold leading-tight text-indigo-950 text-center md:text-left">
                      {quiz[currentQuizIndex].question}
                    </h3>
                  </motion.div>

                  <div className="space-y-4">
                    {quiz[currentQuizIndex].options.map((opt: string, i: number) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        disabled={selectedOption !== null}
                        onClick={() => {
                          setSelectedOption(i);
                          if (i === quiz[currentQuizIndex].answerIndex) setQuizScore(s => s + 1);
                        }}
                        className={`w-full p-6 md:p-8 rounded-[2rem] text-lg font-medium transition-all text-left flex items-center justify-between border-2 ${
                          selectedOption === i 
                            ? (i === quiz[currentQuizIndex].answerIndex ? 'bg-green-600 border-green-600 text-white' : 'bg-red-600 border-red-600 text-white')
                            : (selectedOption !== null && i === quiz[currentQuizIndex].answerIndex ? 'bg-green-50 border-green-200 text-green-900' : 'bg-white hover:border-indigo-100 hover:bg-gray-50 border-gray-100 shadow-sm')
                        }`}
                      >
                        <span className="flex-1">{opt}</span>
                        {selectedOption === i && (
                          i === quiz[currentQuizIndex].answerIndex ? <CheckCircle2 className="w-8 h-8 shrink-0 ml-4" /> : <XCircle className="w-8 h-8 shrink-0 ml-4" />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {selectedOption !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="mt-12 bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <p className="text-xs font-black uppercase tracking-widest text-indigo-600">Literary Insight</p>
                      </div>
                      <p className="text-lg leading-relaxed text-indigo-900/80 mb-8 italic">"{quiz[currentQuizIndex].explanation}"</p>
                      <button 
                        onClick={() => {
                          if (currentQuizIndex < quiz.length - 1) {
                            setCurrentQuizIndex(i => i + 1);
                            setSelectedOption(null);
                          } else {
                            setQuizFinished(true);
                          }
                        }}
                        className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {currentQuizIndex < quiz.length - 1 ? 'Next Challenge' : 'Complete Exploration'}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:right-6 md:bottom-24 md:w-96 bg-white rounded-3xl shadow-2xl z-[70] border border-gray-100 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">Literary Assistant</span>
              </div>
              <button onClick={() => setShowChat(false)}><XCircle className="w-6 h-6 opacity-60 hover:opacity-100" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {chatHistory.length === 0 && (
                <div className="text-center py-8 opacity-40 italic text-sm">
                  Ask anything about the metaphors, context, or meaning of this poem.
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-indigo-900 rounded-tl-none'
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your question..."
                className="flex-1 bg-gray-50 rounded-full px-5 py-3 outline-none text-sm transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isChatLoading}
                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomDrawer 
        meaning={selectedMeaning} 
        onClose={() => setSelectedMeaning(null)} 
      />
    </div>
  );
};
