import { Parser } from 'dissector';
import { TokenKind } from './types';

const $ = new Parser<TokenKind, string>();

const statement = $.recursive();
const expression = $.recursive();
const type = $.recursive();

const identifierStart = $.or($.range('a', 'z'), $.range('A', 'Z'), '_');
const identifierChar = $.or(identifierStart, $.range('0', '9'));
const identifier = $.token(
    TokenKind.Identifier,
    $.lookahead(
        false,
        $.keyword(
            $.or(
                'def',
                'puzzle',
                'type',
                'let',
                'return',
                'if',
                'elif',
                'else',
                'then',
                'do',
                'or',
                'and',
                'is',
                'as',
                'in',
                'not'
            )
        )
    ),
    $.combine(identifierStart, $.zero(identifierChar))
);
$.boundary = identifierChar;

const hexDigit = $.or($.range('0', '9'), $.range('a', 'f'), $.range('A', 'F'));
const hexLiteral = $.token(
    TokenKind.HexLiteral,
    $.combine($.hide('0', $.or('x', 'X')), $.one(hexDigit))
);
const decimalDigit = $.range('0', '9');
const integerLiteral = $.token(
    TokenKind.IntegerLiteral,
    $.combine($.one(decimalDigit))
);
const octalDigit = $.range('0', '7');
const octalLiteral = $.token(
    TokenKind.OctalLiteral,
    $.combine($.hide('0', $.or('o', 'O')), $.one(octalDigit))
);
const binaryDigit = $.or('0', '1');
const binaryLiteral = $.token(
    TokenKind.BinaryLiteral,
    $.combine($.hide('0', $.or('b', 'B')), $.one(binaryDigit))
);

const hexEscape = $.token(
    TokenKind.HexEscape,
    $.hide('x'),
    $.repeat(2, hexDigit)
);
const unicodeEscape = $.token(
    TokenKind.UnicodeEscape,
    $.hide('u'),
    $.repeat(4, hexDigit)
);
const extendedEscape = $.token(
    TokenKind.ExtendedEscape,
    $.hide('u{'),
    $.between(2, 6, hexDigit),
    $.hide('}')
);
const characterEscape = $.token(TokenKind.CharacterEscape, $.or('t', 'r', 'n'));
const stringEscape = $.or(
    hexEscape,
    unicodeEscape,
    extendedEscape,
    characterEscape,
    $.not($.or('\r', '\n'))
);
const stringLiteral = $.token(
    TokenKind.StringLiteral,
    $.push(
        { skip: [] },
        $.or(
            $.and(
                '"',
                $.zero(
                    $.or(
                        $.and($.hide('\\'), stringEscape),
                        $.not('\\', '"', '\r', '\n')
                    ),
                    '"'
                ),
                $.and(
                    "'",
                    $.zero(
                        $.or(
                            $.and($.hide('\\'), stringEscape),
                            $.not('\\', "'", '\r', '\n')
                        ),
                        "'"
                    )
                )
            )
        )
    )
);

const propertyAccess = $.token(
    TokenKind.PropertyAccess,
    $.hide('.'),
    identifier
);
const optionalPropertyAccess = $.token(
    TokenKind.OptionalPropertyAccess,
    $.hide('?.'),
    identifier
);
const valueAccess = $.token(
    TokenKind.ValueAccess,
    $.hide('['),
    expression,
    $.hide(']')
);
const methodCall = $.token(
    TokenKind.MethodCall,
    $.hide('('),
    $.optional(
        expression,
        $.zero($.hide(','), expression),
        $.optional($.hide(','))
    ),
    $.hide(')')
);

const arrayLiteral = $.token(
    TokenKind.ArrayLiteral,
    $.hide('['),
    $.optional(
        expression,
        $.zero($.hide(','), expression),
        $.optional($.hide(','))
    ),
    $.hide(']')
);
const mapProperty = $.token(
    TokenKind.MapProperty,
    expression,
    $.hide(':'),
    expression
);
const mapLiteral = $.token(
    TokenKind.MapLiteral,
    $.hide('{'),
    $.optional(
        mapProperty,
        $.zero($.hide(','), mapProperty),
        $.optional($.hide(','))
    ),
    $.hide('}')
);

const parameter = $.token(
    TokenKind.Parameter,
    identifier,
    $.optional($.hide(':'), type)
);
const parameterList = $.token(
    TokenKind.ParameterList,
    $.hide('('),
    $.optional(
        parameter,
        $.zero($.hide(','), parameter),
        $.optional($.hide(','))
    ),
    $.hide(')')
);

