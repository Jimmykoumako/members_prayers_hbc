"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// src/App.tsx
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("./components/Layout");
var Dashboard_1 = require("./pages/Dashboard");
var Members_1 = require("./pages/Members");
var PrayerRequests_1 = require("./pages/PrayerRequests");
var Login_1 = require("./pages/Login");
var Signup_1 = require("./pages/Signup");
var AuthContext_1 = require("./contexts/AuthContext");
var ForgotPassword_1 = require("./pages/ForgotPassword");
var ResetPassword_1 = require("./pages/ResetPassword");
function App() {
    return ((0, jsx_runtime_1.jsx)(AuthContext_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(Signup_1.default, {}) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Layout_1.default, {}), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "members", element: (0, jsx_runtime_1.jsx)(Members_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "prayers", element: (0, jsx_runtime_1.jsx)(PrayerRequests_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/forgot-password", element: (0, jsx_runtime_1.jsx)(ForgotPassword_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/reset-password", element: (0, jsx_runtime_1.jsx)(ResetPassword_1.default, {}) })] })] }) }) }));
}
exports.default = App;
