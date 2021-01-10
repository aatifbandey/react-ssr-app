module.exports = {
  roots: ['<rootDir>/client'],
  transform:{
    '\\.(js|jsx)?$': 'babel-jest'
  },
  testMatch: ['<rootDir>/client/**/__tests__/**/*.{js, jsx}'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dir/'],
  displayName: "client test cases",
  collectCoverage: false,
  setupFilesAfterEnv: ['@testing-library/jest-dom','@testing-library/react/dont-cleanup-after-each']

  // set up file before test run
}