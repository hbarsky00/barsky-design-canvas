import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/store/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Filter } from 'lucide-react';
import { products, categories } from '@/data/productsData';
import { trackPageView } from '@/lib/analytics';

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  React.useEffect(() => {
    trackPageView('/store', 'Digital Products Store | Barsky Design');
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-gradient-subtle">
          <div className="section-container">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Digital Products Store
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional templates and resources that helped me build a successful design career
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </motion.div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ProductGrid products={filteredProducts} />
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center bg-gradient-primary text-primary-foreground rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Need Something Custom?</h2>
              <p className="text-lg mb-6 opacity-90">
                Can't find what you're looking for? Let's create a custom solution for your specific needs.
              </p>
              <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ExternalLink className="w-4 h-4 mr-2" />
                Request Custom Work
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Store;
