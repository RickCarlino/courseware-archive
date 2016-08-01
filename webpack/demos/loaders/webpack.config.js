var webpack = require("webpack");

module.exports = {
	// Specify the main entry point.
  entry: "./entry.ts",
  output: {
  	// Where to put the bundle.
  	filename: "bundle.js",
    path: '.' // Current directory
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      // files with a `.ts` or `.tsx`  are handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devtool: 'source-map'
};
