module.exports = {
  devServer: {
    port: 8090,
    proxy: {
      '/': {
        // local
        // target: 'http://127.0.0.1:8080/'
        // aws
        target: 'http://54.178.65.84:8080/'
      }
    }
  }
}
