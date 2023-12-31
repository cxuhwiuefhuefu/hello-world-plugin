/*
 * @Author: Sunny
 * @Date: 2023-07-08 22:45:31
 * @LastEditors: Suuny
 * @LastEditTime: 2023-07-09 16:07:42
 * @Description: 
 * @FilePath: /hello-world-plugin/vue.config.js
 */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const { config } = require('process')

// 复制文件到指定目录
const copyFiles = [
    {
        from: path.resolve("src/plugins/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
    },
    {
        from: path.resolve('src/assets'),
        to: path.resolve('dist/assets')    
    },
    {
        from: path.resolve('src/plugins/inject.js'),
        to: path.resolve("dist/js")
    }
]

// 复制插件
const plugins = [
    new CopyWebpackPlugin({
        patterns: copyFiles
    })
]

// 页面文件
const pages = {}

// 配置 popup.html 页面
const chromName = ["popup"]

chromName.forEach(name => {
    pages[name] = {
        entry: `src/${name}/main.js`,
        template: `src/${name}/index.html`,
        filename: `${name}.html`
    }
})

module.exports = {
    pages,
    productionSourceMap: false,
    // 配置 content.js background.js
    configureWebpack: {
        entry: {
            background: "./src/background/main.js"
        },
        output: {
            filename: 'js/[name].js'
        },
        plugins
    },
    // 配置 content.css
    css: {
        extract: {
            filename: "css/[name].css"
        }
    },
    // 增加 chainWebpack 配置
    chainWebpack: config => {
        if(process.env.NODE_ENV === 'production') {
            config.output.filename('js/[name].js').end(),
            config.output.chunkFilename('js/[name].js').end()
        }
    }
}