import { Recipe, ShoppingItem, MealPlanDay } from '../types/recipe';
import { INITIAL_RECIPES } from '../data/recipes';

const STORAGE_KEYS = {
  CUSTOM_RECIPES: 'culinaria_custom_recipes_v1',
  FAVORITES: 'culinaria_favorites_v1',
  SHOPPING_LIST: 'culinaria_shopping_list_v1',
  MEAL_PLAN: 'culinaria_meal_plan_v1',
};

export function getCustomRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomRecipe(recipe: Recipe): Recipe[] {
  try {
    const existing = getCustomRecipes();
    const updated = [recipe, ...existing.filter(r => r.id !== recipe.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getAllRecipes(): Recipe[] {
  const custom = getCustomRecipes();
  return [...INITIAL_RECIPES, ...custom];
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['tartine-heirloom-ricotta'];
  } catch {
    return ['tartine-heirloom-ricotta'];
  }
}

export function toggleFavorite(recipeId: string): string[] {
  try {
    const favs = getFavorites();
    const exists = favs.includes(recipeId);
    const updated = exists ? favs.filter(id => id !== recipeId) : [...favs, recipeId];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getShoppingList(): ShoppingItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveShoppingList(items: ShoppingItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(items));
  } catch {
    // ignore
  }
}

const DEFAULT_DAYS: MealPlanDay['day'][] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export function getMealPlan(): MealPlanDay[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEAL_PLAN);
    if (raw) return JSON.parse(raw);
  } catch {
    // continue
  }
  
  // Initial default meal plan layout
  return DEFAULT_DAYS.map(day => ({
    day,
    meals: {}
  }));
}

export function saveMealPlan(plan: MealPlanDay[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(plan));
  } catch {
    // ignore
  }
}
