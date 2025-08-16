import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ShoppingCart, Star, Zap, Crown, CheckCircle, 
         TrendingUp, Users, Target, Sparkles, Calendar, Clock, 
         Award, Eye, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, Category } from "@/types/product";
import { toast } from "sonner";

const products: Product[] = [
  {
    id: "1",
    name: "AI-Powered UX Audit",
    description: "Get a comprehensive UX audit powered by AI to identify areas for improvement and boost conversions.",
    price: 499,
    image: "/store-images/ux-audit.png",
    category: "Audits",
    badge: "AI"
  },
  {
    id: "2",
    name: "Landing Page Redesign",
    description: "Let our AI redesign your landing page to maximize conversions and engagement.",
    price: 999,
    image: "/store-images/landing-page.png",
    category: "Redesign",
    badge: "AI"
  },
  {
    id: "3",
    name: "MVP Validation Package",
    description: "Validate your MVP with real user feedback and data-driven insights.",
    price: 799,
    image: "/store-images/mvp-validation.png",
    category: "Validation",
    badge: "New"
  },
  {
    id: "4",
    name: "Website Conversion Boost",
    description: "Optimize your website for higher conversions with our proven strategies.",
    price: 699,
    image: "/store-images/conversion-boost.png",
    category: "Optimization",
    badge: "Trending"
  },
  {
    id: "5",
    name: "LinkedIn Profile Optimization",
    description: "Attract more clients and opportunities with a professionally optimized LinkedIn profile.",
    price: 299,
    image: "/store-images/linkedin-profile.png",
    category: "Optimization",
    badge: "Popular"
  },
  {
    id: "6",
    name: "AI-Enhanced Marketing Strategy",
    description: "Leverage AI to create a data-driven marketing strategy that delivers results.",
    price: 599,
    image: "/store-images/marketing-strategy.png",
    category: "Strategy",
    badge: "AI"
  },
  {
    id: "7",
    name: "Custom AI Solutions",
    description: "Tailored AI solutions to solve your unique business challenges.",
    price: 1499,
    image: "/store-images/ai-solutions.png",
    category: "AI Solutions",
    badge: "Exclusive"
  },
  {
    id: "8",
    name: "E-commerce Conversion Audit",
    description: "Maximize your e-commerce sales with our expert conversion audit.",
    price: 899,
    image: "/store-images/ecommerce-audit.png",
    category: "Audits",
    badge: "E-commerce"
  },
  {
    id: "9",
    name: "Mobile App UX Review",
    description: "Improve your mobile app's user experience with our comprehensive review.",
    price: 799,
    image: "/store-images/mobile-ux.png",
    category: "Audits",
    badge: "Mobile"
  },
  {
    id: "10",
    name: "AI-Driven Content Creation",
    description: "Generate high-quality content with the power of AI.",
    price: 399,
    image: "/store-images/ai-content.png",
    category: "Content",
    badge: "AI"
  }
];

const categories: Category[] = [
  { id: "1", name: "All" },
  { id: "2", name: "Audits" },
  { id: "3", name: "Redesign" },
  { id: "4", name: "Validation" },
  { id: "5", name: "Optimization" },
  { id: "6", name: "Strategy" },
  { id: "7", name: "AI Solutions" },
  { id: "8", name: "Content" }
];

const Store: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [cartItems, setCartItems] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    if (sortBy === "Price: Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  const addToCart = (productId: string) => {
    setCartItems(prevItems => {
      if (prevItems.includes(productId)) {
        toast.warning("Item already in cart!");
        return prevItems;
      } else {
        toast.success("Item added to cart!");
        return [...prevItems, productId];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      toast.info("Item removed from cart.");
      return prevItems.filter(id => id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!");
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      return product ? total + product.price : total;
    }, 0);
  }, [cartItems]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <main className="pt-24 pb-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                Explore Our Services
              </h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.message(`Cart Total: $${cartTotal}`)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cartItems.length})
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </h2>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-gray-700 mb-2">
                        Sort By
                      </h2>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Popularity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Popularity">Popularity</SelectItem>
                          <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
                          <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="secondary" className="w-full" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <motion.div
                    key={product.id}
                    className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-700">
                          ${product.price}
                        </span>
                        <Button onClick={() => addToCart(product.id)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    {product.badge && (
                      <Badge className="absolute top-3 right-3">
                        {product.badge}
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Store;
