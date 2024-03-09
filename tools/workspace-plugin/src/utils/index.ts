import type { Schema as AngularLibrarySchema } from '@nx/angular/src/generators/library/schema';
import { names, readJson, readProjectConfiguration, writeJson } from '@nx/devkit';
import type { Tree } from 'nx/src/devkit-exports';

export function getRelativeRoot(tree: Tree, name: string): string {
  const libraryRoot = readProjectConfiguration(tree, name).root;
  const root = Array.from(new Array(libraryRoot.split('/').length).fill('..')).join('/');
  return root;
}

export function getDomainProjectName(schema: AngularLibrarySchema): string {
  const name = schema.directory ? `${schema.directory?.split('/').join('-')}-${schema.name}` : schema.name;
  return names(name).fileName.split('/').join('-');
}

export function getProjectTypescriptPathAlias(tree: Tree, name: string): string | null {
  const tsconfigBase = readJson(tree, `tsconfig.base.json`);
  return Object.keys(tsconfigBase.compilerOptions.paths).find((path: string) => path.includes(name)) || null;
}

export function renameModule(tree: Tree, path: string, name: string): void {
  let ngModule = tree.read(path, 'utf-8') || '';
  ngModule = ngModule.slice(0, ngModule.indexOf('export class'));
  ngModule = `${ngModule} export class ${name} {}`;

  tree.write(path, `${ngModule}`);
}

export function modifyPathAlias(tree: Tree, pathAlias: string, source: string): void {
  const tsconfigBaseJson = readJson(tree, `tsconfig.base.json`);
  tsconfigBaseJson.compilerOptions.paths = {
    ...tsconfigBaseJson.compilerOptions.paths,
    [pathAlias]: [source],
  };
  writeJson(tree, `tsconfig.base.json`, tsconfigBaseJson);
}
