import * as ts from 'typescript';

/**
 * auto move following single line comment of the identifier before it
 */
export const moveTrailingCommentToLeading = (content: string) => {
  const src = ts.createSourceFile(
    'tmp.ts',
    content,
    ts.ScriptTarget.Latest,
    true,
  );

  let result = src.getFullText();
  let offset = 0;

  const consumedCommentRange = new Map<string, boolean>();

  const traverse = (node: ts.Node) => {
    const trailingCommentRanges = ts.getTrailingCommentRanges(
      src.getFullText(),
      node.getEnd(),
    );

    trailingCommentRanges?.forEach((range) => {
      const rangeKey = `${range.pos}-${range.end}`;
      if (consumedCommentRange.has(rangeKey)) {
        return;
      }

      const trailingComment = src.getFullText().slice(range.pos, range.end);

      let prefixText = src
        .getFullText()
        .slice(node.getFullStart(), node.getStart());

      if (node.getFullStart() !== 0) {
        const lastBreakLine = prefixText.lastIndexOf('\n');
        prefixText =
          lastBreakLine > -1
            ? prefixText.slice(lastBreakLine + 1, node.getStart())
            : '';
      }

      const indent = /^\s*/.test(prefixText)
        ? prefixText.match(/\n?([ \t]*)/)?.[1]
        : '';

      const leadingComment = trailingComment + '\n' + indent;

      // move trailing comment before the node
      result =
        result.slice(0, node.getStart() + offset) +
        leadingComment +
        node.getText() +
        result.slice(range.end + offset);

      offset += indent?.length || 0;

      consumedCommentRange.set(rangeKey, true);
    });

    ts.forEachChild(node, traverse);
  };

  traverse(src);

  return result;
};