const functionExpression = $.token(
    TokenKind.FunctionExpression,
    $.hide($.keyword('def')),
    parameterList,
    $.optional($.hide(':'), type),
    $.hide('=>'),
    expression
);
const puzzleExpression = $.token(
    TokenKind.PuzzleExpression,
    $.hide($.keyword('puzzle')),
    parameterList,
    $.optional($.hide(':'), type),
    $.hide('=>'),
    expression
);
const elifExpression = $.token(
    TokenKind.ElifExpression,
    $.hide($.keyword('elif')),
    expression,
    $.hide($.keyword('do')),
    expression
);
const elseExpression = $.token(
    TokenKind.ElseExpression,
    $.hide($.keyword('else')),
    expression
);
const ifExpression = $.token(
    TokenKind.IfExpression,
    $.hide($.keyword('if')),
    expression,
    $.hide($.keyword('then')),
    expression,
    $.zero(elifExpression),
    $.optional(elseExpression)
);
const forExpression = $.token(
    TokenKind.ForExpression,
    $.hide($.keyword('for')),
    identifier,
    $.hide($.keyword('in')),
    expression,
    $.hide($.keyword('do')),
    expression
);

const atomExpression = $.or(
    identifier,
    integerLiteral,
    stringLiteral,
    arrayLiteral,
    mapLiteral,
    hexLiteral,
    octalLiteral,
    binaryLiteral,
    functionExpression,
    puzzleExpression,
    ifExpression,
    forExpression,
    $.and($.hide('('), expression, $.hide(')'))
);
const suffixExpression = $.or(
    $.token(
        TokenKind.SuffixExpression,
        atomExpression,
        $.one(
            $.or(
                propertyAccess,
                optionalPropertyAccess,
                valueAccess,
                methodCall
            )
        )
    ),
    atomExpression
);
const prefixExpression = $.or(
    $.token(
        TokenKind.PrefixExpression,
        $.one($.or('+', '-', '~', $.keyword('not'))),
        suffixExpression
    ),
    suffixExpression
);
const rangeExpression = $.or(
    $.token(
        TokenKind.RangeExpression,
        prefixExpression,
        $.hide($.or('...', '..')),
        prefixExpression,
        $.optional($.hide('::'), prefixExpression)
    ),
    prefixExpression
);
const factorExpression = $.or(
    $.token(
        TokenKind.FactorExpression,
        rangeExpression,
        $.one($.or('*', '/', '%'), rangeExpression)
    ),
    rangeExpression
);
const termExpression = $.or(
    $.token(
        TokenKind.TermExpression,
        factorExpression,
        $.one($.or('+', '-'), factorExpression)
    ),
    factorExpression
);
const shiftExpression = $.or(
    $.token(
        TokenKind.ShiftExpression,
        termExpression,
        $.one($.or('<<<', '>>>', '<<', '>>'), termExpression)
    ),
    termExpression
);
const isNotExpression = $.token(
    TokenKind.IsNotExpression,
    $.hide($.keyword('is')),
    $.hide($.keyword('not')),
    type
);
const isExpression = $.token(
    TokenKind.IsExpression,
    $.hide($.keyword('is')),
    type
);
const asExpression = $.token(
    TokenKind.AsExpression,
    $.hide($.keyword('as')),
    type
);
const inExpression = $.token(
    TokenKind.InExpression,
    $.hide($.keyword('in')),
    shiftExpression
);
const notInExpression = $.token(
    TokenKind.NotInExpression,
    $.hide($.keyword('not')),
    $.hide($.keyword('in')),
    shiftExpression
);
const checkExpression = $.or(
    $.token(
        TokenKind.CheckExpression,
        shiftExpression,
        $.zero(
            $.or(
                isNotExpression,
                isExpression,
                asExpression,
                notInExpression,
                inExpression
            )
        )
    ),
    shiftExpression
);
const equalityExpression = $.or(
    $.token(
        TokenKind.EqualityExpression,
        checkExpression,
        $.one($.or('==', '!=', '<=', '>=', '<', '>'), checkExpression)
    ),
    checkExpression
);
const bitwiseAndExpression = $.or(
    $.token(
        TokenKind.BitwiseAndExpression,
        equalityExpression,
        $.one($.hide('&'), equalityExpression)
    ),
    equalityExpression
);
const bitwiseXorExpression = $.or(
    $.token(
        TokenKind.BitwiseXorExpression,
        bitwiseAndExpression,
        $.one($.hide('^'), bitwiseAndExpression)
    ),
    bitwiseAndExpression
);
const bitwiseOrExpression = $.or(
    $.token(
        TokenKind.BitwiseOrExpression,
        bitwiseXorExpression,
        $.one($.hide('|'), bitwiseXorExpression)
    ),
    bitwiseXorExpression
);
const logicalAndExpression = $.or(
    $.token(
        TokenKind.LogicalAndExpression,
        bitwiseOrExpression,
        $.one($.hide($.keyword('and')), bitwiseOrExpression)
    ),
    bitwiseOrExpression
);
const logicalOrExpression = $.or(
    $.token(
        TokenKind.LogicalOrExpression,
        logicalAndExpression,
        $.one($.hide($.keyword('or')), logicalAndExpression)
    ),
    logicalAndExpression
);
const referenceExpression = $.or(
    $.token(
        TokenKind.ReferenceExpression,
        identifier,
        $.zero($.or(propertyAccess, valueAccess))
    ),
    identifier
);
expression.rule = $.or(
    $.token(
        TokenKind.AssignmentExpression,
        referenceExpression,
        $.or(
            '|=',
            '^=',
            '&=',
            '<<<=',
            '>>>=',
            '<<=',
            '>>=',
            '+=',
            '-=',
            '*=',
            '/=',
            '%=',
            '='
        ),
        expression
    ),
    logicalOrExpression
);

