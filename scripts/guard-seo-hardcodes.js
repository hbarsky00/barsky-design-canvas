// scripts/guard-seo-hardcodes.js
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const APPROVED = new Set([
  path.normalize("prerender.js"),
  path.normalize("src/utils/seo/seoBuilder.ts"),
  path.normalize("src/data/seoData.ts"),
  path.normalize("scripts/validate-seo-build.js"),
  path.normalize("scripts/guard-seo-hardcodes.js"),
  // add server-only SEO files here if needed:
  // path.normalize("supabase/functions/seo-handler/index.ts"),
]);

const SCAN_DIRS = ["src", "app", "components", "public", "" /* project root */];
const IGNORE_DIRS = new Set([
  "node_modules", "dist", "build", ".git", ".cache", ".vite",
  ".netlify", ".vercel", ".parcel-cache", ".turbo", "coverage"
]);

// Multiline-safe regexes
const META_RE = /<meta\s+[^>]*\b(?:name|property)\s*=\s*["']\s*(?:og:[^"']*|twitter:[^"']*|description|robots|article:[^"']*)\s*["'][^>]*>/ims;
const CANON_RE = /<link\s+[^>]*\brel\s*=\s*["']\s*canonical\s*["'][^>]*>/ims;
const HELMET_RE = /<\s*Helmet\b[^>]*_
