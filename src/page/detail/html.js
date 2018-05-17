const content = require('common/layout/index.ejs')
const header = require('common/layout/header.ejs')
const script = require('common/layout/script.ejs')
const css = require('common/layout/css.ejs')

const flexible = require('inline-script-loader!common/lib/flexible.js');

module.exports = function ({ htmlWebpackPlugin: { options, files } }) {

    return content({
        header: header({ title: 'detail', flexible: flexible }),
        script: script({ chunks: ['manifest','zepto','detail'], chuncksEntry: files.chunks}),
        css: css({ chuncksEntry: files.chunks.detail.css }),
        layout:{
            root: '<div class="main">detail page</div>'
        }
    });;
}