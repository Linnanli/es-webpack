const packageJson = require('../package.json')
const path = require('path')

module.exports = {
    'APP_VERSION': JSON.stringify(packageJson.version),
    'PATH_SRC': JSON.stringify(path.resolve(__dirname, '../src'))
};