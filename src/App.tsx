import React, { useState, useEffect } from 'react';
import { Recipe, ShoppingItem, MealPlanDay } from './types/recipe';
import {
  getAllRecipes,
  saveCustomRecipe,
  getFavorites,
  toggleFavorite,
  getShoppingList,
  saveShoppingList,
  getMealPlan,
  saveMealPlan,
} from './utils/storage';
import { TopBar } from './components/TopBar';
import { HeroFeatured } from './components/HeroFeatured';
import { RecipeFilters } from './components/RecipeFilters';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingModeModal } from './components/CookingModeModal';
import { ShoppingListDrawer } from './components/ShoppingListDrawer';
import { PantrySearch } from './components/PantrySearch';
import { MealPlanner } from './components/MealPlanner';
import { CreateRecipeModal } from './components/CreateRecipeModal';
import { KitchenTimer } from './components/KitchenTimer';
import { CulinaryJournal } from './components/CulinaryJournal';
import { Bookmark, Sparkles, BookOpen } from 'lucide-react';

interface ActiveTimerItem {
  id: string;
  label: string;
  minutes: number;
}

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState<'collection' | 'pantry' | 'planner' | 'favorites'>('collection');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All Diets');
  const [sortBy, setSortBy] = useState('curated');

  // Persistence
  const [favorites, setFavorites] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>([]);

  // Modals & Panels
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [cookModeState, setCookModeState] = useState<{
    recipe: Recipe;
    servings: number;
    isMetric: boolean;
  } | null>(null);
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Active timers (floating at corner)
  const [activeTimers, setActiveTimers] = useState<ActiveTimerItem[]>([]);

  // Initial load
  useEffect(() => {
    setRecipes(getAllRecipes());
    setFavorites(getFavorites());
    setShoppingList(getShoppingList());
    setMealPlan(getMealPlan());
  }, []);

  // Update favorites
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  // Shopping List methods
  const handleAddToShoppingList = (newItems: ShoppingItem[]) => {
    const updated = [...shoppingList, ...newItems];
    setShoppingList(updated);
    saveShoppingList(updated);
  };

  const handleToggleShoppingItem = (id: string) => {
    const updated = shoppingList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setShoppingList(updated);
    saveShoppingList(updated);
  };

  const handleDeleteShoppingItem = (id: string) => {
    const updated = shoppingList.filter((item) => item.id !== id);
    setShoppingList(updated);
    saveShoppingList(updated);
  };

  const handleAddCustomShoppingItem = (name: string, category: string) => {
    const newItem: ShoppingItem = {
      id: `custom-shop-${Date.now()}`,
      name,
      amount: '',
      category,
      checked: false,
    };
    const updated = [newItem, ...shoppingList];
    setShoppingList(updated);
    saveShoppingList(updated);
  };

  const handleClearCheckedShopping = () => {
    const updated = shoppingList.filter((item) => !item.checked);
    setShoppingList(updated);
    saveShoppingList(updated);
  };

  const handleClearAllShopping = () => {
    setShoppingList([]);
    saveShoppingList([]);
  };

  // Meal Plan methods
  const handleUpdateMealPlan = (plan: MealPlanDay[]) => {
    setMealPlan(plan);
    saveMealPlan(plan);
  };

  // Recipe Creation
  const handleSaveRecipe = (recipe: Recipe) => {
    const updated = saveCustomRecipe(recipe);
    setRecipes(updated);
    setActiveRecipe(recipe);
  };

  // Timer helper
  const handleStartTimer = (label: string, minutes: number) => {
    const timer: ActiveTimerItem = {
      id: `timer-${Date.now()}`,
      label,
      minutes,
    };
    setActiveTimers((prev) => [...prev, timer]);
  };

  const handleCloseTimer = (id: string) => {
    setActiveTimers((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter recipes
  const filteredRecipes = recipes.filter((r) => {
    // Tab filter
    if (activeTab === 'favorites' && !favorites.includes(r.id)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && r.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (selectedDiet !== 'All Diets') {
      if (!r.dietary.includes(selectedDiet)) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = r.title.toLowerCase().includes(q);
      const inSub = r.subtitle.toLowerCase().includes(q);
      const inCuisine = r.cuisine.toLowerCase().includes(q);
      const inIngredients = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
      if (!inTitle && !inSub && !inCuisine && !inIngredients) return false;
    }

    return true;
  });

  // Sorting
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'quickest') {
      return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes);
    }
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'calories') {
      return a.nutrition.calories - b.nutrition.calories;
    }
    // Default: featured first, then review count
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });

  const featuredRecipe = recipes.find((r) => r.isFeatured) || recipes[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      {/* 3-Zone Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shoppingCount={shoppingList.filter((i) => !i.checked).length}
        openShoppingDrawer={() => setIsShoppingOpen(true)}
        openCreateModal={() => setIsCreateOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'collection' && (
          <>
            {/* Featured Hero Header */}
            {featuredRecipe && (
              <HeroFeatured
                recipe={featuredRecipe}
                onSelectRecipe={(r) => setActiveRecipe(r)}
                isFavorite={favorites.includes(featuredRecipe.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {/* Recipe Anthology Grid Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E7E0D8]">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    Curated Master Anthology
                  </h2>
                  <p className="text-xs sm:text-sm text-[#78716C]">
                    Artisan techniques, calibrated flavor notes, and pantry precision.
                  </p>
                </div>
              </div>

              {/* Filters & Search */}
              <RecipeFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedDiet={selectedDiet}
                setSelectedDiet={setSelectedDiet}
                sortBy={sortBy}
                setSortBy={setSortBy}
                totalCount={sortedRecipes.length}
              />

              {/* Grid */}
              {sortedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelectRecipe={(r) => setActiveRecipe(r)}
                      isFavorite={favorites.includes(recipe.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onQuickAddToPlan={(r) => {
                        // Quick add to monday dinner or next slot
                        const updated = mealPlan.map((d) =>
                          d.day === 'Monday' && !d.meals.dinner
                            ? { ...d, meals: { ...d.meals, dinner: r } }
                            : d
                        );
                        handleUpdateMealPlan(updated);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                  <BookOpen className="w-10 h-10 text-[#A8A29E] mx-auto opacity-70" />
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                    No recipes match your criteria
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    Try loosening your dietary filters or clearing the search terms to explore the broader catalog.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedDiet('All Diets');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-[#1C1917] text-white rounded-md cursor-pointer hover:bg-stone-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Culinary Science & Technique Journal */}
            <CulinaryJournal />
          </>
        )}

        {/* Favorites View */}
        {activeTab === 'favorites' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
            <div className="space-y-2 border-b border-[#E7E0D8] pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A3412]">
                <Bookmark className="w-4 h-4 fill-[#9A3412]" />
                <span>Private Cellar & Saved Dishes</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#1C1917]">
                Saved Favorites ({favorites.length})
              </h1>
              <p className="text-sm text-[#57534E]">
                Your personal repository of bookmarked gastronomic dishes.
              </p>
            </div>

            {sortedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onSelectRecipe={(r) => setActiveRecipe(r)}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <Bookmark className="w-10 h-10 text-[#A8A29E] mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                  No saved recipes yet
                </h3>
                <p className="text-xs text-[#78716C]">
                  Click the bookmark icon on any recipe card or header to save dishes here for instant access.
                </p>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="px-4 py-2 text-xs font-semibold bg-[#1C1917] text-white rounded-md cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  Explore Recipe Anthology
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pantry Search View */}
        {activeTab === 'pantry' && (
          <PantrySearch
            recipes={recipes}
            onSelectRecipe={(r) => setActiveRecipe(r)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToShoppingList={handleAddToShoppingList}
          />
        )}

        {/* Meal Planner View */}
        {activeTab === 'planner' && (
          <MealPlanner
            recipes={recipes}
            mealPlan={mealPlan}
            onUpdateMealPlan={handleUpdateMealPlan}
            onSelectRecipe={(r) => setActiveRecipe(r)}
            onAddToShoppingList={handleAddToShoppingList}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      {/* 1. Recipe Detail Modal */}
      {activeRecipe && (
        <RecipeDetailModal
          recipe={activeRecipe}
          onClose={() => setActiveRecipe(null)}
          isFavorite={favorites.includes(activeRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
          onAddToShoppingList={handleAddToShoppingList}
          onOpenCookMode={(recipe, servings, isMetric) => {
            setCookModeState({ recipe, servings, isMetric });
          }}
          onStartTimer={handleStartTimer}
          onAddToMealPlan={(recipe) => {
            setActiveTab('planner');
            setActiveRecipe(null);
          }}
        />
      )}

      {/* 2. Hands-Free Cooking Mode Fullscreen */}
      {cookModeState && (
        <CookingModeModal
          recipe={cookModeState.recipe}
          servings={cookModeState.servings}
          isMetric={cookModeState.isMetric}
          onClose={() => setCookModeState(null)}
          onStartTimer={handleStartTimer}
        />
      )}

      {/* 3. Shopping List Drawer */}
      <ShoppingListDrawer
        isOpen={isShoppingOpen}
        onClose={() => setIsShoppingOpen(false)}
        items={shoppingList}
        onToggleItem={handleToggleShoppingItem}
        onDeleteItem={handleDeleteShoppingItem}
        onAddItem={handleAddCustomShoppingItem}
        onClearChecked={handleClearCheckedShopping}
        onClearAll={handleClearAllShopping}
      />

      {/* 4. Recipe Creator Modal */}
      <CreateRecipeModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSaveRecipe={handleSaveRecipe}
      />

      {/* Floating Kitchen Timers at Bottom Right */}
      {activeTimers.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-80 max-w-[calc(100vw-2rem)]">
          {activeTimers.map((t) => (
            <KitchenTimer
              key={t.id}
              label={t.label}
              initialMinutes={t.minutes}
              onClose={() => handleCloseTimer(t.id)}
            />
          ))}
        </div>
      )}

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E7E0D8] bg-[#F5EFEB] mt-16 no-print">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#78716C]">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-serif text-sm font-bold text-[#1C1917] tracking-tight">
              L’Atelier Culinaire
            </span>
            <p className="text-[11px] text-[#A8A29E]">
              Dedicated to the craft of culinary technique, seasonal ingredients, and mindful cooking.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button onClick={() => setActiveTab('collection')} className="hover:text-[#1C1917] cursor-pointer">
              Anthology
            </button>
            <button onClick={() => setActiveTab('planner')} className="hover:text-[#1C1917] cursor-pointer">
              Meal Agenda
            </button>
            <button onClick={() => setActiveTab('pantry')} className="hover:text-[#1C1917] cursor-pointer">
              Pantry Match
            </button>
            <button onClick={() => setIsShoppingOpen(true)} className="hover:text-[#1C1917] cursor-pointer">
              Grocery Basket
            </button>
          </div>

          <span className="text-[11px] text-[#A8A29E]">
            © 2026 L'Atelier Culinaire · All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
