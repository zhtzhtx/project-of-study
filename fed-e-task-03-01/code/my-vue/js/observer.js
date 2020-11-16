class Observer {
    // 我们希望构造类之后，立即将传入的data中的属性转换成getter/setter，所以在构造函数中调用walk()
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 1. 判断data是否是对象，如果不是就停止执行
        if (!data || typeof data !== 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineRactive(data, key, data[key])
        })
    }
    defineRactive(obj, key, val) {
        const _this = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果val是对象，把val内部的属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newValue) {
                if (newValue === val) {
                    return
                }
                val = newValue
                _this.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })
    }
}