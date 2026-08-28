import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Blog comments.
 *
 * Reads come from `comments_public`, a view that exposes only approved rows and
 * none of the personal data — no email, no ip hash, no user agent. The
 * `comments` table itself denies anon entirely, so nothing here can read an
 * unapproved comment even if this component asked for one.
 *
 * Writes never touch Supabase from the browser. They POST to a Netlify function
 * that verifies a Cloudflare Turnstile token server-side first. Every comment is
 * stored unapproved and appears only after Hiram approves it.
 */
type PublicComment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string } }
}

const Comments: React.FC<{ slug: string }> = ({ slug }) => {
  const [items, setItems] = useState<PublicComment[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const openedAt = useRef(Date.now());
  const widget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    supabase
      .from("comments_public")
      .select("id,author_name,body,created_at")
      .eq("post_slug", slug)
      .then(({ data }) => { if (alive && data) setItems(data as PublicComment[]); });
    return () => { alive = false; };
  }, [slug]);

  // Turnstile renders itself once its script has loaded; the script tag lives in
  // index.html so it is fetched once per session rather than per post.
  useEffect(() => {
    if (!SITE_KEY || !widget.current) return;
    let tries = 0;
    const id = setInterval(() => {
      if (window.turnstile && widget.current && !widget.current.childElementCount) {
        window.turnstile.render(widget.current, { sitekey: SITE_KEY, callback: setToken });
        clearInterval(id);
      }
      if (++tries > 40) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending"); setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/.netlify/functions/post-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postSlug: slug,
        name: f.get("name"),
        email: f.get("email"),
        body: f.get("body"),
        website: f.get("website"),          // honeypot
        elapsedMs: Date.now() - openedAt.current,
        token,
      }),
    }).catch(() => null);

    if (res && res.ok) { setState("done"); return; }
    const reason = res ? (await res.json().catch(() => ({}))).reason : "network";
    setState("error");
    setError(
      reason === "human-check-failed" ? "The human check didn't pass. Try again."
      : reason === "too-many-links"   ? "Too many links — please keep it under three."
      : reason === "rate-limited"     ? "That's a few comments in a short window. Try again shortly."
      : reason === "not-configured"   ? "Comments aren't switched on yet."
      : "That didn't send. Try again in a moment."
    );
  };

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="font-display text-2xl font-bold text-foreground">
        Comments{items.length ? ` (${items.length})` : ""}
      </h2>

      {items.length > 0 && (
        <ul className="mt-6 space-y-6 list-none p-0">
          {items.map((c) => (
            <li key={c.id} className="rounded-xs border border-border bg-card p-5">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">{c.body}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {c.author_name} · {new Date(c.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {state === "done" ? (
        <p className="mt-6 rounded-xs border border-border bg-card p-5 text-muted-foreground">
          Thanks — your comment is in. I read every one before it goes up, so it'll appear once I've had a look.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-8 grid gap-4 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            Comments are read before they're published, so yours won't appear straight away.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-foreground">Name</span>
              <input name="name" required maxLength={80}
                className="rounded-xs border border-border bg-background px-3 py-2 text-base" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-foreground">Email <span className="text-muted-foreground">(optional, never shown)</span></span>
              <input name="email" type="email" maxLength={200}
                className="rounded-xs border border-border bg-background px-3 py-2 text-base" />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-foreground">Comment</span>
            <textarea name="body" required rows={5} maxLength={4000}
              className="rounded-xs border border-border bg-background px-3 py-2 text-base" />
          </label>

          {/* honeypot — off-screen rather than display:none, which some bots skip */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>

          {SITE_KEY ? <div ref={widget} className="mt-1" />
                    : <p className="text-sm text-muted-foreground">Comments aren't switched on yet.</p>}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button type="submit" disabled={state === "sending" || !SITE_KEY}
            className="justify-self-start rounded-xs bg-primary px-5 py-2.5 font-semibold text-primary-foreground disabled:opacity-50">
            {state === "sending" ? "Sending…" : "Post comment"}
          </button>
        </form>
      )}
    </section>
  );
};

export default Comments;
