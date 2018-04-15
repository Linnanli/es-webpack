const content = require('./index.ejs')
const header = require('layout/header.ejs')
const script = require('layout/script.ejs')
const css = require('layout/css.ejs')

module.exports = function (params) {
    return content({
        header: header({ title: 'detail' }),
        script: script({ chunks: ['manifest','vendor', 'app'], chuncksEntry: params.htmlWebpackPlugin.files.chunks }),
        css: css({ chuncksEntry: params.htmlWebpackPlugin.files.chunks.app.css }),
        layout: {}
    });;
}