module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // Updated to TypeScript
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser", // Change parser to TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "^18.2.0",
    },
  },
  plugins: ["react", "@typescript-eslint"], // Add @typescript-eslint plugin
  rules: {
    "react/prop-types": "off", // Disable prop-types check since TypeScript handles types
    "@typescript-eslint/explicit-module-boundary-types": "off", // Allow implicit return types
    "@typescript-eslint/no-explicit-any": "off", // Allow usage of 'any' type
    "react/react-in-jsx-scope": "off", // Disable the rule for React in scope
  },
};
