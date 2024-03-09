import { Tree, formatFiles, readJson, readProjectConfiguration, writeJson } from '@nx/devkit';

type Schema1 = {
  libraryName: string;
  exportName?: string;
  skipDelete?: boolean;
};

type Schema2 = {
  pathAlias: string;
  skipDelete?: boolean;
};

type Schema = Schema1 | Schema2;

export default async function (tree: Tree, schema: Schema) {
  await removeProjectExport(tree, schema);
  await formatFiles(tree);

  return () => {};
}

export async function removeProjectExport(tree: Tree, schema: Schema): Promise<string> {
  let pathAlias = '';

  if ('pathAlias' in schema) {
    pathAlias = schema.pathAlias;
  } else {
    const { libraryName, exportName } = schema;
    const config = readProjectConfiguration(tree, libraryName);
    const path = config.root.replace('libs/', '');

    pathAlias = `@ng-pk/${path}/${exportName}`;
  }

  const tsconfigBaseJson = readJson(tree, 'tsconfig.base.json');
  const pathToIndex = tsconfigBaseJson.compilerOptions.paths[pathAlias]?.[0];
  const exportPath = pathToIndex?.replace('/index.ts', '');

  if (!schema.skipDelete) {
    tree.delete(pathToIndex);
  }

  delete tsconfigBaseJson.compilerOptions.paths[pathAlias];
  writeJson(tree, 'tsconfig.base.json', tsconfigBaseJson);

  return exportPath;
}
