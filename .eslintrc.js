// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: ['standard', 'plugin:vue/recommended'],

  rules: {
    semi: 'off',
    'no-new': 'off',
    'space-before-function-paren': 'off',
    'vue/valid-template-root': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/max-attributes-per-line': 'off'
  }
};
