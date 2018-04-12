import Vue from 'vue'

const isDev = process.env.NODE_ENV === 'development' ? true : false
const scriptPath = "https://js.fundebug.cn/fundebug.0.3.6.min.js"
const apikey = "3213c4f5cfcfa6862e653ac4e2b2be46be3bfe316dee8df15776d2d6de6cafa5"

//加载脚本
function loadScript(url, apikey) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.setAttribute("apikey", apikey);//fundebug key
    script.setAttribute("silentConsole", isDev);
    script.setAttribute("releasestage", process.env.NODE_ENV);
    script.setAttribute("silent", isDev);//开发环境下将不进行邮件发送
    document.body.appendChild(script);
    return script;
}

//返回拼接错误信息
function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';
    var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
}

const vueFundebug = {
    install() {
        // debugger
        loadScript(scriptPath,apikey)
            .onload = () => {

                Vue.config.errorHandler = function (err, vm, info) {
                    var componentName = formatComponentName(vm);
                    var propsData = vm.$options && vm.$options.propsData;
                    fundebug.notifyError(err, {
                        metaData:
                            {
                                componentName: componentName,
                                propsData: propsData,
                                info: info
                            }
                    });
                }

            }

    }
}


export default vueFundebug;