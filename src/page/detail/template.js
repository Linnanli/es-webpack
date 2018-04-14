const content = require('./index.ejs')
const layoutHeader = require('layout/header.ejs')

module.exports = function (params) {
    console.log(params.htmlWebpackPlugin)
    return content({
        layoutHeader: layoutHeader({ title: 'detail' }),
        title: params.htmlWebpackPlugin.options.title,
        indexScript: params.htmlWebpackPlugin.files.js[0]
    });;
}

