module.exports = {
  mode: 'development',
  entry: {
    app: "./dist/tsc/client/tsc/app.js",
  },
  devtool: "source-map",
  output: {
    filename: "[name].js", 
    library: "app"
  },
  module: {
    rules: [
      {
        test: /\*.js$/, 
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  }
}