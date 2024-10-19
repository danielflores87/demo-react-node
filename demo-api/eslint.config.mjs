import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Esto permite el uso de globals de Node.js
      },
      parserOptions: {
        ecmaVersion: 2021, // Utiliza la versión de ECMAScript que necesites
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Aquí puedes personalizar las reglas según tus necesidades
      "no-console": "off", // Permite el uso de console.log (útil para depuración en desarrollo)
      "prefer-const": "warn", // Recomienda usar const en lugar de let cuando sea posible
      "no-unused-vars": "warn", // Muestra advertencias para variables no utilizadas
      "consistent-return": "error", // Asegura que todas las rutas de retorno en funciones devuelvan un valor
      // Agrega más reglas según tus preferencias y necesidades
    },
  },
];
