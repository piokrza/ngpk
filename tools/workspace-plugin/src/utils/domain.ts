import { UnitTestRunner } from '@nx/angular/generators';
import { NgPkAngularLibrarySchema } from '../generators/generate-angular-library/schema';

export const DOMAIN_LIBRARY_TYPES = ['model', 'api', 'ui', 'feature'] as const;
export type DomainLibraryType = (typeof DOMAIN_LIBRARY_TYPES)[number];
export const DOMAIN_LIBRARY_CONFIG: Record<DomainLibraryType, Partial<NgPkAngularLibrarySchema>> = {
  model: {
    unitTestRunner: UnitTestRunner.None,
  },
  api: {
    unitTestRunner: UnitTestRunner.Jest,
  },
  ui: {
    unitTestRunner: UnitTestRunner.Jest,
  },
  feature: {
    unitTestRunner: UnitTestRunner.Jest,
  },
};
