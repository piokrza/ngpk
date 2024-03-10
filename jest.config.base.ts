import * as path from 'path';

import { readCachedProjectGraph } from '@nx/devkit';
import type { Config } from 'jest';

const esModules = ['uuid', '@angular', '@ngx-translate', '@testing-library', '@ngneat', 'lodash-es', 'gov-layout-lib'];

const getConfigRoot = (projectName: string): string => {
  const projects = readCachedProjectGraph().nodes;
  const sourceRoot = projects[projectName]?.data.sourceRoot;

  if (!sourceRoot) {
    throw new Error(`No sourceRoot found for project "${projectName}"`);
  }

  return sourceRoot.endsWith('/src') ? sourceRoot.split('/src')[0]! : sourceRoot;
};

export const getJestConfig: (projectName?: string) => Config = projectName => {
  let relativePathToRoot = '../..';
  const cwd = process.cwd();

  if (projectName) {
    relativePathToRoot = path.relative(getConfigRoot(projectName), cwd);
  }

  return {
    cacheDirectory: `${cwd}/jest_cache/${projectName}`,
    preset: `${relativePathToRoot}/jest.preset.js`,
    displayName: projectName,
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    setupFiles: [`${relativePathToRoot}/jest.polyfills.js`],
    transform: {
      '^.+\\.(ts|mjs|js|html|svg)$': [
        'jest-preset-angular',
        {
          tsconfig: '<rootDir>/tsconfig.spec.json',
          stringifyContentPathRegex: '\\.(html|svg)$',
          isolatedModules: true,
        },
      ],
    },
    transformIgnorePatterns: [`node_modules/(?!.*\\mjs$|${esModules.join('|')})`],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      // 'jest-preset-angular/build/serializers/hmtl-comment',
    ],
    testRunner: 'jest-jasmine2',
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
  };
};
