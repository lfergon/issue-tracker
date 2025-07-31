module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["e2e", "dist/"],
  transformIgnorePatterns: [
    "node_modules/(?!(.*\\.mjs$|@angular|@clr|@cds|rxjs|zone\\.js))"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'mjs'],
  moduleNameMapper: {
    "^@cds/core(.*)$": "<rootDir>/src/__mocks__/@cds/core$1.js"
  }
};
