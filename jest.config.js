const config = {
  roots: ["./src/", "./tests"],
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  verbose: true,
  collectCoverageFrom: ["**/*.js"],
  coverageDirectory: "/tmp",
  coveragePathIgnorePatterns: [],
  coverageReporters: ["text"],
  transform: {},
};

if (process.env.JEST_ENV === "ci") {
  config.bail = true;
  config.verbose = false;
  config.coverageReporters = [];
  config.coverageThreshold = {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  };
}

export default config;
