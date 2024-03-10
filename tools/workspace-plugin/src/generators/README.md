# NX workspace generators

## Intro

Workspace generators are specific functions that can scaffold new files and/or modify existing ones.

To run a generator simply type:

```sh
nx generate {generatorName} {...options}
```

## Generators for day-to-day use

These generators are recommended for scaffolding new code on a day-to day basis.

- [generate-domain](#generate-domain)
- [generate-sub-domain](#generate-sub-domain)
- [generate-core-library](#generate-core-library)

### generate-domain

Generates a whole new domain with predefined libraries (api, shared, state, model).

**Use this generator only after having discussed within the team your needs to have a separate domain.**

```sh
nx generate generate-domain {domainName}
```

### generate-sub-domain

Generates a sub-domain in the specified domain.

**Use this generator only after having discussed within the team your needs to have a separate sub-domain.**

```sh
nx generate generate-sub-domain {domainName} {subDomainName}
```

### generate-core-library

Generates a new core piece of logic under `libs/core`.

```sh
nx generate generate-core-library {name} {subDirectory?}
```

## Other generators

These are mostly being used by the generators above with some predefined settings.

- [add-lint-changed](#add-lint-changed)
- [add-type-check](#add-type-check)
- [generate-angular-library](#generate-angular-library)
- [add-project-export](#add-project-export)
- [remove-project-export](#remove-project-export)

### add-lint-changed

(When ready) adds the `nx run {library}:lint-changed` target, which runs ESLint only on changed files.

### add-type-check

Adds the `nx run {library}:type-check` target, which runs tsc on all unit test files (for better test runtime we will aim to not type-check them by default).

### generate-angular-library

Generates an Angular library.

**On a day-to-day basis please use [generators for day-to-day use](#generators-for-day-to-day-use) instead.**
