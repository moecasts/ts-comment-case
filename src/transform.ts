import { forEachComment } from 'tsutils/util';
import * as ts from 'typescript';

export enum CommentCase {
  JSDoc = 'jsdoc',
  Single = 'single',
}

/**
 * transform comment from `/** *\/` to `//`
 */
export const transformCommentIntoSingleLineStyle = (comment: string) => {
  if (!/\/\*([\s\S]*)\*\//.test(comment)) {
    return comment;
  }

  const lines = comment.split('\n');
  const transformedLines = lines.map((line) => {
    const startCommentRegex = /\/\*\s*/;
    const endCommentRegex = /\s*\*\//;
    const contentCommentRegex = /(\s*?)( ?\*)(.*)/;
    const EMPTY = undefined;

    if (startCommentRegex.test(line)) {
      return EMPTY;
    }

    if (endCommentRegex.test(line)) {
      return EMPTY;
    }

    const result = contentCommentRegex.exec(line);
    const [_, indent, _prefix, text] = result || [];

    if (!text) {
      return EMPTY;
    }

    return `${indent}//${text}`;
  });

  return transformedLines
    .filter((line) => typeof line !== 'undefined')
    .join('\n')
    .trim();
};

/**
 * transform comment from `//` to `/** *\/`
 */
export const transformCommentIntoJSDocStyle = (
  comment: string,
  indent = '',
) => {
  if (/\/\*([\s\S]*)\*\//.test(comment)) {
    return comment;
  }

  const replacedComments = comment.replace(/\/\//g, ' *');

  return `/**\n${indent}${replacedComments}\n${indent} */`;
};

export type TransformOptions = {
  commentCase?: CommentCase;
};

const defaultTransformOptions = {
  commentCase: CommentCase.JSDoc,
} satisfies TransformOptions;

export const transform = (content: string, options: TransformOptions = {}) => {
  const { commentCase } = {
    ...defaultTransformOptions,
    ...options,
  };

  const src = ts.createSourceFile(
    'tmp.ts',
    content,
    ts.ScriptTarget.Latest,
    true,
  );

  const commentRanges: ts.CommentRange[] = [];

  // merge continuous single line comments
  forEachComment(src, (fullText, commentRange) => {
    const lastCommentRange = commentRanges[commentRanges.length - 1];

    if (lastCommentRange) {
      const separator = fullText
        .slice(lastCommentRange.end, commentRange.pos)
        .replace(/^\n[ \t]*/, '');

      const isContinuous =
        lastCommentRange.kind === ts.SyntaxKind.SingleLineCommentTrivia &&
        commentRange.kind === ts.SyntaxKind.SingleLineCommentTrivia &&
        (!separator
          ? true
          : !separator.split('\n').some((line) => {
              return !/[ \t]*\/\//.test(line);
            }));

      if (isContinuous) {
        lastCommentRange.end = commentRange.end;
        return;
      }
    }

    commentRanges.push(commentRange);
  });

  const { transformedContent } = commentRanges.reduce(
    (acc, commentRange) => {
      if (
        (commentCase === CommentCase.JSDoc &&
          commentRange.kind !== ts.SyntaxKind.SingleLineCommentTrivia) ||
        (commentCase === CommentCase.Single &&
          commentRange.kind !== ts.SyntaxKind.MultiLineCommentTrivia)
      ) {
        return acc;
      }

      const fullText = src.getFullText();

      let { transformedContent, offset } = acc;

      const comments = fullText.slice(commentRange.pos, commentRange.end);

      let replacedComments = comments;

      if (commentCase === CommentCase.Single) {
        replacedComments = transformCommentIntoSingleLineStyle(comments);
      }

      if (commentCase === CommentCase.JSDoc) {
        const prefix = fullText.slice(
          fullText.slice(0, commentRange.pos).lastIndexOf('\n'),
          commentRange.pos,
        );

        const isInlineComment = prefix && !/^\n?\s+$/.test(prefix);

        if (isInlineComment) {
          return acc;
        }

        const indent = /\s*/.test(prefix)
          ? prefix.match(/\n?([ \t]*)/)?.[1]
          : '';
        replacedComments = transformCommentIntoJSDocStyle(comments, indent);
      }

      const diffLength = replacedComments.length - comments.length;

      transformedContent =
        transformedContent.slice(0, commentRange.pos + offset) +
        replacedComments +
        transformedContent.slice(commentRange.end + offset);

      offset += diffLength;

      return {
        transformedContent,
        offset,
      };
    },
    {
      transformedContent: src.getFullText(),
      offset: 0,
    },
  );

  return transformedContent;
};
