const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  indexPath: 'CSL_REPORT_0.0.html', // index.htmlから変更
  outputDir: 'CSL_REPORT_0.0', // distから変更
  parallel: false,
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },

      // or
      overlay: false,
    }
  },
});
