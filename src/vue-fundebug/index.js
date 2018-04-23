import Vue from 'vue'
import libFundebug from '../common/lib/asyncFundebug.js'

//返回拼接错误信息
function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';
    var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
}

const vueFundebug = {
    install() {
        libFundebug.init(() => {
            Vue.config.errorHandler = function (err, vm, info) {
                var componentName = formatComponentName(vm);
                var propsData = vm.$options && vm.$options.propsData;
                fundebug.notifyError(err, {
                    metaData:
                        {
                            appVersion: APP_VERSION,
                            componentName: componentName,
                            propsData: propsData,
                            info: info
                        }
                });
            }
        });

    }
}


export default vueFundebug;