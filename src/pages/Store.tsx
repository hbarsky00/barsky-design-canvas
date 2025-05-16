
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, Filter, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPageView } from "@/lib/analytics";
import { toast } from "sonner";

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

// Sample products data
const products: Product[] = [
  {
    id: "figma-system",
    name: "Complete Design System Figma File",
    description: "Professional design system with comprehensive component library, light/dark mode, responsive layouts, and detailed documentation. Perfect for startups and design teams.",
    price: 129,
    image: "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png",
    category: "templates",
    badge: "Premium"
  },
  {
    id: "1",
    name: "UX Research Template",
    description: "A comprehensive template for conducting user research interviews and synthesizing findings.",
    price: 49,
    image: "/lovable-uploads/2d1a328c-29eb-4d8a-97d5-3d6d9977a4f3.png",
    category: "templates"
  },
  {
    id: "2",
    name: "Design System Starter",
    description: "Jump-start your design system with this comprehensive Figma template.",
    price: 79,
    image: "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png",
    category: "templates"
  },
  {
    id: "3",
    name: "Wireframe Kit",
    description: "200+ wireframing components to quickly prototype your next digital product.",
    price: 59,
    image: "/lovable-uploads/6edd294a-5638-4a33-9e90-34a3341ddeaf.png",
    category: "ui-kits"
  },
  {
    id: "4",
    name: "Mobile UI Kit",
    description: "A comprehensive mobile UI kit with 300+ components for iOS and Android.",
    price: 89,
    image: "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png",
    category: "ui-kits"
  },
  {
    id: "5",
    name: "UX Writing Guide",
    description: "The ultimate guide to writing effective UX copy for your digital products.",
    price: 39,
    image: "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png",
    category: "guides"
  },
  {
    id: "6",
    name: "Animation Principles eBook",
    description: "Learn how to create meaningful animations that enhance user experience.",
    price: 29,
    image: "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png",
    category: "guides"
  }
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "templates", name: "Templates" },
  { id: "ui-kits", name: "UI Kits" },
  { id: "guides", name: "Guides & eBooks" }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to your cart!`);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-barsky-blue text-white flex items-center gap-1 px-2 py-1">
              <Award className="h-3 w-3" />
              {product.badge}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <Badge>${product.price}</Badge>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  React.useEffect(() => {
    trackPageView('/store', 'Store - Hiram Barsky');
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Store | Hiram Barsky | Design Resources</title>
        <meta name="description" content="Shop for design resources, templates, UI kits, and guides to enhance your design workflow." />
        <link rel="canonical" href="https://hirambarsky.com/store" />
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12">
          <div className="section-container">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Design Resource Store</h1>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Browse my collection of premium design resources to enhance your workflow and create exceptional digital experiences.
              </p>
            </div>
            
            {/* Filters for mobile */}
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
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Sidebar Filters */}
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
              
              {/* Product Grid */}
              <div className="flex-grow">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-300">No products found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
