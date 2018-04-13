const content = require('./index.ejs');
const layoutHeader = require('../layout/header.ejs');
const layoutNoscript = require('../layout/noscript.ejs');

module.exports = content({
    layoutHeader: layoutHeader({ title:'header'}),
    layoutNoscript: layoutNoscript({ noscriptText:'您的浏览器不支持javascript脚本,请重新开启或者更换浏览器' })
});