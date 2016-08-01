module.exports = {
	// Specify the main entry point.
  entry: "./entry.js",
  output: {
    filename: "bundle.js",
    path: '.',
    publicPath: '/code_splitting/'
  }
};
