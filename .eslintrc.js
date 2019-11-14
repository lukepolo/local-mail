module.exports = {
  extends: [
    "plugin:vue/essential",
    "@vue/prettier",
    "@vue/typescript",
    "eslint:recommended",
  ],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
};
