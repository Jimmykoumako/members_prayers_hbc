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
exports.default = MemberForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var supabase_1 = require("@/lib/supabase");
var select_1 = require("@/components/ui/select");
var accordion_1 = require("@/components/ui/accordion");
var alert_1 = require("@/components/ui/alert");
var defaultFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: null,
    birthday: null,
    join_date: new Date().toISOString().split('T')[0],
    role: 'member',
    ministry: [],
    family_members: null,
    emergency_contact: null,
    attendance_status: 'active',
    baptism_date: null,
    notes: null
};
function MemberForm(_a) {
    var _this = this;
    var _b, _c, _d;
    var open = _a.open, onOpenChange = _a.onOpenChange, onSuccess = _a.onSuccess, initialData = _a.initialData, _e = _a.isEditing, isEditing = _e === void 0 ? false : _e;
    var _f = (0, react_1.useState)(defaultFormData), formData = _f[0], setFormData = _f[1];
    var _g = (0, react_1.useState)(false), loading = _g[0], setLoading = _g[1];
    var _h = (0, react_1.useState)(''), error = _h[0], setError = _h[1];
    var _j = (0, react_1.useState)(false), showMoreFields = _j[0], setShowMoreFields = _j[1];
    (0, react_1.useEffect)(function () {
        if (initialData) {
            setFormData(__assign(__assign(__assign({}, defaultFormData), initialData), { email: initialData.email || '', phone: initialData.phone || '', 
                // Ensure dates are in the correct format
                birthday: initialData.birthday ? new Date(initialData.birthday).toISOString().split('T')[0] : null, join_date: initialData.join_date ? new Date(initialData.join_date).toISOString().split('T')[0] : null, baptism_date: initialData.baptism_date ? new Date(initialData.baptism_date).toISOString().split('T')[0] : null }));
        }
        else {
            setFormData(defaultFormData);
        }
    }, [initialData]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var cleanFormData, insertError, updateError, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    setLoading(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    cleanFormData = __assign(__assign({}, formData), { email: formData.email.trim() || null, phone: formData.phone.trim() || null, 
                        // Clean optional fields
                        address: ((_a = formData.address) === null || _a === void 0 ? void 0 : _a.trim()) || null, birthday: formData.birthday || null, join_date: formData.join_date || null, baptism_date: formData.baptism_date || null, notes: ((_b = formData.notes) === null || _b === void 0 ? void 0 : _b.trim()) || null, 
                        // Ensure arrays are properly handled
                        ministry: Array.isArray(formData.ministry) ? formData.ministry : [], family_members: Array.isArray(formData.family_members) ? formData.family_members : null });
                    if (!!isEditing) return [3 /*break*/, 3];
                    return [4 /*yield*/, supabase_1.supabase
                            .from('members')
                            .insert([cleanFormData])];
                case 2:
                    insertError = (_c.sent()).error;
                    if (insertError)
                        throw insertError;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, supabase_1.supabase
                        .from('members')
                        .update(cleanFormData)
                        .eq('id', initialData === null || initialData === void 0 ? void 0 : initialData.id)];
                case 4:
                    updateError = (_c.sent()).error;
                    if (updateError)
                        throw updateError;
                    _c.label = 5;
                case 5:
                    onOpenChange(false);
                    if (onSuccess)
                        onSuccess();
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _c.sent();
                    console.error('Error:', error_1);
                    setError(error_1.message || 'An error occurred');
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: open, onOpenChange: onOpenChange, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "bg-white border shadow-lg w-[95%] max-w-2xl mx-auto p-4 sm:p-6 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "mb-4", children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "text-xl font-semibold", children: isEditing ? 'Edit Member' : 'Add New Member' }) }), error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", className: "mb-4", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "first_name", children: "First Name *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "first_name", value: formData.first_name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { first_name: e.target.value })); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "last_name", children: "Last Name *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "last_name", value: formData.last_name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { last_name: e.target.value })); }, required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", type: "email", value: formData.email, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { email: e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Phone" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", type: "tel", value: formData.phone, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { phone: e.target.value })); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "role", children: "Role *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.role, onValueChange: function (value) {
                                                return setFormData(__assign(__assign({}, formData), { role: value }));
                                            }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select role" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "member", children: "Member" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "manager", children: "Manager" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "admin", children: "Admin" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "attendance_status", children: "Status *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.attendance_status, onValueChange: function (value) {
                                                return setFormData(__assign(__assign({}, formData), { attendance_status: value }));
                                            }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select status" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "Active" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "inactive", children: "Inactive" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "visitor", children: "Visitor" })] })] })] })] }), (0, jsx_runtime_1.jsx)(accordion_1.Accordion, { type: "single", collapsible: true, children: (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, { value: "additional-info", children: [(0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, { children: "Additional Information" }), (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 pt-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address", children: "Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address", value: formData.address || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { address: e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "birthday", children: "Birthday" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "birthday", type: "date", value: formData.birthday || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { birthday: e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "join_date", children: "Join Date" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "join_date", type: "date", value: formData.join_date || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { join_date: e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "baptism_date", children: "Baptism Date" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "baptism_date", type: "date", value: formData.baptism_date || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { baptism_date: e.target.value })); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 border rounded-md p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium", children: "Emergency Contact" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "emergency_name", children: "Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "emergency_name", value: ((_b = formData.emergency_contact) === null || _b === void 0 ? void 0 : _b.name) || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { emergency_contact: __assign(__assign({}, formData.emergency_contact), { name: e.target.value }) })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "emergency_phone", children: "Phone" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "emergency_phone", type: "tel", value: ((_c = formData.emergency_contact) === null || _c === void 0 ? void 0 : _c.phone) || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { emergency_contact: __assign(__assign({}, formData.emergency_contact), { phone: e.target.value }) })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "emergency_relationship", children: "Relationship" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "emergency_relationship", value: ((_d = formData.emergency_contact) === null || _d === void 0 ? void 0 : _d.relationship) || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { emergency_contact: __assign(__assign({}, formData.emergency_contact), { relationship: e.target.value }) })); } })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "notes", children: "Notes" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "notes", value: formData.notes || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { notes: e.target.value })); }, className: "min-h-[100px]" })] })] }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end space-x-2 pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return onOpenChange(false); }, disabled: loading, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: loading, children: loading ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member' })] })] })] }) }));
}
