import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FastForward, Rewind, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  url?: string;
  speechContent?: string;
  title?: string;
}

export interface AudioPlayerHandle {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(({ url, speechContent, title }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (!isPlaying) handlePlay();
    },
    pause: () => {
      if (isPlaying) handlePause();
    },
    togglePlay: () => {
      togglePlay();
    }
  }));

  const handlePlay = () => {
    if (url && audioRef.current) {
      audioRef.current.play().catch(console.error);
    } else if (speechContent) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          if (speechRef.current) {
            window.speechSynthesis.speak(speechRef.current);
          }
        }, 50);
      }
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (url && audioRef.current) {
      audioRef.current.pause();
    } else if (speechContent) {
      window.speechSynthesis.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    if (audioRef.current && url) {
      audioRef.current.playbackRate = speed;
    }
    if (speechRef.current) {
      speechRef.current.rate = speed;
    }
  }, [speed, url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (speechRef.current) {
      speechRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (url) {
      const audio = audioRef.current;
      if (!audio) return;

      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      const onLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    } else if (speechContent) {
      const setupSpeech = () => {
        if (!speechContent) return;
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(speechContent);
        utterance.lang = 'kn-IN';
        
        const voices = window.speechSynthesis.getVoices();
        const knVoice = voices.find(v => v.lang.startsWith('kn') || v.lang === 'kn-IN');
        
        if (knVoice) {
          utterance.voice = knVoice;
        } else {
          const inVoice = voices.find(v => v.lang.includes('IN'));
          if (inVoice) utterance.voice = inVoice;
        }
        
        utterance.rate = speed;
        utterance.volume = isMuted ? 0 : volume;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (e) => {
          console.error("Speech error:", e);
          setIsPlaying(false);
        };
        utterance.onboundary = (event) => {
          const charIndex = event.charIndex;
          setProgress((charIndex / speechContent.length) * 100);
        };
        speechRef.current = utterance;
        setDuration(speechContent.length / 10);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setupSpeech();
          window.speechSynthesis.onvoiceschanged = null;
        };
      } else {
        setupSpeech();
      }

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [url, speechContent, speed]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (url && audioRef.current) {
      const time = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
    // Note: Seeking in standard Web Speech API is limited, we skip for now
  };

  const formatTime = (time: number) => {
    if (url) {
      const mins = Math.floor(time / 60);
      const secs = Math.floor(time % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return ''; // Less relevant for speech approximation
  };

  return (
    <div className="bg-[var(--ink-current)]/5 p-4 rounded-2xl paper-shadow backdrop-blur-sm">
      <audio ref={audioRef} src={url} />
      
      <div className="flex items-center gap-4 mb-3">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 bg-[var(--ink-current)] text-[var(--bg-current)] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[var(--ink-current)]/10 rounded-lg appearance-none cursor-pointer accent-[var(--ink-current)]"
          />
        </div>
      </div>
      
      <div className="flex justify-center gap-6 opacity-60">
        <button 
          onClick={() => { 
            if(audioRef.current) audioRef.current.currentTime -= 5;
            else if(speechContent) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(speechRef.current!); setIsPlaying(true); }
          }} 
          className="hover:opacity-100 transition-opacity"
        >
          <Rewind className="w-5 h-5" />
        </button>
        <button 
          onClick={() => { 
            if(audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); setIsPlaying(true); }
            else if(speechContent) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(speechRef.current!); setIsPlaying(true); }
          }} 
          className="hover:opacity-100 transition-opacity"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button 
          onClick={() => { 
            if(audioRef.current) audioRef.current.currentTime += 5;
          }} 
          className="hover:opacity-100 transition-opacity"
        >
          <FastForward className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="hover:opacity-100 transition-opacity"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setVolume(prev => Math.max(0, prev - 0.1))}
            className="hover:opacity-100 transition-opacity p-1"
          >
            <Minus className="w-3 h-3" />
          </button>
          <div className="w-12 h-1 bg-[var(--ink-current)]/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--ink-current)] transition-all duration-200" 
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
          <button 
            onClick={() => {
              setVolume(prev => Math.min(1, prev + 0.1));
              setIsMuted(false);
            }}
            className="hover:opacity-100 transition-opacity p-1"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowSpeed(!showSpeed)}
            className="text-[10px] font-black hover:opacity-100 transition-all border border-[var(--ink-current)]/20 px-2 py-0.5 rounded-full"
          >
            {speed}x
          </button>
          
          {showSpeed && (
            <div className="absolute bottom-full right-0 mb-2 bg-[var(--bg-current)] paper-shadow rounded-xl p-1 flex flex-col min-w-[60px] border border-[var(--ink-current)]/10">
              {[0.5, 1, 1.5, 2].map(s => (
                <button
                  key={s}
                  onClick={() => { setSpeed(s); setShowSpeed(false); }}
                  className={`px-3 py-2 text-[10px] font-bold rounded-lg transition-colors ${speed === s ? 'bg-[var(--ink-current)] text-[var(--bg-current)]' : 'hover:bg-[var(--ink-current)]/5 text-[var(--ink-current)]'}`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
