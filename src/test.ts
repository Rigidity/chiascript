import { toPosition } from 'dissector';
import fs from 'fs';
import path from 'path';
import { transpile } from './compiler';
import { parse } from './index';
import { Context, Scope } from './types';

const source = fs.readFileSync(path.join(__dirname, '..', 'test.chia'), 'utf8');
const ast = parse(source);

if (Array.isArray(ast)) {
    const context = new Context();
    const scope = new Scope(context);
    const result = transpile(ast, scope);
    console.log(result);
} else {
    const position = toPosition(source, ast.start);
    console.log(`${ast.error} at ${position.line}:${position.column}`);
}
