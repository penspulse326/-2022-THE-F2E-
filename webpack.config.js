const path = require("path");
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist/"),
  },
  watch: true,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
