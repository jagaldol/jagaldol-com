import { dirname } from "path"
import { fileURLToPath } from "url"

import { FlatCompat } from "@eslint/eslintrc"
import prettierConfig from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import prettierPlugin from "eslint-plugin-prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  prettierConfig,
]

export default eslintConfig
