# ts-comment-case

[![NPM version](https://img.shields.io/npm/v/ts-comment-case.svg?style=flat)](https://npmjs.com/package/ts-comment-case)
[![NPM downloads](https://img.shields.io/npm/dm/ts-comment-case.svg?style=flat)](https://npmjs.com/package/ts-comment-case)

## Installation

```bash

$ pnpm add ts-comment-case
```

## Usage

### CLI

```bash
$ tscc --help
Usage: tscc [options] <content>

Arguments:
  content                input code

Options:
  -a, --action [action]  action (transform, move, move_and_transform) (choices: "transform", "move", "move_and_transform", default: "transform")
  -c, --case [case]      target comment style (jsdoc, single) (choices: "jsdoc", "single", default: "jsdoc")
  -h, --help             display help for command
```

examples:

```bash
# transform comment to jsdoc style
$ tscc "// comment"

# transform comment to single line style
$ tscc -c single "/** comment */"

# move trailing comment to leading
$ tscc -a move "const variable = 1; // trailing comment"

# move trailing comment to leading and transform to JSDoc style
$ tscc -a move_and_transform "const variable = 1; // trailing comment"

# move trailing comment to leading and transform to single line style
$ tscc -c single -a move_and_transform "const variable = 1; /** trailing comment */"
```

### Code

this is a normal npm package, so you can using it by importing it.

examples:

```ts
import {
  CommentCase,
  moveTrailingCommentToLeading,
  transform,
} from 'ts-comment-case';

const code = '// some code';

transform(code, { commentCase: CommentCase.JSDoc });

moveTrailingCommentToLeading(code);
```

#### Functions

```ts
export declare enum CommentCase {
  JSDoc = 'jsdoc',
  Single = 'single',
}
/**
 * transform comment from `/** *\/` to `//`
 */
export declare const transformCommentIntoSingleLineStyle: (
  comment: string,
) => string;
/**
 * transform comment from `//` to `/** *\/`
 */
export declare const transformCommentIntoJSDocStyle: (
  comment: string,
  indent?: string,
) => string;
export type TransformOptions = {
  commentCase?: CommentCase;
};
/**
 * transform code comments
 */
export declare const transform: (
  content: string,
  options?: TransformOptions,
) => string;

/**
 * auto move following single line comment of the identifier before it
 */
export declare const moveTrailingCommentToLeading: (content: string) => string;
```

## Development

```bash
$ pnpm install
```

```bash
$ pnpm run dev
$ pnpm run build
```

## Related

- [nvim-ts-comment-case](https://github.com/moecasts/nvim-ts-comment-case)
- [vscode-ts-comment-case](https://github.com/moecasts/vscode-ts-comment-case)

## LICENSE

MIT
