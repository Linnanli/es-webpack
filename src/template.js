const content = require('./index.ejs');
const layoutHeader = require('layout/header.ejs');

module.exports = content({
    layoutHeader: layoutHeader({ title:'web app page1'})
});