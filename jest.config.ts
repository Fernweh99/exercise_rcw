export default {
    verbose: true,
    testEnvironment: "node",
    testTimeout: 10000,
    resetModules: false,
    collectCoverage: false,
    coveragePathIgnorePatterns: [
      "/database/",
      "/config/",
      "/migrations/",
      "/models/",
      "/seeders/",
      "/node_modules/",
      "/tests/utils"
    ],
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
  