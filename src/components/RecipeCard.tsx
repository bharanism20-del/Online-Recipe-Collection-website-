import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { Clock, Bookmark, Plus, Check } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onQuickAddToPlan?: (recipe: Recipe, e: React.MouseEvent) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  isFavorite,
  onToggleFavorite,
  onQuickAddToPlan,
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedPrompt, setAddedPrompt] = useState(false);

  const handlePlanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAddToPlan) {
      onQuickAddToPlan(recipe, e);
      setAddedPrompt(true);
      setTimeout(() => setAddedPrompt(false), 1500);
    }
  };

  return (
    <article
      onClick={() => onSelectRecipe(recipe)}
      className="group flex flex-col bg-white border border-[#E7E0D8] rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Visual Slot */}
      <div className="relative aspect-4/3 w-full bg-[#E7E5E4] overflow-hidden">
        {!imgError && recipe.heroImage ? (
          <img
            src={recipe.heroImage}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EFEB] to-[#E7E0D8] p-4 text-center">
            <span className="font-serif text-2xl font-semibold text-[#9A3412]/80 mb-1">
              {recipe.cuisine.split(' ')[0]}
            </span>
            <span className="text-xs text-[#78716C] tracking-wide">{recipe.category}</span>
          </div>
        )}

        {/* Favorite quick button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id, e);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-white/90 text-[#C26D38] shadow-xs'
              : 'bg-black/25 text-white hover:bg-white/80 hover:text-[#1C1917]'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#C26D38]' : ''}`} />
        </button>

        {/* Quick Add to Meal Plan overlay trigger */}
        {onQuickAddToPlan && (
          <button
            onClick={handlePlanClick}
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded text-xs font-medium bg-black/60 hover:bg-[#1C1917] text-white backdrop-blur-md transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
            title="Add to Weekly Meal Plan"
          >
            {addedPrompt ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Planned!</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Plan</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Card Content - Zero-Pill & Metadata Discipline */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {/* Subtle uppercase kicker */}
          <div className="flex items-center justify-between text-[11px] font-medium tracking-wider uppercase text-[#9A3412]">
            <span>{recipe.category}</span>
            <span className="text-[#A8A29E] font-normal lowercase">{recipe.cuisine}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors leading-snug line-clamp-2">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
            {recipe.subtitle || recipe.description}
          </p>
        </div>

        {/* Quiet unboxed metadata with typographic separators */}
        <div className="pt-4 mt-3 border-t border-[#F5EFEB] flex items-center justify-between text-xs text-[#78716C]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
            <span className="tabular-nums font-medium text-[#44403C]">
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
            </span>
            <span aria-hidden="true" className="text-[#D6D3D1]">·</span>
            <span>{recipe.difficulty}</span>
          </div>

          <span className="tabular-nums font-mono text-[11px] text-[#A8A29E]">
            {recipe.servings} Serv.
          </span>
        </div>
      </div>
    </article>
  );
};
