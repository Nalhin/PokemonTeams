module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  snapshotSerializers: ['jest-emotion'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
};
