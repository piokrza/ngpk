module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  plugins: ['@nx'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {},
      extends: [
        'eslint:recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'org',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/component-class-suffix': 'warn',
        '@angular-eslint/no-output-native': 'warn',
        '@angular-eslint/no-inputs-metadata-property': 'warn',
        '@angular-eslint/no-output-on-prefix': 'warn',
        '@angular-eslint/no-input-rename': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-readonly': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        'no-console': [
          'error',
          {
            allow: ['error'],
          },
        ],
        'no-debugger': 'error',
        'import/first': 'error',
        'prefer-const': 'error',
        'import/namespace': 'warn',
        'import/no-unresolved': 'off',
        'import/no-named-as-default': 'off',
        'import/export': 'off',
        '@typescript-eslint/member-ordering': [
          1,
          {
            default: [
              'constructor',
              'private-static-field',
              'public-static-field',
              'static-field',
              'instance-field',
              'public-instance-method',
              'private-instance-method',
            ],
          },
        ],
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'lodash',
                message: "Please import specific funtions from 'lodash/*' instead.",
              },
            ],
          },
        ],
        'import/order': [
          'error',
          {
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true,
            },
            'groups': [['external', 'builtin', 'sibling', 'parent', 'index'], ['internal']],
            'newlines-between': 'always',
            'pathGroups': [
              {
                pattern: 'primeng/**',
                group: 'internal',
              },
            ],
            'pathGroupsExcludedImportTypes': ['internal'],
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
  ],
};
