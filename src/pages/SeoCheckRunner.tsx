import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SeoCheckRunner: React.FC = () => {
  const [json, setJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("/");
  const [loading, setLoading] = useState(false);

  const runCheck = async (targetSlug: string) => {
    setLoading(true);
    setError(null);
    setJson(null);
    
    try {
      const FUNCTIONS_URL = "https://ctqttomppgkjbjkckise.functions.supabase.co";
      const SITE_URL = "https://barskydesign.pro";
      
      // Normalize input
      let raw = targetSlug.trim();
      if (!raw) raw = "/";
      if (raw.startsWith("/")) raw = SITE_URL + raw;
      if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;
      
      const url = `${FUNCTIONS_URL}/seo-verify?target_url=${encodeURIComponent(raw)}`;
      
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      
      setJson(data);
      console.log("[SEO_VERIFY_JSON]", JSON.stringify(data, null, 2));
      
      if (!data.ok) {
        setError(data.hint || data.error || data.message || "Verification reported an issue.");
      }
    } catch (e: any) {
      setError(e?.message || "Unknown error");
      console.error("[SEO_VERIFY_ERROR]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-run on mount with default slug
    runCheck(slug);
  }, []);

  const handleCheck = () => {
    runCheck(slug);
  };

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">SEO Verification (Edge Function)</h1>
      
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">
          Quick spot-check for live SEO tags. For comprehensive verification, use build-time scripts.
        </p>
        <p className="text-xs text-muted-foreground">
          You can enter a full URL (https://barskydesign.pro/) or just a path (/project/herbalink). We'll normalize it for you.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="/path/to/check"
          className="flex-1"
        />
        <Button onClick={handleCheck} disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
          <h2 className="text-lg font-semibold text-destructive mb-2">Error</h2>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {json && (
        <div className="space-y-4">
          {json.ok ? (
            <>
              <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  ✓ Successfully checked: {json.target}
                </p>
              </div>

              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">SEO Tags</h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-muted-foreground">Title:</dt>
                      <dd>{json.seo.title || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Description:</dt>
                      <dd>{json.seo.description || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Canonical:</dt>
                      <dd>{json.seo.canonical || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Open Graph Tags</h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-muted-foreground">OG Title:</dt>
                      <dd>{json.seo.ogTitle || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">OG Description:</dt>
                      <dd>{json.seo.ogDesc || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">OG Image:</dt>
                      <dd className="break-all">{json.seo.ogImage || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <details className="p-4 border rounded-lg">
                <summary className="cursor-pointer font-semibold">Raw JSON</summary>
                <pre className="mt-4 text-xs overflow-auto">{JSON.stringify(json, null, 2)}</pre>
              </details>
            </>
          ) : (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <h2 className="text-lg font-semibold text-destructive mb-2">Verification Failed</h2>
              <p className="text-sm">{json.error}</p>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="text-center text-muted-foreground">
          Running verification...
        </div>
      )}
    </main>
  );
};

export default SeoCheckRunner;
