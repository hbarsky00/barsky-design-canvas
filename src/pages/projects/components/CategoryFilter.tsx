
import React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  isFilterOpen,
  setIsFilterOpen
}) => {
  return (
    <>
      <button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="ml-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle filters"
      >
        <Filter className="h-5 w-5 text-barsky-text" />
      </button>
      
      <div className={cn(
        "flex flex-wrap justify-center gap-3 transition-all duration-300 overflow-hidden",
        isFilterOpen ? "max-h-40 opacity-100 mb-8" : "max-h-0 opacity-0 mb-0"
      )}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
              activeCategory === category
                ? "bg-barsky-blue text-white"
                : "bg-gray-100 text-barsky-text hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
