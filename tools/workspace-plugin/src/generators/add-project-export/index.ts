import { Tree, formatFiles, readJson, readProjectConfiguration, writeJson } from '@nx/devkit';

interface Schema {
  libraryName: string;
  exportName?: string;
  exportPath?: string;
}

export default async function (tree: Tree, schema: Schema) {
  await addProjectExport(tree, schema);
  await formatFiles(tree);

  return () => {};
}

export async function addProjectExport(tree: Tree, schema: Schema): Promise<string> {
  const { libraryName, exportName } = schema;
  const config = readProjectConfiguration(tree, libraryName);
  const path = config.root.replace('libs/', '');
  const typeAlias = exportName ? `@ng-pk/${path}/${exportName}` : `@ng-pk/${path}`;

  const exportPath = schema.exportPath ?? `${config.sourceRoot}/${exportName}`;
  const pathToIndex = `${exportPath}/index.ts`;

  if (!tree.exists(pathToIndex)) {
    tree.write(pathToIndex, '');
  }

  const tsconfigBaseJson = readJson(tree, 'tsconfig.base.json');
  tsconfigBaseJson.compilerOptions.paths = {
    ...tsconfigBaseJson.compilerOptions.paths,
    [typeAlias]: [pathToIndex],
  };
  writeJson(tree, 'tsconfig.base.json', tsconfigBaseJson);

  return exportPath;
}
