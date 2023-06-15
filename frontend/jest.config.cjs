module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./jest.setup.cjs'],
  modulePathIgnorePatterns: ['<rootDir>/src/assets/'],
  testPathIgnorePatterns: [
    '<rootDir>/src/main.tsx',
  ],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/jest.setup.cjs',
    '/src/main.tsx'
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|svg|jpg)$': 'identity-obj-proxy',
    '\\.(jpg)$': '<rootDir>/path/to/identity-obj-proxy.js',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
  },
};
