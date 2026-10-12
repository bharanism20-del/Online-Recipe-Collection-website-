import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Clock, Play, List } from 'lucide-react';
import { scaleIngredient } from '../utils/scaler';

interface CookingModeModalProps {
  recipe: Recipe;
  servings: number;
  isMetric: boolean;
  onClose: () => void;
  onStartTimer: (label: string, minutes: number) => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  servings,
  isMetric,
  onClose,
  onStartTimer,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showIngredients, setShowIngredients] = useState(false);

  const totalSteps = recipe.instructions.length;
  const currentStep = recipe.instructions[currentStepIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex((prev) => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps, onClose]);

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const isCurrentCompleted = completedSteps.includes(currentStep.stepNumber);

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917] text-white flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C26D38] font-semibold">
            In-Kitchen Cooking Mode
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold truncate max-w-xl text-stone-100">
            {recipe.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showIngredients
                ? 'bg-[#C26D38] border-[#C26D38] text-white'
                : 'border-stone-700 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Ingredients Sheet</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
            title="Exit Cook Mode"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Step Focus Canvas */}
        <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col justify-center max-w-4xl mx-auto">
          {/* Step numbering & status */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm tracking-wider uppercase text-stone-400">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>

            <button
              onClick={() => toggleStepCompleted(currentStep.stepNumber)}
              className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                isCurrentCompleted
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCurrentCompleted ? 'Completed' : 'Mark as done'}</span>
            </button>
          </div>

          {/* Step title if any */}
          {currentStep.title && (
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FDFBF7] mb-6">
              {currentStep.title}
            </h3>
          )}

          {/* Giant Readable Step Text */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-stone-200 leading-relaxed font-sans font-light">
            {currentStep.text}
          </p>

          {/* Chef Tip Callout */}
          {currentStep.tip && (
            <div className="mt-8 p-4 bg-stone-900/80 border border-stone-800 rounded-lg text-stone-300 text-sm flex items-start gap-3">
              <span className="text-[#C26D38] font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5">
                Chef's Tip:
              </span>
              <p className="leading-relaxed">{currentStep.tip}</p>
            </div>
          )}

          {/* Step Kitchen Timer Button if step has time */}
          {currentStep.timerMinutes && (
            <div className="mt-8 pt-4 border-t border-stone-800 flex items-center gap-4">
              <button
                onClick={() =>
                  onStartTimer(
                    `${recipe.title}: Step ${currentStep.stepNumber}`,
                    currentStep.timerMinutes!
                  )
                }
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#C26D38] hover:bg-[#9A3412] text-white font-medium rounded-md shadow-md active:scale-98 transition-all cursor-pointer text-sm"
              >
                <Clock className="w-4 h-4" />
                <span>Start {currentStep.timerMinutes} Min Timer</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
              <span className="text-xs text-stone-400">
                A gentle bell will sound when time elapses.
              </span>
            </div>
          )}
        </div>

        {/* Ingredients Quick-Drawer (Right side) */}
        {showIngredients && (
          <aside className="w-80 border-l border-stone-800 bg-stone-900/95 overflow-y-auto p-6 transition-all">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <h4 className="font-serif font-bold text-lg text-stone-100">
                Ingredients ({servings} serv.)
              </h4>
              <button
                onClick={() => setShowIngredients(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="space-y-3 text-sm">
              {recipe.ingredients.map((ing) => {
                const { amountDisplay, unitDisplay } = scaleIngredient(
                  ing,
                  servings,
                  recipe.servings,
                  isMetric
                );
                return (
                  <li key={ing.id} className="flex justify-between items-baseline gap-2 pb-2 border-b border-stone-800/60">
                    <span className="text-stone-300 text-xs">{ing.name}</span>
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#C26D38] shrink-0">
                      {amountDisplay} {unitDisplay}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="border-t border-stone-800 px-6 py-4 bg-stone-900 flex items-center justify-between">
        <button
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-colors cursor-pointer ${
            currentStepIndex === 0
              ? 'opacity-30 cursor-not-allowed text-stone-500'
              : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {/* Step dots */}
        <div className="hidden sm:flex items-center gap-2">
          {recipe.instructions.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'bg-[#C26D38] scale-125'
                  : completedSteps.includes(step.stepNumber)
                  ? 'bg-emerald-600'
                  : 'bg-stone-700 hover:bg-stone-600'
              }`}
              title={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>

        {currentStepIndex < totalSteps - 1 ? (
          <button
            onClick={() => setCurrentStepIndex((prev) => prev + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-stone-950 hover:bg-stone-200 font-semibold text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            <span>Finish Cooking</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
