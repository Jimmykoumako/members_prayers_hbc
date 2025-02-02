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
exports.PrayerRequestForm = PrayerRequestForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var textarea_1 = require("../components/ui/textarea");
var select_1 = require("../components/ui/select");
var checkbox_1 = require("../components/ui/checkbox");
var dialog_1 = require("../components/ui/dialog");
var defaultFormData = {
    title: '',
    description: '',
    category: 'other',
    is_permanent: false,
    status: 'active'
};
var categories = [
    { value: 'health', label: 'Health' },
    { value: 'family', label: 'Family' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'financial', label: 'Financial' },
    { value: 'other', label: 'Other' }
];
function PrayerRequestForm(_a) {
    var _this = this;
    var open = _a.open, onOpenChange = _a.onOpenChange, initialData = _a.initialData, onSubmit = _a.onSubmit, _b = _a.isEditing, isEditing = _b === void 0 ? false : _b;
    var _c = react_1.default.useState(initialData || defaultFormData), formData = _c[0], setFormData = _c[1];
    var _d = react_1.default.useState(false), loading = _d[0], setLoading = _d[1];
    react_1.default.useEffect(function () {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, onSubmit(formData)];
                case 2:
                    _a.sent();
                    onOpenChange(false);
                    setFormData(defaultFormData);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error submitting prayer request:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: open, onOpenChange: onOpenChange, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "sm:max-w-[425px]", children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: isEditing ? 'Edit Prayer Request' : 'Add Prayer Request' }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: isEditing
                                ? 'Update the details of your prayer request.'
                                : 'Fill in the details for your new prayer request.' })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "title", children: "Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "title", required: true, value: formData.title, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { title: e.target.value })); }, placeholder: "Enter a title for your prayer request" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", children: "Description" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", required: true, value: formData.description, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); }, placeholder: "Describe your prayer request", className: "min-h-[100px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category", children: "Category" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.category, onValueChange: function (value) { return setFormData(__assign(__assign({}, formData), { category: value })); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select a category" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: categories.map(function (category) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: category.value, children: category.label }, category.value)); }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "is_permanent", checked: formData.is_permanent, onCheckedChange: function (checked) {
                                        return setFormData(__assign(__assign({}, formData), { is_permanent: checked }));
                                    } }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "is_permanent", children: "Permanent Prayer Request" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return onOpenChange(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: loading, children: loading ? 'Saving...' : isEditing ? 'Update' : 'Add Request' })] })] })] }) }));
}
