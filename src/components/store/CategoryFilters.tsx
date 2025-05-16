
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/product";

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const MobileCategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  showFilters, 
  setShowFilters 
}) => {
  return (
    <div className="md:hidden mb-6">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-between"
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className="flex items-center">
          <Filter className="h-4 w-4 mr-2" /> 
          {categories.find(c => c.id === selectedCategory)?.name}
        </span>
        <span>{showFilters ? "▲" : "▼"}</span>
      </Button>
      
      {showFilters && (
        <div className="mt-2 border rounded-md shadow-sm">
          {categories.map(category => (
            <button
              key={category.id}
              className={`w-full text-left px-4 py-2 text-sm ${
                selectedCategory === category.id 
                  ? 'bg-barsky-blue/10 text-barsky-blue' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                setShowFilters(false);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const DesktopCategoryFilters: React.FC<Omit<CategoryFiltersProps, "showFilters" | "setShowFilters">> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="hidden md:block w-64 space-y-2">
      <h2 className="font-semibold text-lg mb-4">Categories</h2>
      {categories.map(category => (
        <button
          key={category.id}
          className={`w-full text-left px-4 py-2 rounded-md ${
            selectedCategory === category.id 
              ? 'bg-barsky-blue/10 text-barsky-blue' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
