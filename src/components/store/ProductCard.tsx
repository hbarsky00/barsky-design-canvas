import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * The buy action used to be an "Add to Cart" button that fired a toast reading
 * "Added to your cart!" — there is no cart in this codebase, no checkout, and
 * no payment provider. Someone who tried to buy got a confirmation of nothing.
 * It now routes to contact, which is how these are actually sold today.
 *
 * The cover is typographic rather than an image: the previous art embedded
 * grey skeleton bars shaped like template content, which previewed a file that
 * does not exist in this repo.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative flex aspect-[16/7] flex-col justify-between bg-slate-900 p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/50">
            Template pack
          </p>
          <Badge className="bg-white/15 text-white">${product.price}</Badge>
        </div>
        <h2 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
          {product.name}
        </h2>
      </div>

      <CardContent className="flex-grow pt-6">
        <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-2 pb-5 pt-2">
        <Button asChild className="w-full">
          <Link to="/contact">
            Request this
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <p className="text-center text-xs leading-relaxed text-slate-500">
          Sold by request — tell me which one and I will send a payment link and the files.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
