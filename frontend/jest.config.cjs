module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./jest.setup.cjs'],
  modulePathIgnorePatterns: ['<rootDir>/src/assets/'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '/src/main.tsx',
    '/src/services/'
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|svg|jpg)$': 'identity-obj-proxy',
    '\\.(jpg)$': '<rootDir>/path/to/identity-obj-proxy.js',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/(.*)$': ['<rootDir>/src/$1', '<rootDir>/dist/$1'],
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^types/(.*)$': '<rootDir>/src/@types/$1',
    '^public/(.*)$': '<rootDir>/public/$1',
  },
};
