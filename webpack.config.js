const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  "mode": "development",
  "entry": "./client/index.js",
  "output": {
    "path": __dirname + '/dir',
    "filename": "bundle.js"
  },
  "devtool": "source-map", 
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "exclude": /node_modules/,
        "loader": "eslint-loader",
        "options": {
          "emitWarning": true,
          "failOnError": false,
          "failOnWarning": false
        }
      },

      {
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties"
					    ]
          }
        }
      },
           
      {
        "test": /\.html$/,
        "use": [
          {
            "loader": "html-loader"
          }
        ]
      }
    ]
  },
  "plugins": [
    new HtmlWebPackPlugin({
      template: "./client/index.html",
      filename: "./index.html"
    })
  ]
}