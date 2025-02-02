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
exports.default = Dashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../components/ui/card");
var supabase_1 = require("../lib/supabase");
var lucide_react_1 = require("lucide-react");
function Dashboard() {
    var _a = (0, react_1.useState)({
        totalMembers: 0,
        activePrayers: 0,
        permanentPrayers: 0,
        answeredPrayers: 0
    }), stats = _a[0], setStats = _a[1];
    var _b = (0, react_1.useState)([]), recentPrayers = _b[0], setRecentPrayers = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        fetchDashboardData();
    }, []);
    function fetchDashboardData() {
        return __awaiter(this, void 0, void 0, function () {
            var members, prayers, recentPrayerData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('members')
                                .select('id')];
                    case 1:
                        members = (_a.sent()).data;
                        return [4 /*yield*/, supabase_1.supabase
                                .from('prayer_requests')
                                .select('status, is_permanent')];
                    case 2:
                        prayers = (_a.sent()).data;
                        return [4 /*yield*/, supabase_1.supabase
                                .from('prayer_requests')
                                .select("\n          *,\n          member:members (\n            first_name,\n            last_name\n          )\n        ")
                                .order('created_at', { ascending: false })
                                .limit(5)];
                    case 3:
                        recentPrayerData = (_a.sent()).data;
                        setStats({
                            totalMembers: (members === null || members === void 0 ? void 0 : members.length) || 0,
                            activePrayers: (prayers === null || prayers === void 0 ? void 0 : prayers.filter(function (p) { return p.status === 'active'; }).length) || 0,
                            permanentPrayers: (prayers === null || prayers === void 0 ? void 0 : prayers.filter(function (p) { return p.is_permanent; }).length) || 0,
                            answeredPrayers: (prayers === null || prayers === void 0 ? void 0 : prayers.filter(function (p) { return p.status === 'answered'; }).length) || 0
                        });
                        setRecentPrayers(recentPrayerData || []);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error fetching dashboard data:', error_1);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-96", children: "Loading dashboard..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold tracking-tight", children: "Dashboard" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "Total Members" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.totalMembers }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "Active Prayers" }), (0, jsx_runtime_1.jsx)(lucide_react_1.HandHeart, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.activePrayers }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "Permanent Prayers" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.permanentPrayers }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "Answered Prayers" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.answeredPrayers }) })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Recent Prayer Requests" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: recentPrayers.map(function (prayer) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium leading-none", children: prayer.title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground", children: ["by ", prayer.member.first_name, " ", prayer.member.last_name, " \u2022", new Date(prayer.created_at).toLocaleDateString()] })] }), (0, jsx_runtime_1.jsx)("div", { className: "ml-auto", children: (0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 text-xs rounded-full\n                    ".concat(prayer.status === 'active' ? 'bg-green-100 text-green-800' :
                                                prayer.status === 'answered' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'), children: prayer.status }) })] }, prayer.id)); }) }) })] })] }));
}
