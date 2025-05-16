
import React from "react";
import { ShoppingCart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

export default ProductCard;
