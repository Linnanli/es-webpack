const fs = require('fs');
const path = require('path');

module.exports = {
    //读取json文件
    getJsonFile:function (filePath) {
        var json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
        return JSON.parse(json);
    }
};