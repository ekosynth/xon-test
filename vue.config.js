module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    // port: '9098',
    // https: {
    //   key: fs.readFileSync('./certs/localhost+1-key.pem'),
    //   cert: fs.readFileSync('./certs/localhost+1.pem'),
    // },
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/apis/xonadu': {
        target: 'https://api.xonadu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/apis/xonadu': ''
        }
      },
    }
  }

}