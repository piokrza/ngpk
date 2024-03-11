/* eslint-disable no-console */
import { libraryGenerator, UnitTestRunner } from '@nx/angular/generators';
import { formatFiles, readJson, readProjectConfiguration, writeJson } from '@nx/devkit';
import type { Tree } from 'nx/src/devkit-exports';

import { getDomainProjectName, getRelativeRoot } from '../../utils';
import addTypeCheck from '../add-type-check';
import { DEFAULT_NGPK_ANGULAR_LIB_OPTIONS, type NgPkAngularLibrarySchema } from './schema';

export default async function (tree: Tree, schema: NgPkAngularLibrarySchema) {
  await generateAngularLibrary(tree, {
    ...DEFAULT_NGPK_ANGULAR_LIB_OPTIONS,
    ...schema,
  });

  await setupUnitTests(tree, schema);
  await sanitizeTsConfigs(tree, schema);
  //   await addLintChanged(tree, { name: getDomainProjectName(schema) });
  await adjustESLint(tree, schema);
  await formatFiles(tree);

  return () => {};
}

async function generateAngularLibrary(tree: Tree, schema: NgPkAngularLibrarySchema) {
  console.log(`Generating Angular library "${schema.name}"`);
  if (schema.directory) {
    console.log(`in directory "${schema.directory}"`);
  }

  console.debug(`Running library-generator for "${schema.name}"`);

  await libraryGenerator(tree, {
    tags: Array.from(new Set([`scope:core`, ...(schema.tags?.split(',') ?? [])]))
      .sort()
      .join(','),
    ...schema,
    strict: true,
    prefix: 'ngpk',
    skipPackageJson: true,
    skipModule: true,
  });
  console.debug(`"${schema.name}" library generated`);
}

async function setupUnitTests(tree: Tree, schema: NgPkAngularLibrarySchema) {
  const name = getDomainProjectName(schema);
  const libraryRoot = readProjectConfiguration(tree, name).root;

  if (schema.unitTestRunner === UnitTestRunner.None) {
    console.log('Skipping setting up unit tests for library', getDomainProjectName(schema));
    return;
  }

  const relativeRoot = getRelativeRoot(tree, getDomainProjectName(schema));
  const jestFilePath = `${libraryRoot}/jest.config.ts`;
  tree.write(
    jestFilePath,
    `
        /* eslint-disable */
        import {getJestConfig} from '${relativeRoot}/jest.config.base';
        import { Config } from 'jest';

        const projectName = '${name}';

        const config: Config = {
            ...getJestConfig(projectName),
        };

        export default config;
        `
  );

  tree.write(
    `${libraryRoot}/src/test-setup.ts`,
    `
        /* eslint-disable */
        // Don't change the order {
        import 'jest-plugin-must-assert';
        import 'jest-preset-angular/setup-jest';
        // }
        `
  );

  const tsconfigSpec = readJson(tree, `${libraryRoot}/tsconfig.spec.json`);
  tsconfigSpec.include = tsconfigSpec.include
    .filter((p: string) => !p.includes('*.test'))
    .filter((p: string) => !p.includes('*.js'))
    .filter((p: string) => !p.includes('*.tsx'))
    .map((p: string) => (p.startsWith('src/') ? p.slice(4) : p));

  delete tsconfigSpec.compilerOptions.module;
  tsconfigSpec.compilerOptions.esModuleInterop = true;
  tsconfigSpec.files = ['src/test-setup.ts'];
  writeJson(tree, `${libraryRoot}/tsconfig.spec.json`, tsconfigSpec);

  await addTypeCheck(tree, { name: getDomainProjectName(schema) });
}

async function sanitizeTsConfigs(tree: Tree, schema: NgPkAngularLibrarySchema) {
  const libraryRoot = readProjectConfiguration(tree, getDomainProjectName(schema)).root;

  // Remove library specific compiler-options
  const tsconfig = readJson(tree, `${libraryRoot}/tsconfig.json`);
  delete tsconfig.compilerOptions;
  writeJson(tree, `${libraryRoot}/tsconfig.json`, tsconfig);

  // Remove `*.test.ts` globs from config files
  const tsconfigLib = readJson(tree, `${libraryRoot}/tsconfig.lib.json`);
  const exclude = tsconfigLib.exclude
    .filter((p: string) => !p.includes('*.test.ts'))
    .filter((p: string) => !p.includes('*.js'))
    .map((p: string) => (p.startsWith('src/') ? p.slice(4) : p));

  writeJson(tree, `${libraryRoot}/tsconfig.json`, {
    ...tsconfigLib,
    exclude,
    include: ['**/*.ts'],
  });
}

async function adjustESLint(tree: Tree, schema: NgPkAngularLibrarySchema) {
  const libraryRoot = readProjectConfiguration(tree, getDomainProjectName(schema)).root;
  const eslint = readJson(tree, `${libraryRoot}/.eslintrc.json`);
  eslint.overrides[0].extends = ['plugin:@nrwl/nx/angular', 'plugin:@angular-eslint/template/process-inline-templates'];
  eslint.overrides[0].rules['@typescript-eslint/no-non-null-assertion'] = 'warn';
  eslint.overrides[0].rules['no-restricted-syntax'] = 'off';
  writeJson(tree, `${libraryRoot}/.eslintrc.json`, eslint);
}
