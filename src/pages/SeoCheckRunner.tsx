import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SeoCheckRunner: React.FC = () => {
  const [json, setJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const FUNCTIONS_URL = "https://ctqttomppgkjbjkckise.functions.supabase.co";
        const response = await fetch(`${FUNCTIONS_URL}/seo-verify`, {
          method: "GET",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setJson(data);
        console.log("[SEO_VERIFY_JSON]", JSON.stringify(data, null, 2));
      } catch (e: any) {
        setError(e?.message || "Unknown error");
        console.error("[SEO_VERIFY_ERROR]", e);
      }
    })();
  }, []);

  if (error) {
    return (
      <main className="container mx-auto p-6">
        <h1>SEO Verification</h1>
        <p>Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <h1>SEO Verification</h1>
      <pre>{json ? JSON.stringify(json, null, 2) : "Running..."}</pre>
    </main>
  );
};

export default SeoCheckRunner;
