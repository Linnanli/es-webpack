const content = require('layout/index.ejs')
const header = require('layout/header.ejs')
const script = require('layout/script.ejs')
const css = require('layout/css.ejs')

module.exports = function (params) {
    // console.log(params.htmlWebpackPlugin.files.chunks['vue_vue-router_axios'])
    return content({
        header: header({ title: 'detail' }),
        script: script({ chunks: ['manifest', 'vue_vue-router_axios', 'app'], chuncksEntry: params.htmlWebpackPlugin.files.chunks }),
        css: css({ chuncksEntry: params.htmlWebpackPlugin.files.chunks.app.css }),
        layout: {
            root:'<div id="app"></div>'
        }
    });;
}