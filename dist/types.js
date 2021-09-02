"use strict";
exports.__esModule = true;
exports.TokenKind = exports.FunctionType = exports.MapType = exports.UnionType = exports.TupleType = exports.ArrayType = exports.AtomType = exports.Scope = exports.Context = void 0;
var Context = /** @class */ (function () {
    function Context() {
    }
    return Context;
}());
exports.Context = Context;
var Scope = /** @class */ (function () {
    function Scope(parent) {
        if (parent instanceof Context) {
            this.parent = null;
            this.context = parent;
        }
        else {
            this.parent = parent;
            this.context = parent.context;
        }
    }
    return Scope;
}());
exports.Scope = Scope;
var AtomType;
(function (AtomType) {
    AtomType["Any"] = "any";
    AtomType["Null"] = "null";
    AtomType["Never"] = "never";
    AtomType["Bytes"] = "bytes";
    AtomType["Integer"] = "int";
    AtomType["String"] = "string";
    AtomType["Hash"] = "hash";
})(AtomType = exports.AtomType || (exports.AtomType = {}));
var ArrayType = /** @class */ (function () {
    function ArrayType(type) {
        this.type = type;
    }
    return ArrayType;
}());
exports.ArrayType = ArrayType;
var TupleType = /** @class */ (function () {
    function TupleType(types) {
        this.types = types;
    }
    return TupleType;
}());
exports.TupleType = TupleType;
var UnionType = /** @class */ (function () {
    function UnionType(types) {
        this.types = types;
    }
    return UnionType;
}());
exports.UnionType = UnionType;
var MapType = /** @class */ (function () {
    function MapType(key, value) {
        this.key = key;
        this.value = value;
    }
    return MapType;
}());
exports.MapType = MapType;
var FunctionType = /** @class */ (function () {
    function FunctionType(parameters, returns) {
        this.parameters = parameters;
        this.returns = returns;
    }
    return FunctionType;
}());
exports.FunctionType = FunctionType;
var TokenKind;
(function (TokenKind) {
    TokenKind["Identifier"] = "identifier";
    TokenKind["HexLiteral"] = "hex literal";
    TokenKind["IntegerLiteral"] = "integer literal";
    TokenKind["OctalLiteral"] = "octal literal";
    TokenKind["BinaryLiteral"] = "binary literal";
    TokenKind["StringLiteral"] = "string literal";
    TokenKind["MapLiteral"] = "map literal";
    TokenKind["ArrayLiteral"] = "array literal";
    TokenKind["HexEscape"] = "hex escape";
    TokenKind["UnicodeEscape"] = "unicode escape";
    TokenKind["ExtendedEscape"] = "extended escape";
    TokenKind["CharacterEscape"] = "character escape";
    TokenKind["PropertyAccess"] = "property access";
    TokenKind["OptionalPropertyAccess"] = "optional property access";
    TokenKind["ValueAccess"] = "value access";
    TokenKind["MethodCall"] = "method call";
    TokenKind["MapProperty"] = "map property";
    TokenKind["Parameter"] = "parameter";
    TokenKind["ParameterList"] = "parameter list";
    TokenKind["FunctionExpression"] = "function expression";
    TokenKind["PuzzleExpression"] = "puzzle expression";
    TokenKind["ElifExpression"] = "elif expression";
    TokenKind["ElseExpression"] = "else expression";
    TokenKind["IfExpression"] = "if expression";
    TokenKind["ForExpression"] = "for expression";
    TokenKind["SuffixExpression"] = "suffix expression";
    TokenKind["PrefixExpression"] = "prefix expression";
    TokenKind["RangeExpression"] = "range expression";
    TokenKind["FactorExpression"] = "factor expression";
    TokenKind["TermExpression"] = "term expression";
    TokenKind["ShiftExpression"] = "shift expression";
    TokenKind["IsNotExpression"] = "is not expression";
    TokenKind["IsExpression"] = "is expression";
    TokenKind["AsExpression"] = "as expression";
    TokenKind["InExpression"] = "in expression";
    TokenKind["NotInExpression"] = "not in expression";
    TokenKind["CheckExpression"] = "check expression";
    TokenKind["EqualityExpression"] = "equality expression";
    TokenKind["BitwiseAndExpression"] = "bitwise and expression";
    TokenKind["BitwiseXorExpression"] = "bitwise xor expression";
    TokenKind["BitwiseOrExpression"] = "bitwise or expression";
    TokenKind["LogicalAndExpression"] = "logical and expression";
    TokenKind["LogicalOrExpression"] = "logical or expression";
    TokenKind["ReferenceExpression"] = "reference expression";
    TokenKind["AssignmentExpression"] = "assignment expression";
    TokenKind["FunctionTypeParameters"] = "function type parameters";
    TokenKind["TupleType"] = "tuple type";
    TokenKind["MapType"] = "map type";
    TokenKind["FunctionType"] = "function type";
    TokenKind["ArrayType"] = "array type";
    TokenKind["SuffixType"] = "suffix type";
    TokenKind["UnionType"] = "union type";
    TokenKind["Block"] = "block";
    TokenKind["FunctionStatement"] = "function statement";
    TokenKind["PuzzleStatement"] = "puzzle statement";
    TokenKind["TypeStatement"] = "type statement";
    TokenKind["LetStatement"] = "let statement";
    TokenKind["ReturnStatement"] = "return statement";
    TokenKind["ElifStatement"] = "elif statement";
    TokenKind["ElseStatement"] = "else statement";
    TokenKind["IfStatement"] = "if statement";
    TokenKind["ForStatement"] = "for statement";
    TokenKind["Program"] = "program";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
//# sourceMappingURL=types.js.map