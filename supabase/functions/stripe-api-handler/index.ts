
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
              name: product.name,
              description: product.description || "",
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin") || "https://barskydesign.pro"}/store?success=true`,
      cancel_url: `${req.headers.get("origin") || "https://barskydesign.pro"}/store/product/${product.id}?canceled=true`,
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
