const util = require('../../build/utils')
const path = require('path')
let isProd = process.env.NODE_ENV === 'production';

module.exports = {
    flexible: util.loadMinified(path.resolve(__dirname, './flexible.js'), isProd)
};