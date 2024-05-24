import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';

import { moveSingleLineComment } from './manipulate';

const code2 = readFileSync(join(__dirname, '__materials__/code-2.ts'), 'utf-8');

describe('manipulate', () => {
  test('moveSingleLineComment', () => {
    moveSingleLineComment(code2);
    // console.log(code2);

    // console.log(transform.toString());
  });
});
