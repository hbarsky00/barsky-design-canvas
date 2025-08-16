import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Download, CheckCircle, ExternalLink } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "UX Audit Checklist",
    description: "Comprehensive 50-point checklist for conducting professional UX audits",
    price: 29,
    originalPrice: 49,
    rating: 4.9,
    reviews: 127,
    image: "/lovable-uploads/checklist-preview.png",
    downloadCount: "500+",
    category: "Template",
    features: [
      "50-point comprehensive checklist",
      "Client presentation template",
      "Actionable recommendations guide",
      "Bonus: Video walkthrough"
    ]
  },
  {
    id: 2,
    name: "Conversion Optimization Playbook",
    description: "Step-by-step guide to increase your website conversions by 40%+",
    price: 97,
    originalPrice: 147,
    rating: 4.8,
    reviews: 89,
    image: "/lovable-uploads/playbook-preview.png",
    downloadCount: "300+",
    category: "Guide",
    features: [
      "80-page comprehensive guide",
      "Real case study examples",
      "A/B testing templates",
      "ROI calculation worksheets"
    ]
  },
  {
    id: 3,
    name: "Design System Starter Kit",
    description: "Professional design system template for rapid product development",
    price: 149,
    originalPrice: 249,
    rating: 5.0,
    reviews: 64,
    image: "/lovable-uploads/design-system-preview.png",
    downloadCount: "200+",
    category: "Template",
    features: [
      "Complete Figma design system",
      "React component library",
      "Documentation template",
      "Brand guidelines starter"
    ]
  }
];

const Store: React.FC = () => {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Digital Products Store
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional templates, guides, and resources to accelerate your design and development workflow
              </p>
            </motion.div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Download className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Product Preview</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Category & Downloads */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {product.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{product.downloadCount} downloads</span>
                    </div>

                    {/* Title & Rating */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        Save ${product.originalPrice - product.price}
                      </Badge>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Need Something Custom?</h2>
              <p className="text-lg mb-6 opacity-90">
                Can't find what you're looking for? Let's create a custom solution for your specific needs.
              </p>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                <ExternalLink className="w-4 h-4 mr-2" />
                Request Custom Work
              </Button>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Store;
