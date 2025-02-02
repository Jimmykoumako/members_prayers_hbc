"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_1 = require("@eslint/js");
var globals_1 = require("globals");
var eslint_plugin_react_1 = require("eslint-plugin-react");
var eslint_plugin_react_hooks_1 = require("eslint-plugin-react-hooks");
var eslint_plugin_react_refresh_1 = require("eslint-plugin-react-refresh");
exports.default = [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals_1.default.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        settings: { react: { version: '18.3' } },
        plugins: {
            react: eslint_plugin_react_1.default,
            'react-hooks': eslint_plugin_react_hooks_1.default,
            'react-refresh': eslint_plugin_react_refresh_1.default,
        },
        rules: __assign(__assign(__assign(__assign(__assign({}, js_1.default.configs.recommended.rules), eslint_plugin_react_1.default.configs.recommended.rules), eslint_plugin_react_1.default.configs['jsx-runtime'].rules), eslint_plugin_react_hooks_1.default.configs.recommended.rules), { 'react/jsx-no-target-blank': 'off', 'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ] }),
    },
];
