var webpack = require("webpack");

module.exports = {
	// Specify the main entry point.
  entry: "./entry",
  output: {
  	// Where to put the bundle.
  	filename: "bundle.js",
    path: '.' // Current directory
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
