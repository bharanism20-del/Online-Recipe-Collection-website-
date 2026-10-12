import React, { useState } from 'react';
import { Recipe, ShoppingItem } from '../types/recipe';
import {
  X,
  Clock,
  ChefHat,
  Bookmark,
  Printer,
  ShoppingBag,
  Play,
  Minus,
  Plus,
  Wine,
  Calendar,
  Check,
  Flame,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { scaleIngredient } from '../utils/scaler';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToShoppingList: (items: ShoppingItem[]) => void;
  onOpenCookMode: (recipe: Recipe, servings: number, isMetric: boolean) => void;
  onStartTimer: (label: string, minutes: number) => void;
  onAddToMealPlan: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToShoppingList,
  onOpenCookMode,
  onStartTimer,
  onAddToMealPlan,
}) => {
  const [servings, setServings] = useState(recipe.servings || 4);
  const [isMetric, setIsMetric] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [addedToListMessage, setAddedToListMessage] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const toggleIngredientChecked = (id: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddAllToCart = () => {
    const newItems: ShoppingItem[] = recipe.ingredients.map((ing) => {
      const { amountDisplay, unitDisplay } = scaleIngredient(
        ing,
        servings,
        recipe.servings,
        isMetric
      );
      return {
        id: `${recipe.id}-${ing.id}-${Date.now()}`,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        name: ing.name,
        amount: `${amountDisplay} ${unitDisplay}`,
        category: ing.category,
        checked: false,
      };
    });

    onAddToShoppingList(newItems);
    setAddedToListMessage(true);
    setTimeout(() => setAddedToListMessage(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-[#FAF7F2] w-full max-w-4xl rounded-xl border border-[#E7E0D8] shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:w-full">
        
        {/* Sticky action header */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E0D8] px-6 py-3.5 flex items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isFavorite
                  ? 'border-[#C26D38] bg-[#FDF6F0] text-[#9A3412]'
                  : 'border-[#D6D3D1] bg-white text-[#44403C] hover:bg-stone-50'
              }`}
              title="Save to favorites"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#C26D38] text-[#C26D38]' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => onAddToMealPlan(recipe)}
              className="p-2 rounded-md border border-[#D6D3D1] bg-white text-[#44403C] hover:bg-stone-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Plan for this week"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9A3412]" />
              <span className="hidden sm:inline">Add to Plan</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-md border border-[#D6D3D1] bg-white text-[#44403C] hover:bg-stone-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print recipe"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => {
                const text = `${recipe.title}\n${recipe.subtitle}\n\nPrep: ${recipe.prepTimeMinutes}m | Cook: ${recipe.cookTimeMinutes}m | Servings: ${servings}\n\nIngredients:\n${recipe.ingredients.map(i => `· ${i.name} (${i.amount} ${i.unit})`).join('\n')}\n\nDirections:\n${recipe.instructions.map(s => `${s.stepNumber}. ${s.text}`).join('\n')}`;
                navigator.clipboard.writeText(text);
                setShareCopied(true);
                setTimeout(() => setShareCopied(false), 2000);
              }}
              className="p-2 rounded-md border border-[#D6D3D1] bg-white text-[#44403C] hover:bg-stone-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share or copy recipe"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#78716C]" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenCookMode(recipe, servings, isMetric)}
              className="px-4 py-2 bg-[#1C1917] text-white hover:bg-[#292524] rounded-md text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Hands-Free Cook Mode</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Recipe Content Body */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Header & Hero Area */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A3412] mb-2">
              <span>{recipe.category}</span>
              <span aria-hidden="true">·</span>
              <span>{recipe.cuisine}</span>
              {recipe.isCustom && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1C1917] font-bold">Personal Recipe</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight mb-2">
              {recipe.title}
            </h1>

            <p className="text-base text-[#78716C] italic font-serif mb-4">
              {recipe.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed max-w-3xl">
              {recipe.description}
            </p>

            {/* Quiet unboxed metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#78716C] pt-4 border-t border-[#E7E0D8] mt-6">
              <span className="flex items-center gap-1.5 text-[#1C1917] font-medium">
                <Clock className="w-4 h-4 text-[#9A3412]" />
                <span>Prep: <strong className="tabular-nums font-semibold">{recipe.prepTimeMinutes}m</strong></span>
                <span className="mx-1">/</span>
                <span>Cook: <strong className="tabular-nums font-semibold">{recipe.cookTimeMinutes}m</strong></span>
              </span>
              <span aria-hidden="true" className="text-[#D6D3D1]">·</span>
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#9A3412]" />
                <span>{recipe.difficulty}</span>
              </span>
              <span aria-hidden="true" className="text-[#D6D3D1]">·</span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#9A3412]" />
                <span className="tabular-nums">{recipe.nutrition.calories} kcal / serving</span>
              </span>
            </div>
          </div>

          {/* Hero Photography Slot */}
          {recipe.heroImage && !imgError && (
            <div className="aspect-16/9 rounded-lg overflow-hidden border border-[#E7E0D8] bg-[#E7E5E4] print:hidden">
              <img
                src={recipe.heroImage}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Servings Scaler & Unit Toggle Bar */}
          <div className="bg-white border border-[#E7E0D8] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs no-print">
            {/* Servings Scaler */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                Portions:
              </span>
              <div className="flex items-center border border-[#D6D3D1] rounded-md bg-[#FAF7F2]">
                <button
                  onClick={() => setServings((prev) => Math.max(1, prev - 1))}
                  className="p-2 text-[#44403C] hover:text-[#1C1917] hover:bg-stone-200 rounded-l-md transition-colors cursor-pointer"
                  title="Decrease portions"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                  {servings} {servings === 1 ? 'serving' : 'servings'}
                </span>
                <button
                  onClick={() => setServings((prev) => prev + 1)}
                  className="p-2 text-[#44403C] hover:text-[#1C1917] hover:bg-stone-200 rounded-r-md transition-colors cursor-pointer"
                  title="Increase portions"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Units & Shopping trigger */}
            <div className="flex items-center gap-3">
              <div className="flex items-center p-0.5 bg-[#FAF7F2] border border-[#D6D3D1] rounded-md text-xs font-medium">
                <button
                  onClick={() => setIsMetric(false)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    !isMetric ? 'bg-white text-[#1C1917] font-semibold shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  US Customary
                </button>
                <button
                  onClick={() => setIsMetric(true)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    isMetric ? 'bg-white text-[#1C1917] font-semibold shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  Metric (g / ml)
                </button>
              </div>

              <button
                onClick={handleAddAllToCart}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#FAF7F2] hover:bg-[#F5EFEB] border border-[#D6D3D1] text-[#1C1917] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {addedToListMessage ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Added to List!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#9A3412]" />
                    <span>Add to Shopping List</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Grid: Ingredients (Left) and Instructions (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Ingredients Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D8]">
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                  Ingredients
                </h2>
                <span className="text-xs text-[#78716C]">
                  {checkedIngredients.length}/{recipe.ingredients.length} prepared
                </span>
              </div>

              <ul className="space-y-2.5 text-sm">
                {recipe.ingredients.map((ing) => {
                  const isChecked = checkedIngredients.includes(ing.id);
                  const { amountDisplay, unitDisplay } = scaleIngredient(
                    ing,
                    servings,
                    recipe.servings,
                    isMetric
                  );

                  return (
                    <li
                      key={ing.id}
                      onClick={() => toggleIngredientChecked(ing.id)}
                      className={`flex items-start gap-3 p-2 rounded transition-colors cursor-pointer ${
                        isChecked ? 'bg-[#F5EFEB]/50 text-[#A8A29E]' : 'hover:bg-white text-[#1C1917]'
                      }`}
                    >
                      <button
                        type="button"
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          isChecked
                            ? 'bg-[#C26D38] border-[#C26D38] text-white'
                            : 'border-[#D6D3D1] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      <div className="flex-1 flex justify-between items-baseline gap-2">
                        <span className={`text-xs sm:text-sm ${isChecked ? 'line-through' : ''}`}>
                          {ing.name}
                        </span>
                        <span className="font-mono tabular-nums text-xs font-semibold text-[#9A3412] shrink-0 text-right">
                          {amountDisplay} {unitDisplay}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Nutrition Facts */}
              <div className="mt-8 p-4 bg-white border border-[#E7E0D8] rounded-lg">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#78716C] mb-3">
                  Nutrition per serving ({servings} total)
                </h3>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 bg-[#FAF7F2] rounded">
                    <span className="block font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                      {recipe.nutrition.calories}
                    </span>
                    <span className="text-[10px] text-[#78716C]">Calories</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded">
                    <span className="block font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                      {recipe.nutrition.protein}g
                    </span>
                    <span className="text-[10px] text-[#78716C]">Protein</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded">
                    <span className="block font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                      {recipe.nutrition.carbs}g
                    </span>
                    <span className="text-[10px] text-[#78716C]">Carbs</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded">
                    <span className="block font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                      {recipe.nutrition.fat}g
                    </span>
                    <span className="text-[10px] text-[#78716C]">Fat</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded">
                    <span className="block font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                      {recipe.nutrition.fiber}g
                    </span>
                    <span className="text-[10px] text-[#78716C]">Fiber</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="pb-2 border-b border-[#E7E0D8] flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                  Preparation Method
                </h2>
                <span className="text-xs text-[#78716C]">
                  {recipe.instructions.length} sequential steps
                </span>
              </div>

              <div className="space-y-6">
                {recipe.instructions.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-lg bg-white border border-[#E7E0D8] space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase text-[#9A3412]">
                        Step {step.stepNumber}
                      </span>
                      {step.timerMinutes && (
                        <button
                          onClick={() =>
                            onStartTimer(
                              `${recipe.title}: Step ${step.stepNumber}`,
                              step.timerMinutes!
                            )
                          }
                          className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-[#F5EFEB] border border-[#E7E0D8] text-[#9A3412] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Start {step.timerMinutes}m Timer</span>
                        </button>
                      )}
                    </div>

                    {step.title && (
                      <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                        {step.title}
                      </h3>
                    )}

                    <p className="text-sm text-[#44403C] leading-relaxed">
                      {step.text}
                    </p>

                    {step.tip && (
                      <div className="pt-2 border-t border-[#F5EFEB] text-xs text-[#78716C] flex items-start gap-1.5">
                        <span className="font-semibold text-[#9A3412]">Note:</span>
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chef Notes & Wine Pairing Section */}
              <div className="space-y-4 pt-4">
                {recipe.chefNotes && (
                  <div className="p-4 bg-[#F5EFEB] border border-[#E7E0D8] rounded-lg text-sm text-[#44403C]">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#9A3412] block mb-1">
                      Chef's Tasting Note
                    </span>
                    <p className="leading-relaxed">{recipe.chefNotes}</p>
                  </div>
                )}

                {recipe.winePairing && (
                  <div className="p-4 bg-white border border-[#E7E0D8] rounded-lg text-sm text-[#44403C] flex items-start gap-3">
                    <Wine className="w-5 h-5 text-[#9A3412] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs uppercase tracking-wider text-[#9A3412] block mb-0.5">
                        Sommelier Recommendation
                      </span>
                      <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {recipe.winePairing}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
