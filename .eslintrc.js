module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/attribute-hyphenation': 0,
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': 0
  }
}
