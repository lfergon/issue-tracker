# Jest Configuration Fix for ES Modules

## Issue

The tests were failing with the following error:

```
SyntaxError: Unexpected token 'export'
```

This error occurs when Jest tries to process ES modules in the node_modules directory, specifically from the `@clr/angular` and `@cds/core` packages. By default, Jest doesn't transform files in node_modules, but these packages use ES module syntax (indicated by the `.mjs` extension in the error message).

## Solution

We updated the Jest configuration in `jest.config.js` to include a custom `transformIgnorePatterns` setting:

```javascript
transformIgnorePatterns: [
  "node_modules/(?!(@clr|@cds)/)"
]
```

This configuration tells Jest to:
- Ignore transforming most node_modules (the default behavior)
- But DO transform any modules from packages that start with `@clr` or `@cds`

The regular expression `(?!(@clr|@cds)/)` is a negative lookahead that excludes paths containing `@clr/` or `@cds/` from being ignored by the transformer.

## Why This Fixes the Issue

The error occurred because Jest was trying to directly execute the ES module code without transforming it first. Modern JavaScript features like ES modules need to be transformed to a format that Jest can understand in its Node.js environment.

By configuring Jest to transform the Clarity Design System packages (`@clr/angular` and `@cds/core`), we ensure that their ES module syntax is properly processed before Jest tries to run the tests.

## Additional Information

This is a common issue when working with modern JavaScript libraries that use ES modules. The solution follows the official Jest documentation recommendation for handling ES modules in node_modules:

https://jestjs.io/docs/configuration#transformignorepatterns-arraystring

If you encounter similar issues with other packages in the future, you can add them to the pattern:

```javascript
transformIgnorePatterns: [
  "node_modules/(?!(@clr|@cds|@other-package)/)"
]
```
