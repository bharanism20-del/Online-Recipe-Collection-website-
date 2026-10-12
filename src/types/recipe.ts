export interface Ingredient {
  id: string;
  name: string;
  amount: number; // base amount for default servings
  unit: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Pantry & Oils' | 'Spices & Herbs' | 'Meat & Seafood' | 'Bakery';
  notes?: string;
  metricAmount?: number;
  metricUnit?: string;
}

export interface InstructionStep {
  stepNumber: number;
  title?: string;
  text: string;
  timerMinutes?: number;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Masterclass';
  cuisine: string;
  category: 'Mains' | 'Pasta' | 'Breads & Tartines' | 'Seafood' | 'Desserts' | 'Mezze & Greens';
  dietary: string[];
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  nutrition: NutritionInfo;
  winePairing?: string;
  chefNotes?: string;
  isFeatured?: boolean;
  isCustom?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
}

export interface ShoppingItem {
  id: string;
  recipeId?: string;
  recipeTitle?: string;
  name: string;
  amount: string;
  category: string;
  checked: boolean;
}

export interface MealPlanDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
  };
}
