const content = require('./index.ejs')
const header = require('layout/header.ejs')
const script = require('layout/script.ejs')

module.exports = function (params) {
    return content({
        script: script({ chunks: ['manifest','vendor', 'app'], chuncksEntry: params.htmlWebpackPlugin.files.chunks }),
        layout: {
            header: header({ title: 'detail' })
        }
    });;
}