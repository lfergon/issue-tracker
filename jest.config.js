jest = {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/setup-jest.ts"
}

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
};
