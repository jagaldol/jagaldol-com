import js from "@eslint/js"
import parser from "@typescript-eslint/parser"
import pluginTs from "@typescript-eslint/eslint-plugin"
import pluginPrettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"
import reactPlugin from "eslint-plugin-react"
import nextPlugin from "@next/eslint-plugin-next"

export default [
  {
    ignores: [".next/**/*"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },

  {
    plugins: {
      react: reactPlugin,
      next: nextPlugin,
    },
    rules: {},
  },

  prettierConfig,
]
