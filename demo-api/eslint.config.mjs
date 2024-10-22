import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        // ecmaVersion: 2021, 
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
    },
  },
];
