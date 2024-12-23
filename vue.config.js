const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      port: 3000,
    proxy: {
      '/api': {
        target: 'http://27.71.17.99:9090',
        //target: 'http://localhost:9090', // 로컬 개발용
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    }
  }
})
