import { Token } from 'dissector';
import { Scope, TokenKind, Type } from './types';
export declare function transpile(node: Token<TokenKind>, scope: Scope): [string, Type];
