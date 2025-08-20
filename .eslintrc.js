module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    // Nonaktifkan Prettier strict rules
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // Nonaktifkan error prettier (biar tidak ribut soal koma, enter, spasi)
    "prettier/prettier": "off",

    // Opsional: biar koma terakhir tidak wajib
    "comma-dangle": ["error", "never"],

    // Opsional: biar konsisten tapi tidak memaksa format tertentu
    "vue/multi-word-component-names": "off",
  },
};
