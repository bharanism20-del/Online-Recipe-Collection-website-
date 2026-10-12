import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, X, Bell } from 'lucide-react';
import { playKitchenChime } from '../utils/sound';

interface KitchenTimerProps {
  label: string;
  initialMinutes: number;
  onClose: () => void;
}

export const KitchenTimer: React.FC<KitchenTimerProps> = ({
  label,
  initialMinutes,
  onClose,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setHasFinished(true);
            playKitchenChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const toggleRun = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setHasFinished(false);
    setSecondsLeft(initialMinutes * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const totalSeconds = initialMinutes * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className={`p-4 rounded-lg border transition-all ${
      hasFinished 
        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400' 
        : 'bg-[#1C1917] text-white border-[#292524] shadow-md'
    }`}>
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          {hasFinished ? (
            <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#C26D38]" />
          )}
          <span className={`text-xs font-medium truncate max-w-[180px] ${hasFinished ? 'text-amber-900 font-bold' : 'text-stone-300'}`}>
            {hasFinished ? 'Timer Complete!' : label}
          </span>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded cursor-pointer ${hasFinished ? 'text-stone-600 hover:text-black' : 'text-stone-400 hover:text-white'}`}
          title="Dismiss timer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className={`font-mono tabular-nums text-2xl font-bold tracking-tight ${hasFinished ? 'text-amber-800' : 'text-white'}`}>
          {timeFormatted}
        </div>

        <div className="flex items-center gap-1.5">
          {!hasFinished && (
            <button
              onClick={toggleRun}
              className={`p-2 rounded cursor-pointer transition-colors ${
                isRunning 
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200' 
                  : 'bg-[#C26D38] hover:bg-[#9A3412] text-white'
              }`}
              title={isRunning ? 'Pause' : 'Start'}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={resetTimer}
            className={`p-2 rounded cursor-pointer transition-colors ${
              hasFinished 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white'
            }`}
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-stone-700/50 h-1.5 rounded-full overflow-hidden mt-3">
        <div
          className={`h-full transition-all duration-500 ${hasFinished ? 'bg-amber-500' : 'bg-[#C26D38]'}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
