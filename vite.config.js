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
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
var rollup_1 = require("@mdx-js/rollup");
var tailwindcss_1 = require("tailwindcss");
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        __assign({ enforce: 'pre' }, (0, rollup_1.default)()),
        (0, plugin_react_1.default)({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],
    css: {
        postcss: {
            plugins: [(0, tailwindcss_1.default)()],
        },
    },
    base: '/', // for GitHub Pages
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "./src")
        }
    },
});
