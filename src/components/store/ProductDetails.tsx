
import React from "react";
import { ShoppingCart, Award, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to your cart!`);
  };

  const handleCheckout = async () => {
    try {
      toast.info("Redirecting to checkout...");
      
      // In a real implementation, this would call your backend
      // For example: const response = await fetch('/api/create-checkout-session', {...})
      
      // For demo purposes, we'll simulate a redirect to Stripe
      setTimeout(() => {
        window.location.href = `https://checkout.stripe.com/pay/cs_test_demo?productName=${encodeURIComponent(product.name)}&amount=${product.price * 100}`;
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/store" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-barsky-blue">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Store
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-lg relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-barsky-blue text-white flex items-center gap-1 px-2 py-1">
                <Award className="h-3 w-3" />
                {product.badge}
              </Badge>
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Badge className="text-lg py-1 px-3">${product.price}</Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-8">{product.description}</p>
            
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="space-y-2 mb-8">
              <li className="flex items-start">
                <span className="text-barsky-blue mr-2">•</span>
                <span>Professional design system with comprehensive component library</span>
              </li>
              <li className="flex items-start">
                <span className="text-barsky-blue mr-2">•</span>
                <span>Light and dark mode variations</span>
              </li>
              <li className="flex items-start">
                <span className="text-barsky-blue mr-2">•</span>
                <span>Responsive layouts for all screen sizes</span>
              </li>
              <li className="flex items-start">
                <span className="text-barsky-blue mr-2">•</span>
                <span>Detailed documentation included</span>
              </li>
              <li className="flex items-start">
                <span className="text-barsky-blue mr-2">•</span>
                <span>Fully customizable with organized layers</span>
              </li>
            </ul>
            
            <div className="flex flex-col space-y-4">
              <Button className="w-full py-6 text-lg" onClick={handleCheckout}>
                <CreditCard className="h-5 w-5 mr-2" /> Checkout (${product.price})
              </Button>
              
              <Button variant="outline" className="w-full py-6 text-lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <h3 className="font-medium mb-2">Delivery Information</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              After purchase, you will receive an email with a download link to access your design files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
