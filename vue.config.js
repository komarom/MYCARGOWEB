const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://27.71.17.99:9090',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://mycargoweb.vercel.app'
        }
      }
    }
  }
})
