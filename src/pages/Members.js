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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Members;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_1 = require("@/lib/supabase");
var AuthContext_1 = require("@/contexts/AuthContext");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var sonner_1 = require("sonner");
var XLSX = require("xlsx");
var table_1 = require("@/components/ui/table");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var use_debounce_1 = require("use-debounce");
var MemberForm_1 = require("@/pages/MemberForm");
var ExportDialog_1 = require("@/components/ExportDialog");
function Members() {
    var _this = this;
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)([]), members = _a[0], setMembers = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), isAdmin = _c[0], setIsAdmin = _c[1];
    var _d = (0, react_1.useState)(false), mobileMenuOpen = _d[0], setMobileMenuOpen = _d[1];
    // Form states
    var _e = (0, react_1.useState)(false), dialogOpen = _e[0], setDialogOpen = _e[1];
    var _f = (0, react_1.useState)(false), exportDialogOpen = _f[0], setExportDialogOpen = _f[1];
    var _g = (0, react_1.useState)(null), selectedMember = _g[0], setSelectedMember = _g[1];
    // Filter states
    var _h = (0, react_1.useState)(''), searchQuery = _h[0], setSearchQuery = _h[1];
    var _j = (0, react_1.useState)('all'), selectedStatus = _j[0], setSelectedStatus = _j[1];
    var _k = (0, react_1.useState)([]), filteredMembers = _k[0], setFilteredMembers = _k[1];
    var availableFields = [
        { id: 'first_name', label: 'First Name', key: 'first_name' },
        { id: 'last_name', label: 'Last Name', key: 'last_name' },
        { id: 'email', label: 'Email', key: 'email' },
        { id: 'phone', label: 'Phone', key: 'phone' },
        { id: 'role', label: 'Role', key: 'role' },
        { id: 'attendance_status', label: 'Status', key: 'attendance_status' },
        { id: 'join_date', label: 'Join Date', key: 'join_date' },
        { id: 'ministry', label: 'Ministry', key: 'ministry' }
    ];
    (0, react_1.useEffect)(function () {
        var initializeComponent = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, Promise.all([checkRole(), fetchMembers()])];
                    case 1:
                        _a.sent();
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        if (user) {
            initializeComponent();
        }
    }, [user]);
    (0, react_1.useEffect)(function () {
        if (members.length > 0) {
            filterMembers(searchQuery, selectedStatus);
        }
        else {
            setFilteredMembers([]);
        }
    }, [members, searchQuery, selectedStatus]);
    var debouncedSearch = (0, use_debounce_1.useDebouncedCallback)(function (value) {
        setSearchQuery(value.trim());
    }, 300);
    var filterMembers = function (query, status) {
        var filtered = members;
        // Filter by status
        if (status !== 'all') {
            filtered = filtered.filter(function (member) { return member.attendance_status === status; });
        }
        // Filter by search query
        if (query.trim()) {
            var searchTerm_1 = query.toLowerCase().trim();
            filtered = filtered.filter(function (member) {
                var _a, _b, _c, _d;
                return (member.first_name.toLowerCase().includes(searchTerm_1) ||
                    member.last_name.toLowerCase().includes(searchTerm_1) ||
                    ((_b = (_a = member.email) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm_1)) !== null && _b !== void 0 ? _b : false) ||
                    ((_d = (_c = member.phone) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(searchTerm_1)) !== null && _d !== void 0 ? _d : false) ||
                    member.role.toLowerCase().includes(searchTerm_1));
            });
        }
        setFilteredMembers(filtered);
    };
    var checkRole = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('members')
                            .select('role')
                            .eq('id', user.id)
                            .single()];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    setIsAdmin((data === null || data === void 0 ? void 0 : data.role) === 'admin');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error checking role:', error_1);
                    sonner_1.toast.error('Error checking user role');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchMembers = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('members')
                            .select('*')
                            .order('first_name')];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    setMembers(data || []);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.error('Error fetching members:', error_2);
                    sonner_1.toast.error('Error loading members');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (formData) { return __awaiter(_this, void 0, void 0, function () {
        var error, _a, data_1, error, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!selectedMember) return [3 /*break*/, 2];
                    return [4 /*yield*/, supabase_1.supabase
                            .from('members')
                            .update(formData)
                            .eq('id', selectedMember.id)];
                case 1:
                    error = (_b.sent()).error;
                    if (error)
                        throw error;
                    sonner_1.toast.success('Member updated successfully');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabase_1.supabase
                        .from('members')
                        .insert([formData])
                        .select()
                        .single()];
                case 3:
                    _a = _b.sent(), data_1 = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    setMembers(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data_1], false); });
                    sonner_1.toast.success('Member added successfully');
                    _b.label = 4;
                case 4:
                    setDialogOpen(false);
                    setSelectedMember(null);
                    fetchMembers();
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _b.sent();
                    console.error('Error saving member:', error_3);
                    sonner_1.toast.error(error_3.message || 'Error saving member');
                    throw error_3;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleExport = function (selectedFields, type) {
        try {
            // Prepare data for export
            var exportData = members.map(function (member) {
                var rowData = {};
                selectedFields.forEach(function (field) {
                    rowData[field.label] = member[field.key] || '';
                });
                return rowData;
            });
            if (type === 'excel') {
                var wb = XLSX.utils.book_new();
                var ws = XLSX.utils.json_to_sheet(exportData);
                var colWidths = selectedFields.map(function () { return ({ wch: 15 }); });
                ws['!cols'] = colWidths;
                XLSX.utils.book_append_sheet(wb, ws, 'Members');
                var date = new Date().toISOString().split('T')[0];
                XLSX.writeFile(wb, "church_members_".concat(date, ".xlsx"));
            }
            else {
                var ws = XLSX.utils.json_to_sheet(exportData);
                var csv = XLSX.utils.sheet_to_csv(ws);
                var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                var link = document.createElement('a');
                var date = new Date().toISOString().split('T')[0];
                link.href = URL.createObjectURL(blob);
                link.download = "church_members_".concat(date, ".csv");
                link.click();
            }
            sonner_1.toast.success('Members list exported successfully');
        }
        catch (error) {
            console.error('Error exporting members:', error);
            sonner_1.toast.error('Error exporting members list');
        }
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2", children: "Loading..." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 p-4 md:p-6 max-w-7xl mx-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-4 md:flex-row md:justify-between md:items-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold", children: "Members" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", className: "md:hidden self-end", onClick: function () { return setMobileMenuOpen(!mobileMenuOpen); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-6 w-6" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-4 ".concat(mobileMenuOpen ? '' : 'hidden md:flex'), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Search members...", onChange: function (e) { return debouncedSearch(e.target.value); }, className: "pl-10 w-full" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 sm:flex sm:flex-wrap gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: selectedStatus === 'all' ? 'default' : 'outline', size: "sm", className: "w-full sm:w-auto", onClick: function () { return setSelectedStatus('all'); }, children: "All" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: selectedStatus === 'active' ? 'default' : 'outline', size: "sm", className: "w-full sm:w-auto", onClick: function () { return setSelectedStatus('active'); }, children: "Active" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: selectedStatus === 'inactive' ? 'default' : 'outline', size: "sm", className: "w-full sm:w-auto", onClick: function () { return setSelectedStatus('inactive'); }, children: "Inactive" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: selectedStatus === 'visitor' ? 'default' : 'outline', size: "sm", className: "w-full sm:w-auto", onClick: function () { return setSelectedStatus('visitor'); }, children: "Visitor" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return setExportDialogOpen(true); }, className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "mr-2 h-4 w-4" }), "Export"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () {
                                    setSelectedMember(null);
                                    setDialogOpen(true);
                                }, className: "w-full sm:w-auto", children: "Add Member" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto rounded-md border bg-white", children: (0, jsx_runtime_1.jsx)("div", { className: "min-w-full", children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "whitespace-nowrap", children: "Name" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "hidden md:table-cell", children: "Email" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "hidden sm:table-cell", children: "Phone" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Role" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }), isAdmin && (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: filteredMembers.length === 0 ? ((0, jsx_runtime_1.jsx)(table_1.TableRow, { children: (0, jsx_runtime_1.jsx)(table_1.TableCell, { colSpan: isAdmin ? 6 : 5, className: "text-center py-8 text-gray-500", children: "No members found" }) })) : (filteredMembers.map(function (member) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-medium", children: (0, jsx_runtime_1.jsxs)("div", { children: [member.first_name, " ", member.last_name, (0, jsx_runtime_1.jsxs)("div", { className: "md:hidden text-sm text-gray-500 mt-1", children: [member.email && (0, jsx_runtime_1.jsx)("div", { children: member.email }), member.phone && (0, jsx_runtime_1.jsx)("div", { children: member.phone })] })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "hidden md:table-cell", children: member.email }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "hidden sm:table-cell", children: member.phone }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: member.role === 'admin'
                                                    ? 'destructive'
                                                    : member.role === 'manager'
                                                        ? 'default'
                                                        : 'secondary', className: "whitespace-nowrap", children: member.role }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: member.attendance_status === 'active'
                                                    ? 'outline'
                                                    : member.attendance_status === 'inactive'
                                                        ? 'secondary'
                                                        : 'default', className: "whitespace-nowrap", children: member.attendance_status }) }), isAdmin && ((0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "text-right", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", onClick: function () {
                                                    setSelectedMember(member);
                                                    setDialogOpen(true);
                                                }, className: "hover:bg-gray-100", children: "Edit" }) }))] }, member.id)); })) })] }) }) }), (0, jsx_runtime_1.jsx)(ExportDialog_1.default, { open: exportDialogOpen, onOpenChange: setExportDialogOpen, onExport: handleExport, availableFields: availableFields }), (0, jsx_runtime_1.jsx)(MemberForm_1.default, { open: dialogOpen, onOpenChange: function (open) {
                    setDialogOpen(open);
                    if (!open) {
                        setSelectedMember(null);
                    }
                }, onSuccess: handleSubmit, initialData: selectedMember, isEditing: !!selectedMember })] }));
}
