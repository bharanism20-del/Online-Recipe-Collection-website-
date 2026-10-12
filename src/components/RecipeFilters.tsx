import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface RecipeFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalCount: number;
}

const CATEGORIES = [
  'All',
  'Mains',
  'Pasta',
  'Breads & Tartines',
  'Seafood',
  'Desserts',
  'Mezze & Greens'
];

const DIETARY_OPTIONS = [
  'All Diets',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Quick (< 30m)',
  'High Protein'
];

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDiet,
  setSelectedDiet,
  sortBy,
  setSortBy,
  totalCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Top search & sorting bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input with functional clear button */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by recipe, cuisine, or ingredient..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] focus:border-[#C26D38] text-[#1C1917] placeholder:text-[#A8A29E] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-4 text-xs text-[#78716C]">
          <span className="hidden sm:inline">
            <span className="font-semibold text-[#1C1917] tabular-nums">{totalCount}</span> recipes
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A8A29E]" />
            <span className="whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E7E0D8] rounded px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C26D38] cursor-pointer"
            >
              <option value="curated">Curated Collection</option>
              <option value="quickest">Shortest Cook Time</option>
              <option value="rating">Highest Rated</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Segmented Control (Interactive filter tabs) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-white text-[#78716C] border border-[#E7E0D8] hover:text-[#1C1917] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dietary Sub-filter */}
      <div className="flex items-center gap-2 overflow-x-auto text-[11px] text-[#78716C] pt-1 border-t border-[#F5EFEB]">
        <span className="font-medium text-[#44403C] whitespace-nowrap">Dietary:</span>
        {DIETARY_OPTIONS.map((diet) => {
          const isActive = selectedDiet === diet;
          return (
            <button
              key={diet}
              onClick={() => setSelectedDiet(diet)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#C26D38]/15 text-[#9A3412] font-semibold'
                  : 'hover:text-[#1C1917] hover:underline'
              }`}
            >
              {diet}
            </button>
          );
        })}
      </div>
    </div>
  );
};
