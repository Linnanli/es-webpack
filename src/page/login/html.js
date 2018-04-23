const content = require('common/layout/index.ejs')
const header = require('common/layout/header.ejs')
const script = require('common/layout/script.ejs')
const css = require('common/layout/css.ejs')

module.exports = function ({ htmlWebpackPlugin: { options, files } }) {
    let { flexible } = options;
    return content({
        header: header({ title: 'login', flexible: flexible}),
        script: script({ chunks: ['manifest', 'zepto', 'login'], chuncksEntry: files.chunks }),
        css: css({ chuncksEntry: files.chunks.detail.css }),
        layout: {}
    });;
}