module.exports = {
  devServer: {
    host: 'localhost'
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/core/variables.scss";
          @import "~@/assets/scss/mixins/border.scss";
          @import "~@/assets/scss/mixins/page.scss";
        `
      }
    }
  }
}
