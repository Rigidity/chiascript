import { Token } from 'dissector';
import { Scope, TokenKind, Type } from './types';

export function transpile(
    node: Token<TokenKind>,
    scope: Scope
): [string, Type] {
    if (typeof node === 'string') throw new Error('Cannot compile a string.');
    switch (node.token) {
        case TokenKind.Program: {
            console.log(node);
        }
    }
    throw new Error(`Unhandled ${node.token}`);
}
