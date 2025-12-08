
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.18.0";

// Set up CORS headers for browser security
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { product } = await req.json();
    
    // Validate the required fields
    if (!product?.name || !product?.price) {
      throw new Error("Product name and price are required");
    }

    // Validate price is a positive number within reasonable bounds
    const price = Number(product.price);
    if (isNaN(price) || price <= 0 || price > 999999.99) {
      throw new Error("Invalid price: must be a positive number up to 999999.99");
    }

    // Validate product name length and format
    const productName = String(product.name).trim();
    if (productName.length < 1 || productName.length > 200) {
      throw new Error("Product name must be between 1 and 200 characters");
    }

    // Validate product description if provided
    const productDescription = product.description ? String(product.description).trim().slice(0, 500) : "";

    // Validate product ID format if provided
    if (product.id && (typeof product.id !== 'string' || product.id.length > 100)) {
      throw new Error("Invalid product ID format");
    }

    // Initialize Stripe with the secret key
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("Stripe secret key is not configured");
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: productDescription,
              images: product.image ? [String(product.image).slice(0, 2000)] : [],
            },
            unit_amount: Math.round(price * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin") || "https://barskydesign.pro"}/store?success=true`,
      cancel_url: `${req.headers.get("origin") || "https://barskydesign.pro"}/store/product/${encodeURIComponent(product.id || '')}?canceled=true`,
    });

    // Return the session URL for the client to redirect to
    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Stripe API error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while creating the checkout session",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
