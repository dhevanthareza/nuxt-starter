module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "no-console": [1, { "allow": ["info", "warn", "error"] }],
    "no-debugger": 1,
    "no-warning-comments": [1, { "terms": ["todo", "fixme"], "location": "start" }],
    "no-unused-vars": 1,
    "vue/no-unused-components": 1
  }
}
