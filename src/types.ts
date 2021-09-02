export class Context {}

export class Scope {
    public parent: Scope | null;
    public context: Context;
    constructor(parent: Scope | Context) {
        if (parent instanceof Context) {
            this.parent = null;
            this.context = parent;
        } else {
            this.parent = parent;
            this.context = parent.context;
        }
    }
}

export enum AtomType {
    Any = 'any',
    Null = 'null',
    Never = 'never',
    Bytes = 'bytes',
    Integer = 'int',
    String = 'string',
    Hash = 'hash',
}

export class ArrayType {
    public type: Type;
    constructor(type: Type) {
        this.type = type;
    }
}

export class TupleType {
    public types: Type[];
    constructor(types: Type[]) {
        this.types = types;
    }
}

export class UnionType {
    public types: Type[];
    constructor(types: Type[]) {
        this.types = types;
    }
}

export class MapType {
    public key: Type;
    public value: Type;
    constructor(key: Type, value: Type) {
        this.key = key;
        this.value = value;
    }
}

export class FunctionType {
    public parameters: Type[];
    public returns: Type;
    constructor(parameters: Type[], returns: Type) {
        this.parameters = parameters;
        this.returns = returns;
    }
}

export type Type =
    | AtomType
    | ArrayType
    | TupleType
    | MapType
    | FunctionType
    | UnionType;

export enum TokenKind {
    Identifier = 'identifier',
    HexLiteral = 'hex literal',
    IntegerLiteral = 'integer literal',
    OctalLiteral = 'octal literal',
    BinaryLiteral = 'binary literal',
    StringLiteral = 'string literal',
    MapLiteral = 'map literal',
    ArrayLiteral = 'array literal',
    HexEscape = 'hex escape',
    UnicodeEscape = 'unicode escape',
    ExtendedEscape = 'extended escape',
    CharacterEscape = 'character escape',
    PropertyAccess = 'property access',
    OptionalPropertyAccess = 'optional property access',
    ValueAccess = 'value access',
    MethodCall = 'method call',
    MapProperty = 'map property',
    Parameter = 'parameter',
    ParameterList = 'parameter list',
    FunctionExpression = 'function expression',
    PuzzleExpression = 'puzzle expression',
    ElifExpression = 'elif expression',
    ElseExpression = 'else expression',
    IfExpression = 'if expression',
    ForExpression = 'for expression',
    SuffixExpression = 'suffix expression',
    PrefixExpression = 'prefix expression',
    RangeExpression = 'range expression',
    FactorExpression = 'factor expression',
    TermExpression = 'term expression',
    ShiftExpression = 'shift expression',
    IsNotExpression = 'is not expression',
    IsExpression = 'is expression',
    AsExpression = 'as expression',
    InExpression = 'in expression',
    NotInExpression = 'not in expression',
    CheckExpression = 'check expression',
    EqualityExpression = 'equality expression',
    BitwiseAndExpression = 'bitwise and expression',
    BitwiseXorExpression = 'bitwise xor expression',
    BitwiseOrExpression = 'bitwise or expression',
    LogicalAndExpression = 'logical and expression',
    LogicalOrExpression = 'logical or expression',
    ReferenceExpression = 'reference expression',
    AssignmentExpression = 'assignment expression',
    FunctionTypeParameters = 'function type parameters',
    TupleType = 'tuple type',
    MapType = 'map type',
    FunctionType = 'function type',
    ArrayType = 'array type',
    SuffixType = 'suffix type',
    UnionType = 'union type',
    Block = 'block',
    FunctionStatement = 'function statement',
    PuzzleStatement = 'puzzle statement',
    TypeStatement = 'type statement',
    LetStatement = 'let statement',
    ReturnStatement = 'return statement',
    ElifStatement = 'elif statement',
    ElseStatement = 'else statement',
    IfStatement = 'if statement',
    ForStatement = 'for statement',
    Program = 'program',
}
