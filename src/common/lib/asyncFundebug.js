
const isDev = process.env.NODE_ENV === 'development' ? true : false
const scriptPath = "https://js.fundebug.cn/fundebug.0.3.6.min.js"
const apikey = "3213c4f5cfcfa6862e653ac4e2b2be46be3bfe316dee8df15776d2d6de6cafa5"

//加载脚本
function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptPath;
    script.setAttribute("apikey", apikey);//fundebug key
    script.setAttribute("releasestage", process.env.NODE_ENV);
    script.setAttribute('appversion', APP_VERSION);

    document.body.appendChild(script);  
    return script;
}

//监控error
function listener() {}

export default {
    init(callback = listener){
        loadScript().onload = ()=>{
            fundebug.silentConsole = isDev;
            fundebug.silent = isDev;//开发环境下将不进行邮件发送
            callback();
        }
    }
};