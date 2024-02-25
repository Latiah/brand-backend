/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom:["./src/**"],
  testTimeout: 30000,
  coverageThreshold: {
    global: {
      lines: 50,
    },
  },
};