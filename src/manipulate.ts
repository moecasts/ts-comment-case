import * as ts from 'typescript';

/**
 * auto move following single line comment of the identifier before it
 */
export const moveSingleLineComment = (content: string) => {
  const src = ts.createSourceFile(
    'tmp.ts',
    content,
    ts.ScriptTarget.Latest,
    true,
  );

  const visit = (node: ts.Node) => {
    console.log('debug1 visit', {
      node: node.getText(),
    });

    const trailingCommentRanges = ts.getTrailingCommentRanges(
      src.getFullText(),
      node.getEnd(),
    );

    trailingCommentRanges?.forEach((range) => {
      const trailingComment = src.getFullText().slice(range.pos, range.end);
      trailingComment;
      // console.log('debug1 visit 2', {
      //   node: node.getFullText(),
      //   trailingComment,
      // });
    });

    // console.log('debug1 visit', node);
  };

  // ts.forEachChild(src, visit);
  ts.forEachChild(src, visit);

  // console.log(src);
};
