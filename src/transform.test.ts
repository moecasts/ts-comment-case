import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';

const code = readFileSync(join(__dirname, '__materials__/code.ts'), 'utf-8');
const code2 = readFileSync(join(__dirname, '__materials__/code-2.ts'), 'utf-8');

code;
code2;

describe('transform', () => {
  test('test', () => {
    // console.log(code2);
    // console.log(transform.toString());
  });
});
