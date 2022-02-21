const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './docs/',
  indexPath: 'index.html',
  publicPath: process.env.NODE_ENV === 'production' ? '/silent-chat/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      filename: 'index.html',
      cdn: {
        css: [
          'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css'
        ]
      }
    }
  }
})
