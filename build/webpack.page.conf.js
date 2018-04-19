const utils = require('./utils')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dependentChunck = require('../dependent')
const inlineScript = require('../dependent/inline-script')


//生成入口文件配置
let entryList = utils.generateEntry({
    pageDir: path.resolve(__dirname, `../src/page`),
    filename: 'index.js'
});
entryList.app = './src/main.js';
entryList = merge(entryList, dependentChunck);

//生成HTML插件配置
let HTMLPlugin = utils.generateHTMLPlugin({
    entryList: entryList,
    filename: function (name) {
        if (name === 'app') {
            return `index.html`;
        } else {
            return `page/${name}.html`;
        }
    },
    template: function (name) {
        //限制模板文件为inde.tpl.js
        if (name === 'app') {
            return path.resolve(__dirname, `../src/html.js`);
        } else {
            return path.resolve(__dirname, `../src/page/${name}/html.js`);
        }
    }
});

//生成提取公用代码配置
// let commonChunck = utils.generateCommonChunckPlugin(entryList);

//获取入口配置
exports.getEntryList = function(){
    return entryList;
};

//获取commonChunckPlugin配置
// exports.getCommonChunckPlugin = function () {
//     return commonChunck;
// };

//获取html plugin配置
exports.getHTMLPlugin = function (isDev){
    let HTMLPlugins = [];
    
    HTMLPlugin.forEach((item,index)=>{
        Object.assign(item, inlineScript);
        if (isDev) {
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        }else{
            item.minify = {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            };
            item.chunksSortMode = 'dependency';
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        }
    });
    return HTMLPlugins;
}

