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
      // Anti-hardcode SEO rules
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXElement[openingElement.name.name='meta'][openingElement.attributes.some(attr => attr.name && (attr.name.name === 'name' || attr.name.name === 'property') && attr.value && /(og:|twitter:|description|robots|article:)/.test(attr.value.value))]",
          message: "Use UnifiedSEO/seoBuilder for meta tags. Do not hardcode <meta> in components.",
        },
        {
          selector: "JSXElement[openingElement.name.name='link'][openingElement.attributes.some(attr => attr.name && attr.name.name === 'rel' && attr.value && attr.value.value === 'canonical')]",
          message: "Canonical tags must be emitted by UnifiedSEO/seoBuilder.",
        },
        {
          selector: "JSXElement[openingElement.name.name='Helmet']:not([openingElement.parent.parent.parent.id.name='UnifiedSEO'])",
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
