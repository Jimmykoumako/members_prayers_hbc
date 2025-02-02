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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
exports.RequireAuth = RequireAuth;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("../lib/supabase");
var react_router_dom_1 = require("react-router-dom");
var AuthContext = (0, react_1.createContext)(undefined);
function AuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        checkUser();
        var subscription = supabase_1.supabase.auth.onAuthStateChange(function (_event, session) {
            var _a;
            setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
            setLoading(false);
        }).data.subscription;
        return function () { return subscription.unsubscribe(); };
    }, []);
    function checkUser() {
        return __awaiter(this, void 0, void 0, function () {
            var session, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
                    case 1:
                        session = (_b.sent()).data.session;
                        setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error checking user:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var signIn = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supabase_1.supabase.auth.signInWithPassword({ email: email, password: password })];
                case 1:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    return [2 /*return*/];
            }
        });
    }); };
    var signUp = function (formData) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, memberData, _a, authData, authError, profileError;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    email = formData.email, password = formData.password, memberData = __rest(formData, ["email", "password"]);
                    return [4 /*yield*/, supabase_1.supabase.auth.signUp({
                            email: email,
                            password: password,
                            options: {
                                data: memberData
                            }
                        })];
                case 1:
                    _a = _c.sent(), authData = _a.data, authError = _a.error;
                    if (authError)
                        throw authError;
                    return [4 /*yield*/, supabase_1.supabase
                            .from('members')
                            .insert([__assign(__assign({ id: (_b = authData.user) === null || _b === void 0 ? void 0 : _b.id }, memberData), { role: 'member' })])];
                case 2:
                    profileError = (_c.sent()).error;
                    if (profileError)
                        throw profileError;
                    return [2 /*return*/];
            }
        });
    }); };
    var signOut = function () { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supabase_1.supabase.auth.signOut()];
                case 1:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    return [2 /*return*/];
            }
        });
    }); };
    var checkRole = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, supabase_1.supabase
                            .from('members')
                            .select('role')
                            .eq('id', user.id)
                            .single()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error || !data)
                        return [2 /*return*/, null];
                    return [2 /*return*/, data.role];
            }
        });
    }); };
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { user: user, loading: loading, signUp: signUp, signIn: signIn, signOut: signOut, checkRole: checkRole }, children: children }));
}
function useAuth() {
    var context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
function RequireAuth(_a) {
    var children = _a.children;
    var _b = useAuth(), user = _b.user, loading = _b.loading;
    if (loading)
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    if (!user)
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login" });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
