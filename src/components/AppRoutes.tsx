import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFoundPage } from '@/components/seo';

/**
 * Main application routes with SEO-optimized 404 handling
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Add your existing routes here */}
      
      {/* SEO-optimized 404 page */}
      <Route 
        path="*" 
        element={
          <NotFoundPage
            customTitle="Page Not Found - Hiram Barsky | Product Designer & Gen AI Developer New Jersey"
            customDescription="The page you're looking for doesn't exist. Explore my portfolio of product design and AI development work in New Jersey, or contact me for custom solutions."
            showSuggestions={true}
          />
        } 
      />
    </Routes>
  );
};