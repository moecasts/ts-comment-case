import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, test } from 'vitest';

import {
  CommentCase,
  transform,
  transformCommentIntoJSDocStyle,
  transformCommentIntoSingleLineStyle,
} from './transform';

const code = readFileSync(join(__dirname, '__materials__/code.ts'), 'utf-8');
const code2 = readFileSync(join(__dirname, '__materials__/code-2.ts'), 'utf-8');

code;
code2;

describe('transform', () => {
  test('transformCommentIntoSingleLineStyle', () => {
    const comments = [
      '/** multi line comment A  b */',

      '// single line comment',

      `/** multi line comment A  b
      */`,

      `
/**
 * multi line comment A
 * multi line comment B
 *      multi line comment C
 */`,
    ];

    comments.forEach((comment) => {
      const result = transformCommentIntoSingleLineStyle(comment);
      expect(result).toMatchSnapshot();
    });
  });

  test('transformCommentIntoJSDocStyle', () => {
    const comments = ['// single line comment', '/** single line comment */'];

    comments.forEach((comment) => {
      const result = transformCommentIntoJSDocStyle(comment);
      expect(result).toMatchSnapshot();
    });
  });

  test('transform comment into single line style', () => {
    const result = transform(code, { commentCase: CommentCase.Single });
    expect(result).toMatchSnapshot();
  });

  test('transform comment into JSDoc style', () => {
    const result = transform(code, { commentCase: CommentCase.JSDoc });
    expect(result).toMatchSnapshot();
  });
});
