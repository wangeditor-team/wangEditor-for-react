module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/__test__/utils/stylesMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(html-void-elements)/)'],
  setupFilesAfterEnv: ['<rootDir>/__test__/setup/index.ts'],
}
