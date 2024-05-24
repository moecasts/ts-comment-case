import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';

const code = readFileSync(join(__dirname, '__materials__/code.ts'), 'utf-8');

describe('transform', () => {
  test('adds 1 + 2 to equal 3', () => {
    console.log(code);
    // console.log(transform.toString());
  });
});
