import type { Schema } from '@nx/angular/src/generators/library/schema';
import { UnitTestRunner } from '@nx/angular/src/utils/test-runners';
import { Linter } from '@nx/linter';

export interface NgPkAngularLibraryOptions {
  directory?: string;
  skipStorybook?: boolean;
  skipTailwind?: boolean;
}

export interface NgPkAngularLibrarySchema extends Schema, NgPkAngularLibraryOptions {}

export const DEFAULT_NGPK_ANGULAR_LIB_OPTIONS: Partial<NgPkAngularLibrarySchema> = {
  changeDetection: 'OnPush',
  prefix: 'ngpk',
  style: 'scss',
  flat: true,
  linter: Linter.EsLint,
  setParserOptionsProject: true,
  simpleName: true,
  strict: true,
  unitTestRunner: UnitTestRunner.Jest,
  publishable: false,
  buildable: false,
  standalone: true,
};
