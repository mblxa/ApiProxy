module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  collectCoverageFrom: [
    'src/**/*.{ts,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!src/index.ts',
    '!src/config/Settings.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  testRegex: 'tests/.*\\.test\\.ts$',
  globals: {
    '__DEV__': 'test',
  }
};
