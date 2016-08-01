// Karma configuration
// Generated on Mon Feb 15 2016 10:39:33 GMT-0600 (CST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'angular.js',
      'angular-mocks.js',
      'tests.js'
    ],
    exclude: [ ],
    preprocessors: { },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    // singleRun: false,
    concurrency: Infinity
  })
}
