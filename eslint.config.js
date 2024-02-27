// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    extends: [eslint.configs.recommended],
    files: ["{src/test}/**/*.{js,json,ts}"],
  },
  {
    extends: [...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off' 
    }
  }
);
