import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/store/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      
      <main id="main-content" className="flex-grow pt-24">
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
                Templates for the two things designers keep rewriting from scratch: case
                studies and the posts that point at them.
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
                  variant={selectedCategory === category.id ? "filled" : "outline"}
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
            {/* Context. The page was 161 words — a heading, two product cards and a
                dead button — so it gave a buyer nothing to decide on. */}
            <div className="max-w-3xl mx-auto mt-16 space-y-12">
              <section id="why-these">
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">Why these exist</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Most portfolio case studies fail the same way. They describe a process
                    — discover, define, design, deliver — and never say what was actually
                    at stake, what the constraint was, or what the designer decided when
                    two good options conflicted. A reader finishes it knowing the method
                    and nothing about the judgement.
                  </p>
                  <p>
                    Hiring managers read for the decisions. What did you choose not to
                    build? What did the research change? What broke, and what did you do
                    about it? A template cannot supply those answers, but it can put the
                    questions in front of you in the order that makes them answerable,
                    which is most of why a blank page is so hard to start.
                  </p>
                  <p>
                    That is what these are: structure, with the prompts that force the
                    specifics. I wrote them for my own work first, then kept using them.
                  </p>
                </div>
              </section>

              <section id="who-for">
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">Who they suit</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Designers writing up work they have already done and getting stuck on
                    how to frame it. People moving into product design who have shipped
                    things but never presented them as case studies. Anyone whose portfolio
                    gets views and no replies.
                  </p>
                  <p>
                    They will not help if you have no work to write about yet. Build
                    something small and real first — that is a genuinely better use of the
                    same afternoon, and it costs nothing.
                  </p>
                </div>
              </section>

              <section id="read-first">
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">Read this first — it's free</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Before buying anything, read the posts. They cover the same ground and
                    may be all you need.
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="leading-relaxed">
                    <Link to="/blog/case-study-writing" className="text-primary font-semibold underline underline-offset-2">How to write a case study</Link>
                    <span className="text-muted-foreground"> — the structure these templates follow.</span>
                  </li>
                  <li className="leading-relaxed">
                    <Link to="/blog/everyones-portfolio-looks-good-now" className="text-primary font-semibold underline underline-offset-2">Everyone's portfolio looks good now</Link>
                    <span className="text-muted-foreground"> — why visual polish stopped being a differentiator.</span>
                  </li>
                  <li className="leading-relaxed">
                    <Link to="/blog/a-to-do-app-doesnt-prove-anything" className="text-primary font-semibold underline underline-offset-2">A to-do app doesn't prove anything</Link>
                    <span className="text-muted-foreground"> — picking work that is worth writing up.</span>
                  </li>
                </ul>
              </section>
            </div>

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
              <Button asChild variant="on-dark">
                <Link to="/contact">
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  Request Custom Work
                </Link>
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
