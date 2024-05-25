import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, test } from 'vitest';

import { moveTrailingCommentToLeading } from './manipulate';

const code2 = readFileSync(join(__dirname, '__materials__/code-2.ts'), 'utf-8');

describe('manipulate', () => {
  test('moveTrailingCommentToLeading', () => {
    const result = moveTrailingCommentToLeading(code2);

    expect(result).toMatchSnapshot();
  });
});
