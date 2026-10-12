import React from 'react';
import { Bookmark, ShoppingBag, Calendar, UtensilsCrossed } from 'lucide-react';

interface TopBarProps {
  activeTab: 'collection' | 'pantry' | 'planner' | 'favorites';
  setActiveTab: (tab: 'collection' | 'pantry' | 'planner' | 'favorites') => void;
  shoppingCount: number;
  openShoppingDrawer: () => void;
  openCreateModal: () => void;
  favoritesCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  shoppingCount,
  openShoppingDrawer,
  openCreateModal,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E0D8]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => setActiveTab('collection')}
          className="text-2xl font-serif font-bold tracking-tight text-[#1C1917] hover:text-[#9A3412] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          L’Atelier Culinaire
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#78716C]">
          <button
            onClick={() => setActiveTab('collection')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'collection'
                ? 'text-[#1C1917] font-semibold border-b-2 border-[#C26D38]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            Recipe Anthology
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'planner'
                ? 'text-[#1C1917] font-semibold border-b-2 border-[#C26D38]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('pantry')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'pantry'
                ? 'text-[#1C1917] font-semibold border-b-2 border-[#C26D38]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Pantry Search</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'text-[#1C1917] font-semibold border-b-2 border-[#C26D38]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved {favoritesCount > 0 ? `(${favoritesCount})` : ''}</span>
          </button>

          <button
            onClick={openShoppingDrawer}
            className="whitespace-nowrap shrink-0 text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shopping List {shoppingCount > 0 ? `(${shoppingCount})` : ''}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openShoppingDrawer}
            className="md:hidden relative p-2 text-[#44403C] hover:text-[#1C1917] transition-colors"
            title="Shopping List"
          >
            <ShoppingBag className="w-5 h-5" />
            {shoppingCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-[#C26D38] text-white rounded-full flex items-center justify-center">
                {shoppingCount}
              </span>
            )}
          </button>

          <button
            onClick={openCreateModal}
            className="px-4.5 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-[#292524] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            + Create Recipe
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E7E0D8] px-4 py-2.5 text-xs text-[#78716C] bg-[#FAF7F2]">
        <button
          onClick={() => setActiveTab('collection')}
          className={`py-1 ${activeTab === 'collection' ? 'font-semibold text-[#1C1917]' : ''}`}
        >
          Anthology
        </button>
        <button
          onClick={() => setActiveTab('planner')}
          className={`py-1 ${activeTab === 'planner' ? 'font-semibold text-[#1C1917]' : ''}`}
        >
          Planner
        </button>
        <button
          onClick={() => setActiveTab('pantry')}
          className={`py-1 ${activeTab === 'pantry' ? 'font-semibold text-[#1C1917]' : ''}`}
        >
          Pantry
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`py-1 ${activeTab === 'favorites' ? 'font-semibold text-[#1C1917]' : ''}`}
        >
          Saved ({favoritesCount})
        </button>
      </div>
    </header>
  );
};
