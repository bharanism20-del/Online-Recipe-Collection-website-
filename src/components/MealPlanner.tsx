import React, { useState } from 'react';
import { Recipe, MealPlanDay, ShoppingItem } from '../types/recipe';
import { Calendar, Plus, Trash2, ShoppingBag, Check, ArrowRight } from 'lucide-react';

interface MealPlannerProps {
  recipes: Recipe[];
  mealPlan: MealPlanDay[];
  onUpdateMealPlan: (plan: MealPlanDay[]) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onAddToShoppingList: (items: ShoppingItem[]) => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  recipes,
  mealPlan,
  onUpdateMealPlan,
  onSelectRecipe,
  onAddToShoppingList,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<{
    day: MealPlanDay['day'];
    slot: 'breakfast' | 'lunch' | 'dinner';
  } | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  const assignRecipe = (recipe: Recipe) => {
    if (!selectedSlot) return;

    const updated = mealPlan.map((d) => {
      if (d.day === selectedSlot.day) {
        return {
          ...d,
          meals: {
            ...d.meals,
            [selectedSlot.slot]: recipe,
          },
        };
      }
      return d;
    });

    onUpdateMealPlan(updated);
    setSelectedSlot(null);
  };

  const removeRecipe = (day: MealPlanDay['day'], slot: 'breakfast' | 'lunch' | 'dinner') => {
    const updated = mealPlan.map((d) => {
      if (d.day === day) {
        const newMeals = { ...d.meals };
        delete newMeals[slot];
        return { ...d, meals: newMeals };
      }
      return d;
    });
    onUpdateMealPlan(updated);
  };

  const clearEntireWeek = () => {
    const cleared = mealPlan.map((d) => ({ ...d, meals: {} }));
    onUpdateMealPlan(cleared);
  };

  const generateWeeklyGroceryList = () => {
    const itemsToAdd: ShoppingItem[] = [];

    mealPlan.forEach((d) => {
      Object.values(d.meals).forEach((recipe) => {
        if (!recipe) return;
        recipe.ingredients.forEach((ing) => {
          itemsToAdd.push({
            id: `plan-${recipe.id}-${ing.id}-${Date.now()}-${Math.random()}`,
            recipeId: recipe.id,
            recipeTitle: recipe.title,
            name: ing.name,
            amount: `${ing.amount} ${ing.unit}`,
            category: ing.category,
            checked: false,
          });
        });
      });
    });

    if (itemsToAdd.length === 0) {
      setNotification('No recipes are assigned in this week’s menu yet.');
      setTimeout(() => setNotification(null), 2500);
      return;
    }

    onAddToShoppingList(itemsToAdd);
    setNotification(`Successfully added ${itemsToAdd.length} weekly ingredients to your shopping basket!`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Count planned meals
  let totalPlannedMeals = 0;
  mealPlan.forEach((d) => {
    if (d.meals.breakfast) totalPlannedMeals++;
    if (d.meals.lunch) totalPlannedMeals++;
    if (d.meals.dinner) totalPlannedMeals++;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E0D8]">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A3412]">
            <Calendar className="w-4 h-4" />
            <span>Weekly Gastronomic Agenda</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Table Menu Planner
          </h1>
          <p className="text-sm text-[#57534E]">
            Orchestrate your weekly dinners, lunches, and breakfasts. Compile all needed ingredients directly into a consolidated grocery list.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={generateWeeklyGroceryList}
            className="px-4.5 py-2.5 bg-[#1C1917] hover:bg-[#292524] text-white rounded-md text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#C26D38]" />
            <span>Generate Weekly Grocery List</span>
          </button>

          {totalPlannedMeals > 0 && (
            <button
              onClick={clearEntireWeek}
              className="px-3.5 py-2.5 bg-white border border-[#D6D3D1] hover:bg-[#FAF7F2] text-[#78716C] hover:text-red-700 rounded-md text-xs font-medium transition-colors cursor-pointer"
            >
              Reset Week
            </button>
          )}
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* 7-Day Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {mealPlan.map((planDay) => {
          const slots: ('breakfast' | 'lunch' | 'dinner')[] = ['breakfast', 'lunch', 'dinner'];

          return (
            <div
              key={planDay.day}
              className="bg-white border border-[#E7E0D8] rounded-xl overflow-hidden shadow-2xs flex flex-col"
            >
              <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E7E0D8]">
                <h3 className="font-serif font-bold text-sm text-[#1C1917]">
                  {planDay.day}
                </h3>
              </div>

              <div className="p-3 flex-1 flex flex-col gap-3">
                {slots.map((slot) => {
                  const meal = planDay.meals[slot];

                  return (
                    <div
                      key={slot}
                      className="flex-1 flex flex-col justify-between p-2.5 rounded-lg border border-[#F5EFEB] bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
                        <span>{slot}</span>
                        {meal && (
                          <button
                            onClick={() => removeRecipe(planDay.day, slot)}
                            className="text-[#A8A29E] hover:text-red-600 cursor-pointer"
                            title="Remove meal"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {meal ? (
                        <div
                          onClick={() => onSelectRecipe(meal)}
                          className="cursor-pointer group"
                        >
                          <h4 className="font-serif text-xs font-semibold text-[#1C1917] group-hover:text-[#9A3412] line-clamp-2 leading-tight">
                            {meal.title}
                          </h4>
                          <span className="text-[10px] text-[#78716C] block mt-1">
                            {meal.prepTimeMinutes + meal.cookTimeMinutes}m · {meal.difficulty}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedSlot({ day: planDay.day, slot })}
                          className="w-full py-2 border border-dashed border-[#D6D3D1] hover:border-[#1C1917] rounded text-[11px] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Assign</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Selection Drawer / Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-xl w-full rounded-xl border border-[#E7E0D8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D8]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9A3412]">
                  {selectedSlot.day} · {selectedSlot.slot}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                  Select Recipe
                </h3>
              </div>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                ✕
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => assignRecipe(recipe)}
                  className="p-3 bg-white border border-[#E7E0D8] hover:border-[#9A3412] rounded-lg flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-sm font-semibold text-[#1C1917] group-hover:text-[#9A3412]">
                      {recipe.title}
                    </h4>
                    <span className="text-xs text-[#78716C]">
                      {recipe.category} · {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#9A3412] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
