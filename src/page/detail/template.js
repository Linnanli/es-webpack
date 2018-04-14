const content = require('./index.ejs')
const header = require('layout/header.ejs')
const script = require('layout/script.ejs')

module.exports = function(params) {
    // console.log(params.htmlWebpackPlugin)
    // console.log(params.htmlWebpackPlugin.files.chunks)
    return content({
        title: params.htmlWebpackPlugin.options.title,
        script: script({ chunks: ['manifest', 'detail'], chuncksEntry: params.htmlWebpackPlugin.files.chunks}),
        layout:{
            header: header({ title: 'detail' })
        }
    });;
}