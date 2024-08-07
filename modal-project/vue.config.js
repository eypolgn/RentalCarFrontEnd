module.exports = {
  devServer: {
    port: 8081, // Vue uygulamanızın çalışacağı port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // API'nin çalıştığı port
        changeOrigin: true,
      
      }
    }
  }, // Burada devServer nesnesini kapatmalısınız
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return options;
      });
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .tap(options => {
        return options;
      });
  }
};
