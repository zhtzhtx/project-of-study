class Vue {
    constructor(options) {
        // 1. 通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$methods = options.methods || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2. 把data中的成员转换成getter和setter，注入到vue实例中
        this._proxyData(this.$data)
        // 3. 把methods中的成员注入到vue实例中
        this._proxyMethods(this.$methods)
        // 4. 调用observer对象，监听数据的变化
        new Observer(this.$data)
        // 5. 调用compiler对象，解析指令和差值表达式
        new Compiler(this)
    }
    _proxyData(data) {
        // 遍历data中的所有属性
        Object.keys(data).forEach(key => {
            // 把data的属性注入到vue实例中
            // 这里的this指的是vue实例
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
    _proxyMethods(methods){
        // 遍历methods中的所有属性
        Object.keys(methods).forEach(key => {
            this[key] = methods[key]
        })
    }
}