"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dissector_1 = require("dissector");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var compiler_1 = require("./compiler");
var index_1 = require("./index");
var types_1 = require("./types");
var source = fs_1["default"].readFileSync(path_1["default"].join(__dirname, '..', 'test.chia'), 'utf8');
var ast = index_1.parse(source);
if (Array.isArray(ast)) {
    var context = new types_1.Context();
    var scope = new types_1.Scope(context);
    var result = compiler_1.transpile(ast, scope);
    console.log(result);
}
else {
    var position = dissector_1.toPosition(source, ast.start);
    console.log(ast.error + " at " + position.line + ":" + position.column);
}
//# sourceMappingURL=test.js.map