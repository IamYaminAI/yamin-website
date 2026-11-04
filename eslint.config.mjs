import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // PrimeReact is imported only by its App* wrappers in src/components/ui;
  // everything else reuses those wrappers.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/**", "src/app/providers.tsx", "src/test/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["primereact", "primereact/*"],
              message:
                "Import PrimeReact through an App* wrapper in src/components/ui.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
