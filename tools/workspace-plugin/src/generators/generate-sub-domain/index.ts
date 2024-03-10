import {
  ProjectConfiguration,
  Tree,
  addProjectConfiguration,
  formatFiles,
  names,
  readCachedProjectGraph,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';
import { getDomainProjectName, modifyPathAlias } from '../../utils';

type BaseSubDomain = 'state' | 'api' | 'shared';

interface Schema {
  domainName: string;
  name: string | BaseSubDomain;
  pathAlias?: false | 'single';
  tags?: string[];
  skipAddTestLintTargets?: boolean;
}

export default async function (tree: Tree, schema: Schema) {
  await generateSubDomain(tree, schema);
  await formatFiles(tree);

  return () => {};
}

export async function generateSubDomain(
  tree: Tree,
  schema: Schema
): Promise<{ projectName: string; domainRoot: string; libraryRoot: string }> {
  const domainName = names(schema.domainName).fileName;
  const name = names(schema.name).fileName;
  const projects = readCachedProjectGraph().nodes;

  if (!projects[domainName]) {
    console.warn(`Specified library "${domainName}" does not exist.`);
  }

  const projectName = getDomainProjectName({ directory: schema.domainName, name: schema.name });
  const domainRoot = `libs/${domainName}`;
  const libraryRoot = `libs/${domainName}/${name}`;

  addProjectConfiguration(tree, projectName, {
    root: libraryRoot,
    projectType: 'library',
    tags: Array.from(
      new Set([
        `domain:${domainName}`,
        `project:${projectName}`,
        `sub-domain:${name}`,
        ...(schema.tags || [`public:${domainName}`, 'type:api']),
      ])
    ).sort(),
    sourceRoot: libraryRoot,
    prefix: 'ngpk',
  } as ProjectConfiguration);

  const domainProject = readProjectConfiguration(tree, domainName);
  const implicitDependencies = domainProject.implicitDependencies || [];
  domainProject.implicitDependencies = Array.from(new Set([...implicitDependencies, projectName])).sort();
  updateProjectConfiguration(tree, domainName, domainProject);

  if (schema.pathAlias) {
    generatePathAlias(tree, schema, schema.pathAlias);
  }

  return { projectName, domainRoot, libraryRoot };
}

function generatePathAlias(tree: Tree, schema: Schema, pathAlias: Schema['pathAlias']) {
  const domainName = names(schema.domainName).fileName;
  const name = names(schema.name).fileName;

  if (pathAlias === 'single') {
    if (!tree.read(`libs/${domainName}/${name}/index.ts`)) {
      tree.write(`libs/${domainName}/${name}/index.ts`, 'export {}');
    }
    modifyPathAlias(tree, `@ngpk/${domainName}/${name}`, `libs/${domainName}/${name}/index.ts`);
  }
}
