/* eslint-disable no-console */
import { formatFiles, names } from '@nx/devkit';
import type { Tree } from 'nx/src/devkit-exports';

import addProjectExport from '../add-project-export';
import generateAngularLibrary from '../generate-angular-library';
import { NgPkAngularLibrarySchema } from '../generate-angular-library/schema';
import removeProjectExport from '../remove-project-export';

export default async function (tree: Tree, schema: NgPkAngularLibrarySchema) {
  const directory = schema.directory ? (schema.directory.startsWith('core') ? schema.directory : `core/${schema.directory}`) : 'core';
  const projectTag = `${directory.split('/').join('-')}-${names(schema.name).fileName}`;
  schema = {
    ...schema,
    directory,
    tags: `scope:core, project:${projectTag}`,
    strict: true,
    prefix: 'ngpk',
    skipPackageJson: true,
    skipModule: true,
    standalone: true,
    setParserOptionsProject: true,
    changeDetection: 'OnPush',
    style: 'scss',
    simpleName: true,
  };

  await generateAngularLibrary(tree, schema);
  moveFiles(tree, schema);

  const libraryName = `${directory.split('/').join('-')}-${names(schema.name).fileName}`;

  removeProjectExport(tree, { libraryName, skipDelete: true });
  addProjectExport(tree, { libraryName, exportPath: `libs/${directory}/${schema.name}/src` });

  await formatFiles(tree);

  console.log(`\n\n✔ Successfully generated ${schema.name} library.`);
  console.log(`Don't forget to rn "npx nx repair && npx nx format"`);

  return () => {};
}

function moveFiles(tree: Tree, schema: NgPkAngularLibrarySchema) {
  const path = `libs/${schema.directory}/${schema.name}/src/lib`;
  const children = tree.children(`${path}/${schema.name}`);

  children.forEach((child) => {
    tree.write(`${path}/${child}`, tree.read(`${path}/${schema.name}/${child}`)!);
  });
  tree.delete(`${path}/${schema.name}`);
  tree.write(`libs/${schema.directory}/${schema.name}/src/index.ts`, `export * from './lib/${schema.name}.component';`);
}
