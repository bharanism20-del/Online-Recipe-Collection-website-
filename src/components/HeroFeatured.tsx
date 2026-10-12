import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { Clock, ChefHat, Bookmark, ArrowRight, Sparkles } from 'lucide-react';

interface HeroFeaturedProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  recipe,
  onSelectRecipe,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative border-b border-[#E7E0D8] bg-[#F5EFEB]/50">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial story & action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9A3412]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editor’s Featured Selection</span>
              <span aria-hidden="true">·</span>
              <span>Issue No. 14</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.15] max-w-xl text-balance">
              {recipe.title}
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
              {recipe.description}
            </p>

            {/* Zero-Pill unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#78716C] pt-1">
              <span className="flex items-center gap-1.5 text-[#1C1917] font-medium">
                <Clock className="w-4 h-4 text-[#9A3412]" />
                <span className="tabular-nums">{recipe.prepTimeMinutes + recipe.cookTimeMinutes}</span> min total
              </span>
              <span aria-hidden="true" className="text-[#D6D3D1]">·</span>
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#9A3412]" />
                <span>{recipe.difficulty}</span>
              </span>
              <span aria-hidden="true" className="text-[#D6D3D1]">·</span>
              <span>{recipe.cuisine}</span>
              <span aria-hidden="true" className="text-[#D6D3D1]">·</span>
              <span className="tabular-nums">{recipe.servings} Servings</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 pt-3">
              <button
                onClick={() => onSelectRecipe(recipe)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1C1917] rounded-md hover:bg-[#292524] active:scale-[0.98] transition-all cursor-pointer shadow-sm group"
              >
                <span>Read Full Recipe & Cook</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onToggleFavorite(recipe.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border rounded-md transition-colors cursor-pointer ${
                  isFavorite
                    ? 'border-[#C26D38] bg-[#FDF6F0] text-[#9A3412]'
                    : 'border-[#D6D3D1] bg-white text-[#44403C] hover:bg-[#FAF7F2]'
                }`}
                title="Save Recipe"
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#C26D38] text-[#C26D38]' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero photography */}
          <div className="lg:col-span-6">
            <div
              onClick={() => onSelectRecipe(recipe)}
              className="relative aspect-16/10 rounded-lg overflow-hidden border border-[#E7E0D8] shadow-md group cursor-pointer bg-[#E7E5E4]"
            >
              {!imgError && recipe.heroImage ? (
                <img
                  src={recipe.heroImage}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
              ) : (
                /* Styled CSS fallback container as required by Zero-Broken-Image Policy */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EFEB] to-[#E7E0D8] p-8 text-center">
                  <ChefHat className="w-12 h-12 text-[#9A3412] mb-3 opacity-80" />
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">{recipe.title}</h3>
                  <p className="text-xs text-[#78716C] mt-1">{recipe.cuisine}</p>
                </div>
              )}

              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Inset editorial caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between">
                <span className="font-medium tracking-wide drop-shadow-sm">{recipe.subtitle}</span>
                <span className="underline decoration-white/60 underline-offset-4 group-hover:decoration-white transition-all">
                  Open Recipe →
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
