"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPassword;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var supabase_1 = require("../lib/supabase");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var card_1 = require("../components/ui/card");
var alert_1 = require("../components/ui/alert");
var lucide_react_1 = require("lucide-react");
function ForgotPassword() {
    var _this = this;
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), emailSent = _d[0], setEmailSent = _d[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var resetError, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setError('');
                    setLoading(true);
                    return [4 /*yield*/, supabase_1.supabase.auth.resetPasswordForEmail(email, {
                            redirectTo: "".concat(window.location.origin, "/reset-password"),
                        })];
                case 2:
                    resetError = (_a.sent()).error;
                    if (resetError)
                        throw resetError;
                    setEmailSent(true);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1.message || 'Failed to send reset email');
                    console.error(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (emailSent) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircleIcon, { className: "h-12 w-12 text-green-500" }) }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-2xl text-center", children: "Check your email" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-center", children: "We've sent you a link to reset your password. Please check your inbox and follow the instructions." })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-center text-sm text-muted-foreground", children: "Didn't receive the email? Check your spam folder or try again." }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full", onClick: function () { return setEmailSent(false); }, children: "Try again" })] }), (0, jsx_runtime_1.jsx)(card_1.CardFooter, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-center w-full", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/login", className: "inline-flex items-center text-primary hover:underline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeftIcon, { className: "mr-2 h-4 w-4" }), "Back to login"] }) }) })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.KeyIcon, { className: "h-12 w-12 text-primary" }) }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-2xl text-center", children: "Reset your password" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-center", children: "Enter your email address and we'll send you a link to reset your password" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", type: "email", placeholder: "you@example.com", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "w-full" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Sending reset link..." : "Send reset link" })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardFooter, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-center w-full", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/login", className: "inline-flex items-center text-primary hover:underline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeftIcon, { className: "mr-2 h-4 w-4" }), "Back to login"] }) }) })] }) }));
}
