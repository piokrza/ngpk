import { Tree, formatFiles, readProjectConfiguration, updateProjectConfiguration } from '@nx/devkit';

interface Schema {
  name: string;
}

export default async function (tree: Tree, schema: Schema) {
  await addLintChanged(tree, schema.name);
  await formatFiles(tree);

  return () => {};
}

export async function addLintChanged(tree: Tree, projectName: string) {
  const projectConfig = readProjectConfiguration(tree, projectName);
  //   TODO: Wiktor - przygotuj odpowiedni skrypt
  //   projectConfig.targets = {
  //     ...projectConfig.targets,
  //     'lint-changed': {
  //       executor: 'nx:run-commands',
  //       options: {
  //         commands: [`npx link do skryptu --path ${projectConfig.root}`],
  //       },
  //     },
  //   };
  updateProjectConfiguration(tree, projectName, projectConfig);
}
