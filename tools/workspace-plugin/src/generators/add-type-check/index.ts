import { Tree, formatFiles, readProjectConfiguration, updateProjectConfiguration } from '@nx/devkit';

interface Schema {
  name: string;
}

export default async function (tree: Tree, schema: Schema) {
  await addTypeCheck(tree, schema);
  await formatFiles(tree);

  return () => {};
}

export async function addTypeCheck(tree: Tree, schema: Schema) {
  const { name } = schema;
  const projectConfig = readProjectConfiguration(tree, name);
  const path = projectConfig.root;

  const commands = [`tsc -p ${path}/tsconfig.spec.json --noEmit`];

  projectConfig.targets = {
    ...projectConfig.targets,
    'type-check': {
      executor: 'nx:run-commands',
      options: { commands },
    },
  };

  updateProjectConfiguration(tree, name, projectConfig);
}
