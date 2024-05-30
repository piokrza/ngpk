import generateAngularLibrary from '../generate-angular-library';
import { generateSubDomain } from '../generate-sub-domain';
import { Tree, formatFiles, names, readProjectConfiguration, updateProjectConfiguration } from '@nx/devkit';

export const domainLibs = [
  {
    lib: 'api',
    pathAlias: false,
  },
  {
    lib: 'state',
    pathAlias: 'single',
  },
  {
    lib: 'model',
    pathAlias: 'single',
  },
  {
    lib: 'feature',
    pathAlias: 'single',
  },
  {
    lib: 'enum',
    pathAlias: 'single',
  },
  {
    lib: 'constant',
    pathAlias: 'single',
  },
  {
    lib: 'service',
    pathAlias: 'single',
  },
  {
    lib: 'component',
    pathAlias: 'single',
  },
  {
    lib: 'testing',
    pathAlias: 'single',
  },
] as const;
type DomainLibraryType = (typeof domainLibs)[number]['lib'];

interface Schema {
  domainName: string;
}

export default async function (tree: Tree, schema: Schema) {
  await generateDomain(tree, schema);
  await formatFiles(tree);

  return () => {};
}

export async function generateDomain(tree: Tree, schema: Schema) {
  let { domainName } = schema;
  domainName = names(domainName).fileName;

  await generateAngularLibrary(tree, {
    name: schema.domainName,
    sourceDir: '',
    skipStorybook: true,
    tags: `domain:${domainName}, project:${domainName}`,
  });

  for (const domainLib of domainLibs) {
    const { lib: name, pathAlias } = domainLib;
    const { projectName, domainRoot, libraryRoot } = await generateSubDomain(tree, {
      domainName,
      name,
      pathAlias,
      tags: [`public:${domainName}`, 'type:api'],
      skipAddTestLintTargets: true,
    });

    LIB_SETUP[name](tree, {
      schema,
      lib: name,
      domainRoot,
      libraryRoot,
      projectName,
    });
  }

  tree.delete(`libs.${domainName}/src`);

  const domainProjectJson = readProjectConfiguration(tree, domainName);
  updateProjectConfiguration(tree, domainName, {
    ...domainProjectJson,
    sourceRoot: `libs/${domainName}`,
  });
}

const LIB_SETUP: Record<
  DomainLibraryType,
  (tree: Tree, opt: { schema: Schema; lib: DomainLibraryType; projectName: string; domainRoot: string; libraryRoot: string }) => void
> = {
  model: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {
    // const className = names(schema.domainName).className;
    // const fileName = names(schema.domainName).fileName;
    // tree.write(
    //   `${libraryRoot}/${fileName}.model.ts`,
    //   ``
    // );
  },
  state: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {
    // const className = names(schema.domainName).className;
    // const fileName = names(schema.domainName).fileName;
  },
  api: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
  enum: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
  service: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
  constant: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
  feature: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
  component: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
  testing: (tree, { schema, lib, domainRoot, libraryRoot, projectName }) => {},
};
