const content = require('./index.ejs')
const header = require('layout/header.ejs')
const script = require('layout/script.ejs')
const css = require('layout/css.ejs')

module.exports = function (params) {
    // console.log(params.htmlWebpackPlugin)
    // console.log(params.htmlWebpackPlugin.files.chunks)
    // console.log(params.htmlWebpackPlugin.files.chunks.detail.css)
    return content({
        header: header({ title: 'login' }),
        script: script({ chunks: ['manifest', 'zepto', 'login'], chuncksEntry: params.htmlWebpackPlugin.files.chunks }),
        css: css({ chuncksEntry: params.htmlWebpackPlugin.files.chunks.detail.css }),
        layout: {}
    });;
}