
import React from "react";
import { BlogPost } from "@/data/blogPosts";

interface TableOfContentsProps {
  items?: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  content?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, content }) => {
  // If no items provided, extract from content
  const tocItems = items || [];

  if (tocItems.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`}
              className={`block text-sm hover:text-blue-600 transition-colors ${
                item.level === 2 ? 'font-medium' : 'text-gray-600 ml-4'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
