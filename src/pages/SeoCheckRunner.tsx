import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SeoCheckRunner: React.FC = () => {
  const [json, setJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("/");
  const [loading, setLoading] = useState(false);

  const runCheck = async (raw: string) => {
    setLoading(true);
    setError(null);
    setJson(null);
    
    try {
      const FUNCTIONS_URL = "https://ctqttomppgkjbjkckise.functions.supabase.co";
      const slug = (raw || "/").trim() || "/";
      const url = `${FUNCTIONS_URL}/seo-verify?slug=${encodeURIComponent(slug)}`;
      
      const r = await fetch(url, { method: "GET" });
      const data = await r.json();
      
      setJson(data);
      console.log("[SEO_VERIFY_JSON]", JSON.stringify(data, null, 2));
      
      setError(data.ok ? "" : data.error || data.message || "Verification reported an issue.");
    } catch (e: any) {
      setError(e?.message || "Network error");
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
      <h1 className="text-3xl font-bold mb-4">SEO Verification (DB-Backed)</h1>
      
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">
          Verifies SEO data from your database (source of truth). Live HTML fetch is optional.
        </p>
        <p className="text-xs text-muted-foreground">
          Enter a path like <code>/</code>, <code>/project/herbalink</code>, or <code>/blog/post-slug</code>
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
        <Button onClick={handleCheck} disabled={loading} variant="filled" className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                  ✓ Found in database: {json.slug} ({json.path_input})
                </p>
              </div>

              <div className="grid gap-4">
                {/* Expected (from DB) */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary">Expected (from DB)</h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-muted-foreground">Title:</dt>
                      <dd>{json.expected.title || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Description:</dt>
                      <dd>{json.expected.description || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Canonical:</dt>
                      <dd className="break-all">{json.expected.canonical || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">OG Image:</dt>
                      <dd className="break-all">{json.expected.og_image_url || <span className="text-destructive">Missing</span>}</dd>
                    </div>
                  </dl>
                </div>

                {/* Live (from HTML) - optional */}
                {json.live && !json.live.note && (
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Live (from HTML)</h3>
                    <p className="text-xs text-muted-foreground mb-2">Fetched from: {json.live.target} (status: {json.live.status})</p>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="font-medium text-muted-foreground">Title:</dt>
                        <dd className={json.live.title !== json.expected.title ? "text-amber-600" : ""}>
                          {json.live.title || <span className="text-destructive">Missing</span>}
                          {json.live.title && json.live.title !== json.expected.title && <span className="ml-2 text-xs">⚠️ Differs from DB</span>}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Description:</dt>
                        <dd className={json.live.description !== json.expected.description ? "text-amber-600" : ""}>
                          {json.live.description || <span className="text-destructive">Missing</span>}
                          {json.live.description && json.live.description !== json.expected.description && <span className="ml-2 text-xs">⚠️ Differs from DB</span>}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Canonical:</dt>
                        <dd className={`break-all ${json.live.canonical !== json.expected.canonical ? "text-amber-600" : ""}`}>
                          {json.live.canonical || <span className="text-destructive">Missing</span>}
                          {json.live.canonical && json.live.canonical !== json.expected.canonical && <span className="ml-2 text-xs">⚠️ Differs from DB</span>}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">OG Image:</dt>
                        <dd className={`break-all ${json.live.ogImage !== json.expected.og_image_url ? "text-amber-600" : ""}`}>
                          {json.live.ogImage || <span className="text-destructive">Missing</span>}
                          {json.live.ogImage && json.live.ogImage !== json.expected.og_image_url && <span className="ml-2 text-xs">⚠️ Differs from DB</span>}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}

                {json.live?.note && (
                  <div className="p-4 border border-dashed rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Live HTML fetch was skipped or failed (non-fatal). Showing DB values only.
                    </p>
                  </div>
                )}
              </div>

              <details className="p-4 border rounded-lg">
                <summary className="cursor-pointer font-semibold">Raw JSON</summary>
                <pre className="mt-4 text-xs overflow-auto">{JSON.stringify(json, null, 2)}</pre>
              </details>
            </>
          ) : (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <h2 className="text-lg font-semibold text-destructive mb-2">Verification Failed</h2>
              <p className="text-sm mb-2">{json.error}</p>
              {json.tip && <p className="text-xs text-muted-foreground">{json.tip}</p>}
              {json.slug && <p className="text-xs text-muted-foreground">Searched for slug: {json.slug}</p>}
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
