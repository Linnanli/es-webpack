const content = require('public/layout/index.ejs')
const header = require('public/layout/header.ejs')
const script = require('public/layout/script.ejs')
const css = require('public/layout/css.ejs')

module.exports = function ({ htmlWebpackPlugin: { options, files} }) {
    // console.log(params.htmlWebpackPlugin.files.chunks['vue_vue-router_axios'])
    // console.log(params.htmlWebpackPlugin.options);
    let {flexible} = options;
    return content({
        header: header({ title: 'detail', flexible: flexible}),
        script: script({ chunks: ['manifest', 'vue_vue-router_axios', 'app'], chuncksEntry: files.chunks }),
        css: css({ chuncksEntry: files.chunks.app.css }),
        layout: {
            root: `<div id="app"></div>`
        }
    });;
}