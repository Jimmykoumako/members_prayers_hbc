"use strict";
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
exports.default = ExportDialog;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var checkbox_1 = require("@/components/ui/checkbox");
var label_1 = require("@/components/ui/label");
function ExportDialog(_a) {
    var open = _a.open, onOpenChange = _a.onOpenChange, onExport = _a.onExport, availableFields = _a.availableFields;
    var _b = (0, react_1.useState)(availableFields.map(function (field) { return field.id; })), selectedFields = _b[0], setSelectedFields = _b[1];
    var handleFieldToggle = function (fieldId) {
        setSelectedFields(function (current) {
            return current.includes(fieldId)
                ? current.filter(function (id) { return id !== fieldId; })
                : __spreadArray(__spreadArray([], current, true), [fieldId], false);
        });
    };
    var handleSelectAll = function () {
        setSelectedFields(availableFields.map(function (field) { return field.id; }));
    };
    var handleDeselectAll = function () {
        setSelectedFields([]);
    };
    var handleExport = function (type) {
        var fields = availableFields.filter(function (field) {
            return selectedFields.includes(field.id);
        });
        onExport(fields, type);
        onOpenChange(false);
    };
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: open, onOpenChange: onOpenChange, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "sm:max-w-md bg-white border shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "bg-white", children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "text-xl font-semibold", children: "Export Members" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 py-4 bg-white", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between mb-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: handleSelectAll, children: "Select All" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: handleDeselectAll, children: "Deselect All" })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4 bg-white", children: availableFields.map(function (field) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 bg-white", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: field.id, checked: selectedFields.includes(field.id), onCheckedChange: function () { return handleFieldToggle(field.id); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: field.id, className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: field.label })] }, field.id)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end space-x-2 mt-4 bg-white", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return onOpenChange(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: function () { return handleExport('excel'); }, disabled: selectedFields.length === 0, children: "Export Excel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: function () { return handleExport('csv'); }, disabled: selectedFields.length === 0, children: "Export CSV" })] })] }) }));
}
