"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../contexts/AuthContext");
var button_1 = require("../components/ui/button");
var sheet_1 = require("../components/ui/sheet");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function Layout() {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, signOut = _a.signOut;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    (0, react_1.useEffect)(function () {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);
    if (!user) {
        return null;
    }
    var menuItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/members', label: 'Members' },
        { path: '/prayers', label: 'Prayer Requests' },
    ];
    var NavLinks = function () { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: menuItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: item.path, className: "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium", onClick: function () { return setOpen(false); }, children: item.label }, item.path)); }) })); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("nav", { className: "bg-white shadow", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-16 items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "text-xl font-bold text-gray-900", children: "Church Prayer" }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex md:items-center md:ml-6 space-x-4", children: (0, jsx_runtime_1.jsx)(NavLinks, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return signOut(); }, className: "hidden md:inline-flex", children: "Sign Out" }), (0, jsx_runtime_1.jsxs)(sheet_1.Sheet, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", className: "md:hidden", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-5 w-5" }) }) }), (0, jsx_runtime_1.jsx)(sheet_1.SheetContent, { side: "right", className: "w-64", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col mt-6 space-y-4", children: [(0, jsx_runtime_1.jsx)(NavLinks, {}), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () {
                                                                signOut();
                                                                setOpen(false);
                                                            }, children: "Sign Out" })] }) })] })] })] }) }) }), (0, jsx_runtime_1.jsx)("main", { className: "mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }), (0, jsx_runtime_1.jsx)(sonner_1.Toaster, {})] }));
}
exports.default = Layout;
