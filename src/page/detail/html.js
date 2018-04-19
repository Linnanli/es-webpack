const content = require('public/layout/index.ejs')
const header = require('public/layout/header.ejs')
const script = require('public/layout/script.ejs')
const css = require('public/layout/css.ejs')

module.exports = function ({ htmlWebpackPlugin: { options, files } }) {
    let { flexible } = options;
    return content({
        header: header({ title: 'detail', flexible: flexible }),
        script: script({ chunks: ['manifest','zepto','detail'], chuncksEntry: files.chunks}),
        css: css({ chuncksEntry: files.chunks.detail.css }),
        layout:{
            root: '<div class="main"></div>'
        }
    });;
}