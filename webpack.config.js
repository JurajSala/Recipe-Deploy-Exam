// webpack.config.js
module.exports = {
    // ostatní nastavení webpacku
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify")
      }
    }
  };
  