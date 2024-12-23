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
          'Host': 'www.cocodot.info',
          'Origin': 'http://www.cocodot.info',
          'Referer': 'http://www.cocodot.info'
        },
        onProxyReq: function(proxyReq) {
          proxyReq.setHeader('Origin', 'http://www.cocodot.info');
        },
        onProxyRes: function(proxyRes) {
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
      }
    }
  }
})
