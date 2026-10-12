import React, { useState } from 'react';
import { ShoppingItem } from '../types/recipe';
import { X, Trash2, Check, Plus, Copy, Printer, ShoppingBag } from 'lucide-react';

interface ShoppingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (name: string, category: string) => void;
  onClearChecked: () => void;
  onClearAll: () => void;
}

export const ShoppingListDrawer: React.FC<ShoppingListDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onToggleItem,
  onDeleteItem,
  onAddItem,
  onClearChecked,
  onClearAll,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOpen) return null;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItem(newItemName.trim(), newItemCategory);
    setNewItemName('');
  };

  const copyToClipboard = () => {
    const text = items
      .map((item) => `[${item.checked ? 'x' : ' '}] ${item.name} (${item.amount || ''})`)
      .join('\n');
    navigator.clipboard.writeText(`Culinaria Grocery List:\n\n${text}`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Group items by category
  const categories = Array.from(new Set(items.map((i) => i.category || 'Pantry & Essentials')));
  const completedCount = items.filter((i) => i.checked).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E7E0D8]">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E7E0D8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9A3412]" />
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              Shopping List
            </h2>
            <span className="text-xs text-[#78716C] ml-1">
              ({items.length} items)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions toolbar */}
        {items.length > 0 && (
          <div className="px-6 py-2.5 bg-[#F5EFEB] border-b border-[#E7E0D8] flex items-center justify-between text-xs text-[#78716C]">
            <span>
              {completedCount} of {items.length} collected
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="hover:text-[#1C1917] flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy formatted list"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedNotification ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="hover:text-[#1C1917] flex items-center gap-1 cursor-pointer transition-colors"
                title="Print list"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              {completedCount > 0 && (
                <button
                  onClick={onClearChecked}
                  className="text-[#9A3412] hover:underline cursor-pointer"
                >
                  Clear Checked
                </button>
              )}
            </div>
          </div>
        )}

        {/* Items List Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#A8A29E] space-y-3">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] opacity-60" />
              <p className="font-serif text-base text-[#1C1917]">Your basket is empty</p>
              <p className="text-xs max-w-xs">
                Explore recipes in the anthology and click "Add to Shopping List" to automatically gather ingredients.
              </p>
            </div>
          ) : (
            categories.map((cat) => {
              const catItems = items.filter((i) => (i.category || 'Pantry & Essentials') === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-2">
                  <h3 className="font-mono text-xs font-semibold text-[#78716C] uppercase tracking-wider pb-1 border-b border-[#E7E0D8]">
                    {cat}
                  </h3>
                  <ul className="space-y-1">
                    {catItems.map((item) => (
                      <li
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded transition-colors group ${
                          item.checked ? 'bg-[#F5EFEB]/50 text-[#A8A29E]' : 'hover:bg-white text-[#1C1917]'
                        }`}
                      >
                        <div
                          onClick={() => onToggleItem(item.id)}
                          className="flex items-center gap-2.5 flex-1 cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                              item.checked
                                ? 'bg-[#C26D38] border-[#C26D38] text-white'
                                : 'border-[#D6D3D1] bg-white'
                            }`}
                          >
                            {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <div className="flex flex-col">
                            <span className={`text-xs sm:text-sm ${item.checked ? 'line-through' : 'font-medium'}`}>
                              {item.name}
                            </span>
                            {item.amount && (
                              <span className="text-[11px] text-[#78716C] font-mono">
                                {item.amount}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#A8A29E] hover:text-red-600 transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        {/* Add custom item form */}
        <form onSubmit={handleAddNew} className="p-4 border-t border-[#E7E0D8] bg-white space-y-2">
          <span className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider block">
            Add Custom Ingredient
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="e.g. Flaky sea salt, 2 limes..."
              className="flex-1 px-3 py-2 text-xs border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] text-[#1C1917]"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="px-2 py-2 text-xs border border-[#E7E0D8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C26D38] text-[#1C1917] bg-[#FAF7F2]"
            >
              <option value="Produce">Produce</option>
              <option value="Dairy & Eggs">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Pantry & Oils">Pantry</option>
              <option value="Spices & Herbs">Spices</option>
              <option value="Meat & Seafood">Protein</option>
            </select>
            <button
              type="submit"
              className="px-3 py-2 bg-[#1C1917] hover:bg-[#292524] text-white rounded-md text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
              title="Add item"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Bottom Drawer Footer */}
        {items.length > 0 && (
          <div className="px-6 py-3 border-t border-[#E7E0D8] bg-[#FAF7F2] flex items-center justify-between text-xs">
            <button
              onClick={onClearAll}
              className="text-[#78716C] hover:text-red-700 transition-colors cursor-pointer"
            >
              Clear All Items
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1C1917] text-white rounded-md font-medium hover:bg-[#292524] transition-colors cursor-pointer"
            >
              Close Basket
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
