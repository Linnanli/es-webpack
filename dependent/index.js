//公用依赖库打包方案1:
//使用CommonChunckPlugin插件提取每个入口的依赖打包成 vendor
//但是会有个问题:如果只有一个依赖zepto的话那么,每个入口都会生成一个 vendor,也就是说会生成N个zepto文件

//公用依赖库打包方案2:
//手动定义每个包中包含的库,然后在手动引用
//为了更加细粒度的控制依赖文件,将自己在template.js手动引入依赖
//下面名称中'_'下滑线分隔每个库的名称,表示这些库共同组成一个包

module.exports = {
    'zepto': 'exports-loader?window.$!script-loader!zepto',
    'vue_vue-router_axios': ['vue', 'vue-router', 'axios']
};