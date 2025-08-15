import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Download, Package, CheckCircle, ArrowRight, Palette, Code, BookOpen, Lightbulb, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import ContactSection from '@/components/homepage/ContactSection';
import SEO from '@/components/SEO';

const Store = () => {
  const { toast } = useToast();

  const products = [
    {
      id: 'design-system',
      name: 'AI-Powered Design System',
      description: 'A comprehensive design system powered by AI, enabling you to create stunning user interfaces effortlessly.',
      price: 49.99,
      features: ['AI-assisted component generation', 'Automated style guide creation', 'Cross-platform compatibility'],
      icon: Palette,
      category: 'Design',
      badge: 'AI-Enhanced',
      rating: 4.8,
      downloads: 125,
      url: '/design-system',
    },
    {
      id: 'code-generator',
      name: 'AI Code Generator',
      description: 'Generate code snippets and full applications with the power of AI. Supports multiple languages and frameworks.',
      price: 79.99,
      features: ['AI-driven code completion', 'Automated bug detection', 'Multi-language support'],
      icon: Code,
      category: 'Development',
      badge: 'New',
      rating: 4.5,
      downloads: 88,
      url: '/code-generator',
    },
    {
      id: 'ux-ebook',
      name: 'UX Design E-Book',
      description: 'Learn the principles of UX design with our comprehensive e-book. Perfect for beginners and experienced designers alike.',
      price: 29.99,
      features: ['Comprehensive UX guide', 'Case studies', 'Interactive exercises'],
      icon: BookOpen,
      category: 'Design',
      badge: 'Bestseller',
      rating: 4.9,
      downloads: 210,
      url: '/ux-ebook',
    },
    {
      id: 'ai-guide',
      name: 'AI Integration Guide',
      description: 'Discover how to integrate AI into your projects with our step-by-step guide. Unlock the potential of artificial intelligence.',
      price: 59.99,
      features: ['AI integration strategies', 'Code examples', 'Best practices'],
      icon: Lightbulb,
      category: 'Development',
      badge: 'AI-Ready',
      rating: 4.7,
      downloads: 155,
      url: '/ai-guide',
    },
    {
      id: 'conversion-boost',
      name: 'Conversion Rate Optimization Toolkit',
      description: 'Boost your conversion rates with our powerful toolkit. Includes AI-driven analytics and optimization strategies.',
      price: 99.99,
      features: ['AI-driven analytics', 'A/B testing tools', 'Personalization strategies'],
      icon: Zap,
      category: 'Marketing',
      badge: 'Trending',
      rating: 4.6,
      downloads: 112,
      url: '/conversion-boost',
    },
    {
      id: 'target-analyzer',
      name: 'Target Audience Analyzer',
      description: 'Identify and analyze your target audience with our advanced analyzer. Powered by AI for accurate insights.',
      price: 69.99,
      features: ['AI-powered analysis', 'Demographic insights', 'Behavioral analysis'],
      icon: Target,
      category: 'Marketing',
      badge: 'AI-Powered',
      rating: 4.4,
      downloads: 95,
      url: '/target-analyzer',
    },
  ];

  const addToCart = (productName: string) => {
    toast({
      title: 'Added to cart!',
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <>
      <SEO
        title="AI-Powered Design & Development Assets | Barsky Design Store"
        description="Explore our collection of AI-powered design systems, code generators, and UX resources. Enhance your projects with cutting-edge AI technology."
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
        url="https://barskydesign.pro/store"
      />

      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Design & Development Assets
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection of AI-powered design systems, code generators, and UX resources.
              Enhance your projects with cutting-edge AI technology.
            </p>
          </motion.div>

          <Tabs defaultValue="design" className="w-full">
            <TabsList className="justify-center">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>
            <TabsContent value="design" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products
                  .filter((product) => product.category === 'Design')
                  .map((product) => (
                    <Card key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                          {product.name}
                          <Badge className="uppercase text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-1">
                            {product.badge}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-4">
                          {product.description}
                        </CardDescription>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <div className="flex items-center mt-4">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-500">{product.rating}</span>
                          <Download className="h-4 w-4 text-gray-500 ml-4 mr-1" />
                          <span className="text-sm text-gray-500">{product.downloads}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        <Button onClick={() => addToCart(product.name)}>
                          Add to Cart
                          <ShoppingCart className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="development" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products
                  .filter((product) => product.category === 'Development')
                  .map((product) => (
                    <Card key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                          {product.name}
                          <Badge className="uppercase text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-1">
                            {product.badge}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-4">
                          {product.description}
                        </CardDescription>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <div className="flex items-center mt-4">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-500">{product.rating}</span>
                          <Download className="h-4 w-4 text-gray-500 ml-4 mr-1" />
                          <span className="text-sm text-gray-500">{product.downloads}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        <Button onClick={() => addToCart(product.name)}>
                          Add to Cart
                          <ShoppingCart className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="marketing" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products
                  .filter((product) => product.category === 'Marketing')
                  .map((product) => (
                    <Card key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                          {product.name}
                          <Badge className="uppercase text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-1">
                            {product.badge}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-4">
                          {product.description}
                        </CardDescription>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <div className="flex items-center mt-4">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-500">{product.rating}</span>
                          <Download className="h-4 w-4 text-gray-500 ml-4 mr-1" />
                          <span className="text-sm text-gray-500">{product.downloads}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        <Button onClick={() => addToCart(product.name)}>
                          Add to Cart
                          <ShoppingCart className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <ContactSection />
      <Footer />
      <Toaster />
    </>
  );
};

export default Store;
