import React, { useState } from 'react';
import { Recipe, Ingredient, InstructionStep } from '../types/recipe';
import { X, Plus, Trash2, ChefHat, Check } from 'lucide-react';

interface CreateRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
}

export const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  isOpen,
  onClose,
  onSaveRecipe,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('Italian');
  const [category, setCategory] = useState<Recipe['category']>('Mains');
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>('Intermediate');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(20);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(25);
  const [servings, setServings] = useState(4);
  const [winePairing, setWinePairing] = useState('');
  const [chefNotes, setChefNotes] = useState('');

  // Dietary
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['Vegetarian']);

  // Ingredients state
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: 'ing-init-1',
      name: 'Fresh Extra Virgin Olive Oil',
      amount: 2,
      unit: 'tbsp',
      category: 'Pantry & Oils',
    },
    {
      id: 'ing-init-2',
      name: 'Garlic cloves (thinly sliced)',
      amount: 3,
      unit: 'cloves',
      category: 'Produce',
    },
  ]);

  // Steps state
  const [instructions, setInstructions] = useState<InstructionStep[]>([
    {
      stepNumber: 1,
      title: 'Mise en Place & Prep',
      text: 'Prepare all aromatics, slice vegetables, and measure dry ingredients before heating the pans.',
      timerMinutes: 5,
      tip: 'Organized prep ensures relaxed execution.',
    },
    {
      stepNumber: 2,
      title: 'Gentle Sauté',
      text: 'Warm olive oil over medium-low heat. Add garlic and cook gently until fragrant and pale gold without browning.',
      timerMinutes: 3,
    },
  ]);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: `ing-${Date.now()}`,
        name: '',
        amount: 1,
        unit: 'cup',
        category: 'Produce',
      },
    ]);
  };

  const handleUpdateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setInstructions((prev) => [
      ...prev,
      {
        stepNumber: prev.length + 1,
        title: '',
        text: '',
        timerMinutes: undefined,
      },
    ]);
  };

  const handleUpdateStep = (
    index: number,
    field: keyof InstructionStep,
    value: string | number | undefined
  ) => {
    setInstructions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveStep = (index: number) => {
    setInstructions((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((step, idx) => ({ ...step, stepNumber: idx + 1 }))
    );
  };

  const toggleDiet = (tag: string) => {
    setSelectedDiets((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Handcrafted culinary recipe',
      description: description.trim() || 'A personal signature creation added to the collection.',
      heroImage: '', // Styled CSS/SVG fallback container
      prepTimeMinutes: Number(prepTimeMinutes) || 15,
      cookTimeMinutes: Number(cookTimeMinutes) || 20,
      servings: Number(servings) || 4,
      difficulty,
      cuisine: cuisine.trim() || 'Contemporary',
      category,
      dietary: selectedDiets,
      ingredients: ingredients.filter((i) => i.name.trim().length > 0),
      instructions: instructions.filter((s) => s.text.trim().length > 0),
      nutrition: {
        calories: 420,
        protein: 18,
        carbs: 45,
        fat: 16,
        fiber: 5,
      },
      winePairing: winePairing.trim(),
      chefNotes: chefNotes.trim(),
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    onSaveRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-xl border border-[#E7E0D8] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E0D8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-[#9A3412]" />
            <h2 className="font-serif text-xl font-bold text-[#1C1917]">
              Author New Recipe
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Basic metadata */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#9A3412] pb-1 border-b border-[#E7E0D8]">
              01. General Overview
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Handmade Ricotta Gnocchi with Sage Brown Butter"
                  className="w-full px-3.5 py-2 text-sm border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] bg-white text-[#1C1917]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Subtitle / Flavour Note
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Cloud-soft dumplings tossed in nutty butter with crispy sage"
                  className="w-full px-3.5 py-2 text-sm border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] bg-white text-[#1C1917]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Editorial Story / Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the origin, textures, or culinary inspirations behind this dish..."
                  className="w-full px-3.5 py-2 text-sm border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] bg-white text-[#1C1917]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Cuisine
                  </label>
                  <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="e.g. Italian, Nordic, Japanese"
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md focus:ring-1 focus:ring-[#C26D38] bg-white text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Recipe['category'])}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md focus:ring-1 focus:ring-[#C26D38] bg-white text-[#1C1917]"
                  >
                    <option value="Mains">Mains</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Breads & Tartines">Breads & Tartines</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Mezze & Greens">Mezze & Greens</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Recipe['difficulty'])}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md focus:ring-1 focus:ring-[#C26D38] bg-white text-[#1C1917]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>
              </div>

              {/* Cook times & portions */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={prepTimeMinutes}
                    onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917] tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={cookTimeMinutes}
                    onChange={(e) => setCookTimeMinutes(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917] tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Servings
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917] tabular-nums"
                  />
                </div>
              </div>

              {/* Dietary Tags */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Dietary Qualifiers
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'High Protein', 'Quick (< 30m)'].map(
                    (tag) => {
                      const active = selectedDiets.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleDiet(tag)}
                          className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#C26D38]/15 border-[#C26D38] text-[#9A3412] font-semibold'
                              : 'bg-white border-[#E7E0D8] text-[#78716C]'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#E7E0D8]">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#9A3412]">
                02. Ingredients ({ingredients.length})
              </h3>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs text-[#9A3412] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={ing.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Ingredient name (e.g. Sourdough bread)"
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                    className="flex-3 px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917]"
                  />
                  <input
                    type="number"
                    step="any"
                    min="0"
                    placeholder="Qty"
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(idx, 'amount', Number(e.target.value))}
                    className="flex-1 px-2 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917] tabular-nums"
                  />
                  <input
                    type="text"
                    placeholder="Unit (cups, tbsp, g)"
                    value={ing.unit}
                    onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                    className="flex-1.5 px-2 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917]"
                  />
                  <select
                    value={ing.category}
                    onChange={(e) => handleUpdateIngredient(idx, 'category', e.target.value as Ingredient['category'])}
                    className="flex-1.5 px-2 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917]"
                  >
                    <option value="Produce">Produce</option>
                    <option value="Dairy & Eggs">Dairy</option>
                    <option value="Pantry & Oils">Pantry</option>
                    <option value="Spices & Herbs">Spices</option>
                    <option value="Meat & Seafood">Protein</option>
                    <option value="Bakery">Bakery</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-1.5 text-[#A8A29E] hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Step Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#E7E0D8]">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#9A3412]">
                03. Preparation Steps ({instructions.length})
              </h3>
              <button
                type="button"
                onClick={handleAddStep}
                className="text-xs text-[#9A3412] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-4">
              {instructions.map((step, idx) => (
                <div key={step.stepNumber} className="p-3 bg-white border border-[#E7E0D8] rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#9A3412]">
                      Step {step.stepNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-[#A8A29E] hover:text-red-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Step Title (e.g. Searing the Salmon)"
                    value={step.title || ''}
                    onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded bg-[#FAF7F2] text-[#1C1917]"
                  />

                  <textarea
                    rows={2}
                    required
                    placeholder="Detailed cooking technique and directions..."
                    value={step.text}
                    onChange={(e) => handleUpdateStep(idx, 'text', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded bg-[#FAF7F2] text-[#1C1917]"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Optional Timer (minutes)"
                      value={step.timerMinutes || ''}
                      onChange={(e) =>
                        handleUpdateStep(
                          idx,
                          'timerMinutes',
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="px-2.5 py-1.5 text-xs border border-[#E7E0D8] rounded bg-[#FAF7F2] text-[#1C1917] tabular-nums"
                    />
                    <input
                      type="text"
                      placeholder="Chef's Tip (optional)"
                      value={step.tip || ''}
                      onChange={(e) => handleUpdateStep(idx, 'tip', e.target.value)}
                      className="px-2.5 py-1.5 text-xs border border-[#E7E0D8] rounded bg-[#FAF7F2] text-[#1C1917]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Sommelier */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#9A3412] pb-1 border-b border-[#E7E0D8]">
              04. Sommelier & Tasting Notes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Wine or Beverage Pairing
                </label>
                <input
                  type="text"
                  value={winePairing}
                  onChange={(e) => setWinePairing(e.target.value)}
                  placeholder="e.g. Crisp Chablis or sparkling cider"
                  className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Chef's Nuance / Pro-Tip
                </label>
                <input
                  type="text"
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  placeholder="e.g. Serve immediately while gnocchi retain crisp edges"
                  className="w-full px-3 py-1.5 text-xs border border-[#E7E0D8] rounded-md bg-white text-[#1C1917]"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#E7E0D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D6D3D1] rounded-md text-xs font-medium text-[#44403C] hover:bg-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1C1917] hover:bg-[#292524] text-white rounded-md text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publish to Collection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
