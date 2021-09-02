"use strict";
exports.__esModule = true;
exports.transpile = void 0;
var types_1 = require("./types");
function transpile(node, scope) {
    if (typeof node === 'string')
        throw new Error('Cannot compile a string.');
    switch (node.token) {
        case types_1.TokenKind.Program: {
            console.log(node);
        }
    }
    throw new Error("Unhandled " + node.token);
}
exports.transpile = transpile;
//# sourceMappingURL=compiler.js.map