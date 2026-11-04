import type { Config } from "jest";
import nextJest from "next/jest.js";
const createJestConfig = nextJest({ dir: "./" });
const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/layout.tsx",
    "!src/**/route.ts",
    "!src/types/**",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: { global: { lines: 80, branches: 80 } },
};
export default createJestConfig(config);
