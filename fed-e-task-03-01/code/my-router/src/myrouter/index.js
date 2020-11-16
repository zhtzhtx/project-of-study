let _Vue = null

class VueRouter {
    constructor(options) {
        /* otions是在创建VueRouter时传入的选项，如：
            *const routes = [
            *{
            * path: '/',
            *    name: 'Home',
            *    component: Home
            *},
            *{
            * path: '/about',
            *   name: 'About',
            *    component: () => import('../views/About.vue')
            *    }
            *]
        */
        this.options = options
        // 将otions中的地址解析出来，存到routerMap中
        this.routeMap = {}
        // 用于存放当前路由地址，使用observable方法来创建响应式对象
        this.data = _Vue.observable({
            current: '/'
        })
    }

    static install(Vue) {
        // 1. 判断当前插件是否已经被安装
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true
        // 2. 把Vue构造函数记录到全局变量
        _Vue = Vue
        // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
        // 混入
        _Vue.mixin({
            beforeCreate() {
                /* 这里的逻辑是通过vue的混入实现将router注入到Vue实例上，这里的this指的是Vue实例
                * 同时，我们希望router对象只在Vue实例加载时执行一次，而加载Vue组件时不执行，所以需要判断是否为Vue实例
                * 可以通过是否存在$option.router来判断是否为Vue实例，因为我们会在加载Vue实例时传入router属性
                * 如果没有router属性则代表这是Vue组件
                */
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            },
        })
    }

    // 初始化方法，用来包装createRouteMap和initComponents两个方法
    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }

    // 遍历所有的路由规则，并将这些规则转换成键值对的形式，存放到routeMap中
    createRouteMap() {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    // 用于创建router-link和router-view组件，传入的参数时Vue实例
    initComponents(Vue) {
        Vue.component('router-link', {
            // 解析传入的to的值
            props: {
                to: String
            },
            // 讲to的值放到a标签的路径上
            // 运行时版的vue不支持template编译，可以设置vue.config.js中的runtimeCompiler: true来使用完整版vue
            // template:'<a :href="to"><slot></slot></a>'
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandler(e) {
                    window.location.hash = '#' + this.to
                    e.preventDefault();
                }
            },
        })
        const _this = this
        Vue.component('router-view', {
            render(h) {
                const component = _this.routeMap[_this.data.current]
                return h(component)
            }
        })
    }

    initEvent() {
        window.addEventListener('load', () => {
            window.location.hash = '#/'
        })
        window.addEventListener('hashchange', () => {
            console.log( window.location.hash.substr(1))
            this.data.current = window.location.hash.substr(1)
        })
    }
}

export default VueRouter