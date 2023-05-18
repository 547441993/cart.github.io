module.exports = {
  env: {
    browser: true,
    node: true
  },
  root: true, // 停止父级文件 eslintrc.js 查找匹配
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        semi: true, // 声明结尾使用分号(默认true)
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none', // 多行使用拖尾逗号（默认none）
        endOfLine: 'auto',
        proseWrap: 'always', // 属性是否换行
        arrowParens: 'always'
      }
    ],

    indent: ['off', 2, { SwitchCase: 1 }], // 暂且关闭，不然很容易与prettier 冲突
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'comma-dangle': ['error', 'never'],
    camelcase: [0, { ignoreDestructuring: true }],
    'object-curly-newline': [0],
    'consistent-return': [0],
    'implicit-arrow-linebreak': [0, 'beside'],
    'space-before-function-paren': [0], // 允许函数前没有空格
    'func-names': [0], // 允许匿名函数
    'operator-linebreak': [0], // 变量赋值时 值过长可换行
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 1,
    'no-underscore-dangle': 'off', // 属性下划线是否禁用

    'no-console': [0],
    'import/extensions': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],

    'no-unused-vars': 'off',
    'import/no-named-as-default': 0,
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'wrap-iife': 'off',
    'no-use-before-define': 'off',
    'vue/require-default-prop': 'off',
    'function-paren-newline': 'off',
    'arrow-body-style': 'off',
    'vue/no-v-html': 'off',
    'no-shadow': 'off',
    'no-redeclare': 'off',
    'no-nested-ternary': 'off',
    'newline-per-chained-call': 'off',
    'linebreak-style': 'off'
  }
};
