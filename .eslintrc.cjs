module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'eslint:recommended',
		'plugin:prettier/recommended',
		'prettier'
	],
	rules: {}
}
