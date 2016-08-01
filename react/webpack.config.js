module.exports = {
  // Specify the main entry point.
  entry: "./entry.js",
  output: { filename: "output.js", path: '.', publicPath: '/redux/' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
