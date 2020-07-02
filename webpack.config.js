const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  "mode": "production",
  "entry": {
    "HSFS": "./src/index.js",
    "XMLHttpRequestAdapter": "./adapters/XMLHttpRequestAdapter.js",
    "FetchAdapter": "./adapters/FetchAdapter.js"
  },
  "devtool": "source-map",
  "output": {
    "path": path.resolve(__dirname, "dist"),
    "filename": ((process.argv.indexOf("-m") !== -1) ? "[name].min.js" : "[name].js"),
    "library": "[name]"
  },
  "module": {
    "rules": [{
      "test": /\.js$/,
      "exclude": /node_modules/,
      "loader": "babel-loader"
    }]
  },
  "optimization": {
    "minimize": (process.argv.indexOf("-m") !== -1),
    "minimizer": [
      new TerserPlugin({
        "cache": true
      })
    ]
  }
};