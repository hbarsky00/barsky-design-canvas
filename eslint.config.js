import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      // Anti-hardcode SEO rules.
      //
      // These were written with JavaScript inside the selector string —
      // "[openingElement.attributes.some(attr => ...)]" — which is not valid
      // esquery. eslint threw a SyntaxError building the rule listener on every
      // file, so `npm run lint` was dead repo-wide and nothing had been linted
      // in a long time. esquery cannot filter on an attribute's value, so the
      // check is now simply "no <meta>, <link> or <Helmet> in a component",
      // with src/utils/seo/** and UnifiedSEO.tsx exempted at the bottom of this
      // file — they are the sanctioned emitters.
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXElement[openingElement.name.name='meta']",
          message: "Use UnifiedSEO/seoBuilder for meta tags. Do not hardcode <meta> in components.",
        },
        {
          selector: "JSXElement[openingElement.name.name='link']",
          message: "Canonical and other <link> tags must be emitted by UnifiedSEO/seoBuilder.",
        },
        {
          selector: "JSXElement[openingElement.name.name='Helmet']",
          message: "Use UnifiedSEO instead of direct Helmet usage for SEO meta tags.",
        },
      ],
    },
  },
  {
    files: [
      "src/utils/seo/**/*",
      "supabase/functions/seo-handler/**/*",
      "src/components/seo/UnifiedSEO.tsx",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  }
);
