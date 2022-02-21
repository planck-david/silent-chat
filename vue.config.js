const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './docs/',
  indexPath: 'index.html',
  publicPath: process.env.NODE_ENV === 'production' ? '/silent-chat/' : '/'
})
