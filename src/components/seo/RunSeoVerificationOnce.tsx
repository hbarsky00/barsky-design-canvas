import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const RunSeoVerificationOnce = () => {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      let attempts = 0;
      while (attempts < 4 && !cancelled) {
        attempts++;
        try {
          const { data, error } = await supabase.functions.invoke("seo-verify");
          if (error) {
            console.error("[SEO_VERIFY_ERROR]", error);
          } else if (data) {
            console.log("[SEO_VERIFY_JSON]", JSON.stringify(data));
            sessionStorage.setItem("seo_verify_ran", "1");
            return;
          }
        } catch (e) {
          console.error("[SEO_VERIFY_EXCEPTION]", e);
        }
        // Backoff before retry
        await new Promise((res) => setTimeout(res, attempts * 500));
      }
    };

    const flag = sessionStorage.getItem("seo_verify_ran");
    if (flag !== "1") run();

    return () => { cancelled = true; };
  }, []);

  return null;
};

export default RunSeoVerificationOnce;
