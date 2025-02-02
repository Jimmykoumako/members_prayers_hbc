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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PrayerRequests;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("../lib/supabase");
var AuthContext_1 = require("../contexts/AuthContext");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var badge_1 = require("../components/ui/badge");
var scroll_area_1 = require("../components/ui/scroll-area");
var PrayerRequestForm_1 = require("./PrayerRequestForm");
function PrayerRequests() {
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)([]), prayers = _a[0], setPrayers = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)('all'), filter = _c[0], setFilter = _c[1];
    var _d = (0, react_1.useState)(false), dialogOpen = _d[0], setDialogOpen = _d[1];
    (0, react_1.useEffect)(function () {
        fetchPrayers();
    }, [filter]);
    function fetchPrayers() {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, data, error, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        query = supabase_1.supabase
                            .from('prayer_requests')
                            .select("\n          *,\n          member:members (\n            first_name,\n            last_name\n          )\n        ")
                            .order('created_at', { ascending: false });
                        if (filter !== 'all') {
                            if (filter === 'permanent') {
                                query = query.eq('is_permanent', true);
                            }
                            else {
                                query = query.eq('status', filter);
                            }
                        }
                        return [4 /*yield*/, query];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error)
                            throw error;
                        setPrayers(data || []);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error fetching prayers:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function handleSubmit(formData) {
        return __awaiter(this, void 0, void 0, function () {
            var error, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('prayer_requests')
                                .insert([__assign(__assign({}, formData), { member_id: user === null || user === void 0 ? void 0 : user.id })])];
                    case 1:
                        error = (_a.sent()).error;
                        if (error)
                            throw error;
                        fetchPrayers();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error adding prayer request:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function updatePrayerStatus(id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var error, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('prayer_requests')
                                .update({ status: status })
                                .eq('id', id)];
                    case 1:
                        error = (_a.sent()).error;
                        if (error)
                            throw error;
                        fetchPrayers();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error updating prayer status:', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-96", children: "Loading prayer requests..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold tracking-tight", children: "Prayer Requests" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setDialogOpen(true); }, children: "Add Prayer Request" })] }), (0, jsx_runtime_1.jsx)(PrayerRequestForm_1.PrayerRequestForm, { open: dialogOpen, onOpenChange: setDialogOpen, onSubmit: handleSubmit }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: ['all', 'active', 'answered', 'permanent'].map(function (filterOption) { return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: filter === filterOption ? "default" : "outline", onClick: function () { return setFilter(filterOption); }, children: filterOption.charAt(0).toUpperCase() + filterOption.slice(1) }, filterOption)); }) }), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "h-[600px] rounded-md border", children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4 p-4", children: prayers.map(function (prayer) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: prayer.title }), (0, jsx_runtime_1.jsxs)(card_1.CardDescription, { children: ["By ", prayer.member.first_name, " ", prayer.member.last_name, " \u2022", new Date(prayer.created_at).toLocaleDateString()] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [prayer.is_permanent && ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", children: "Permanent" })), (0, jsx_runtime_1.jsxs)("select", { value: prayer.status, onChange: function (e) { return updatePrayerStatus(prayer.id, e.target.value); }, className: "text-sm border rounded p-1", children: [(0, jsx_runtime_1.jsx)("option", { value: "active", children: "Active" }), (0, jsx_runtime_1.jsx)("option", { value: "in_progress", children: "In Progress" }), (0, jsx_runtime_1.jsx)("option", { value: "answered", children: "Answered" })] })] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-gray-700", children: prayer.description }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "mt-2", children: prayer.category })] })] }, prayer.id)); }) }) })] }));
}
