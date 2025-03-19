module.exports = {
  rootDir: ".",
  globals: {
    __PATH_PREFIX__: ``,
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleNameMapper: {
    ".+\\.(png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
    "\\.css$": "identity-obj-proxy",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootdir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/test-setup/setup-after-env.ts"],
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
  moduleDirectories: ["node_modules"],
  testEnvironmentOptions: { url: `http://localhost` },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
