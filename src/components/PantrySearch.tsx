import React, { useState } from 'react';
import { Recipe, ShoppingItem } from '../types/recipe';
import { RecipeCard } from './RecipeCard';
import { UtensilsCrossed, Plus, X, Check, Sparkles } from 'lucide-react';

interface PantrySearchProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToShoppingList: (items: ShoppingItem[]) => void;
}

const COMMON_PANTRY_STAPLES = [
  'Olive Oil',
  'Garlic',
  'Eggs',
  'Butter',
  'Pasta',
  'Tomatoes',
  'Ricotta',
  'Salmon',
  'Bok Choy',
  'Cauliflower',
  'Tahini',
  'Blackberries',
  'Flour',
  'Mushrooms',
  'Rice',
  'Saffron',
  'Wine'
];

export const PantrySearch: React.FC<PantrySearchProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  onAddToShoppingList,
}) => {
  const [selectedStaples, setSelectedStaples] = useState<string[]>([
    'Olive Oil',
    'Garlic',
    'Eggs',
    'Pasta',
    'Tomatoes'
  ]);
  const [customInput, setCustomInput] = useState('');

  const toggleStaple = (staple: string) => {
    setSelectedStaples((prev) =>
      prev.includes(staple) ? prev.filter((s) => s !== staple) : [...prev, staple]
    );
  };

  const addCustomStaple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const item = customInput.trim();
    if (!selectedStaples.includes(item)) {
      setSelectedStaples((prev) => [...prev, item]);
    }
    setCustomInput('');
  };

  // Calculate match percentage for each recipe
  const scoredRecipes = recipes.map((recipe) => {
    const totalIngredients = recipe.ingredients.length;
    let matchedCount = 0;
    const missingIngredients = [];

    for (const ing of recipe.ingredients) {
      const ingNameLower = ing.name.toLowerCase();
      const hasMatch = selectedStaples.some((staple) =>
        ingNameLower.includes(staple.toLowerCase())
      );
      if (hasMatch) {
        matchedCount++;
      } else {
        missingIngredients.push(ing);
      }
    }

    const matchPercent = Math.round((matchedCount / totalIngredients) * 100);
    return {
      recipe,
      totalIngredients,
      matchedCount,
      missingIngredients,
      matchPercent,
    };
  });

  // Sort by highest match percent
  scoredRecipes.sort((a, b) => b.matchPercent - a.matchPercent);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Intro Header */}
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A3412]">
          <UtensilsCrossed className="w-4 h-4" />
          <span>Pantry & Larder Matcher</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
          Cook With What You Have
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
          Select or add ingredients currently residing in your kitchen. We’ll rank recipes by what you can cook immediately and let you add any missing items straight to your basket.
        </p>
      </div>

      {/* Pantry Selector Container */}
      <div className="bg-white border border-[#E7E0D8] rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] block mb-3">
            Common Staples (Click to Toggle)
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_PANTRY_STAPLES.map((staple) => {
              const isSelected = selectedStaples.includes(staple);
              return (
                <button
                  key={staple}
                  onClick={() => toggleStaple(staple)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1917] border-[#1C1917] text-white'
                      : 'bg-[#FAF7F2] border-[#E7E0D8] text-[#57534E] hover:border-[#A8A29E]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{staple}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <form onSubmit={addCustomStaple} className="flex gap-2 max-w-md pt-2 border-t border-[#F5EFEB]">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Add another ingredient (e.g. lemon, thyme)..."
            className="flex-1 px-3.5 py-2 text-xs border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] text-[#1C1917]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F5EFEB] border border-[#D6D3D1] text-[#1C1917] text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* Selected ingredients bar */}
        <div className="flex items-center justify-between text-xs text-[#78716C] pt-2">
          <span>
            <strong className="text-[#1C1917] tabular-nums font-semibold">{selectedStaples.length}</strong> pantry ingredients active
          </span>
          {selectedStaples.length > 0 && (
            <button
              onClick={() => setSelectedStaples([])}
              className="text-[#9A3412] hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Matched Results Grid */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#1C1917] flex items-center gap-2">
          <span>Ranked Recipe Matches</span>
          <Sparkles className="w-4 h-4 text-[#C26D38]" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scoredRecipes.map(({ recipe, totalIngredients, matchedCount, missingIngredients, matchPercent }) => {
            const isFav = favorites.includes(recipe.id);

            return (
              <div key={recipe.id} className="flex flex-col space-y-3">
                <RecipeCard
                  recipe={recipe}
                  onSelectRecipe={onSelectRecipe}
                  isFavorite={isFav}
                  onToggleFavorite={onToggleFavorite}
                />

                {/* Match Insight strip */}
                <div className="p-3 bg-white border border-[#E7E0D8] rounded-lg text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#1C1917]">
                      Match Score:
                    </span>
                    <span className={`font-mono font-bold tabular-nums ${
                      matchPercent >= 60 ? 'text-emerald-700' : 'text-[#9A3412]'
                    }`}>
                      {matchPercent}% ({matchedCount}/{totalIngredients})
                    </span>
                  </div>

                  {missingIngredients.length > 0 && (
                    <div className="pt-2 border-t border-[#F5EFEB] flex items-center justify-between gap-2">
                      <span className="text-[#78716C] truncate text-[11px]">
                        Need: {missingIngredients.map((m) => m.name.split(' ')[0]).slice(0, 2).join(', ')}
                        {missingIngredients.length > 2 ? ` +${missingIngredients.length - 2} more` : ''}
                      </span>
                      <button
                        onClick={() => {
                          const itemsToAdd: ShoppingItem[] = missingIngredients.map((m) => ({
                            id: `${recipe.id}-${m.id}-${Date.now()}`,
                            recipeId: recipe.id,
                            recipeTitle: recipe.title,
                            name: m.name,
                            amount: `${m.amount} ${m.unit}`,
                            category: m.category,
                            checked: false,
                          }));
                          onAddToShoppingList(itemsToAdd);
                        }}
                        className="text-[11px] text-[#9A3412] hover:underline font-semibold whitespace-nowrap cursor-pointer"
                      >
                        + Add missing to list
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
