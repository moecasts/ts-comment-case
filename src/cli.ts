import { Command, CommanderError, Option } from 'commander';

import { CommentCase, transform } from './transform';

export const PLUGIN_NAME = 'tscc';

export const run = () => {
  const cli = new Command(PLUGIN_NAME);
  cli
    .name(PLUGIN_NAME)
    .exitOverride()
    .argument('<content>', 'input code')
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
    const { case: commentCase } = cli.opts();

    let output = '';

    output = transform(content, {
      commentCase,
    });

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
