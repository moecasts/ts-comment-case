import { Command, CommanderError, Option } from 'commander';

import { moveTrailingCommentToLeading } from './manipulate';
import { CommentCase, transform } from './transform';

export enum Action {
  Transform = 'transform',
  Move = 'move',
  MoveAndTransform = 'move_and_transform',
}

export const PLUGIN_NAME = 'tscc';

export type CommandOptions = {
  case: CommentCase;
  action: Action;
};

export const run = () => {
  const cli = new Command(PLUGIN_NAME);
  cli
    .name(PLUGIN_NAME)
    .exitOverride()
    .argument('<content>', 'input code')
    .addOption(
      new Option(
        '-a, --action [action]',
        `action (${Object.values(Action).join(', ')})`,
      )
        .choices(Object.values(Action))
        .default(Action.Transform),
    )
    .addOption(
      new Option(
        '-c, --case [case]',
        `target comment style (${Object.values(CommentCase).join(', ')})`,
      )
        .choices(Object.values(CommentCase))
        .default(CommentCase.JSDoc),
    );

  try {
    cli.parse(process.argv);
    const [content] = cli.args;

    const getOutput = (content: string, options: CommandOptions): string => {
      const { case: commentCase, action } = options;

      if (action === Action.Transform) {
        return transform(content, {
          commentCase,
        });
      }

      if (action === Action.Move) {
        return moveTrailingCommentToLeading(content);
      }

      if (action === Action.MoveAndTransform) {
        return transform(moveTrailingCommentToLeading(content), {
          commentCase,
        });
      }

      return content;
    };

    const output = getOutput(content, cli.opts());

    process.stdout.write(output);
  } catch (err) {
    const error: CommanderError = err as CommanderError;
    // both commander.help and commander.helpDisplayed need to be considered
    if (
      error.code === 'commander.help' ||
      error.code === 'commander.missingArgument' ||
      error.code === 'commander.helpDisplayed'
    ) {
      return;
    }

    console.error(error);
  }
};

run();