const functionTypeParameters = $.token(
    TokenKind.FunctionTypeParameters,
    $.hide('('),
    $.optional(type, $.zero($.hide(','), type), $.optional($.hide(','))),
    $.hide(')')
);

const tupleType = $.token(
    TokenKind.TupleType,
    $.hide('['),
    $.optional(type, $.zero($.hide(','), type), $.optional($.hide(','))),
    $.hide(']')
);
const mapType = $.token(
    TokenKind.MapType,
    $.hide('{'),
    type,
    $.hide(':'),
    $.hide('}')
);
const functionType = $.token(
    TokenKind.FunctionType,
    functionTypeParameters,
    $.hide('->'),
    type
);
const atomType = $.or(
    tupleType,
    mapType,
    functionType,
    identifier,
    $.and($.hide('('), type, $.hide(')'))
);
const arrayType = $.token(TokenKind.ArrayType, $.hide('['), $.hide(']'));
const suffixType = $.or(
    $.token(TokenKind.SuffixType, atomType, $.one(arrayType)),
    atomType
);
type.rule = $.or(
    $.token(TokenKind.UnionType, suffixType, $.one($.hide('|'), suffixType)),
    suffixType
);

const block = $.token(
    TokenKind.Block,
    $.hide('{'),
    $.zero(statement),
    $.hide('}')
);

const functionStatement = $.token(
    TokenKind.FunctionStatement,
    $.hide($.keyword('def')),
    identifier,
    parameterList,
    $.optional($.hide(':'), type),
    $.or($.and($.hide('=>'), statement), block)
);
const puzzleStatement = $.token(
    TokenKind.PuzzleStatement,
    $.hide($.keyword('puzzle')),
    identifier,
    parameterList,
    $.optional($.hide(':'), type),
    $.or($.and($.hide('=>'), statement), block)
);
const typeStatement = $.token(
    TokenKind.TypeStatement,
    $.hide($.keyword('type')),
    identifier,
    $.optional($.hide('='), type),
    $.hide(';')
);
const letStatement = $.token(
    TokenKind.LetStatement,
    $.hide($.keyword('let')),
    identifier,
    $.optional($.hide(':'), type),
    $.optional($.hide('='), expression),
    $.hide(';')
);
const returnStatement = $.token(
    TokenKind.ReturnStatement,
    $.hide($.keyword('return')),
    $.optional(expression),
    $.hide(';')
);
const elifStatement = $.token(
    TokenKind.ElifStatement,
    $.hide($.keyword('elif')),
    expression,
    $.or($.and($.hide($.keyword('then')), statement), block)
);
const elseStatement = $.token(
    TokenKind.ElseStatement,
    $.hide($.keyword('else')),
    $.or(statement, block)
);
const ifStatement = $.token(
    TokenKind.IfStatement,
    $.hide($.keyword('if')),
    expression,
    $.or($.and($.hide($.keyword('then')), statement), block),
    $.zero(elifStatement),
    $.optional(elseStatement)
);
const forStatement = $.token(
    TokenKind.ForStatement,
    $.hide($.keyword('for')),
    identifier,
    $.hide($.keyword('in')),
    expression,
    $.or($.and($.hide($.keyword('do')), statement), block)
);
statement.rule = $.or(
    functionStatement,
    puzzleStatement,
    typeStatement,
    letStatement,
    returnStatement,
    ifStatement,
    forStatement,
    $.and($.optional(expression), $.hide(';'))
);

export function parse(source: string) {
    return $.parse(
        source,
        TokenKind.Program,
        'Mismatched input',
        $.zero(statement),
        $.end()
    );
}
