# 模块三：Vue.js 3.0 Composition APIs 及 3.0 原理剖析

## 一. Vue 3.0 性能提升主要是通过哪几方面体现的？

### 1. 响应式系统升级

- Vue.js 2.x中响应式系统的核心 defineProperty
- Vue.js 3.0中使用Proxy对象重写响应式系统
  - 可以监听动态新增的属性
  - 可以监听删除的属性
  - 可以监听数组的索引和length属性

​	Vue2的响应式原理是在初始化时遍历data中所有的成员，通过defineProperty将对象的所有属性转化为getter/setter。如果对象中的属性值又是对象，则需要递归处理所有属性。由于这些都是在初始化时进行，无论你有没有使用这些数据，Vue都会将其进行处理。

​	Vue3中使用的是ES6新增的Proxy，本身性能就比defineProperty要好，Proxy可以拦截对象的访问、赋值、删除等操作，不需要在初始化时遍历所有的属性，如果有多层属性嵌套时，只有访问某个属性才会递归处理下一层级的属性。Vue3中默认就可以监听到动态对象的处理，而Vue2中必须使用Vue.set方法处理，也监听不到属性的删除、数组的索引和length属性。

### 2. 编译优化

- Vue.js 2.x中通过标记静态根节点，优化diff的过程

- Vue.js 3.0中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容

  - Fragments(升级vetur插件)

  - 静态提升

  - Patch flag

  - 缓存事件处理函数

​	Vue2中通过标记静态根节点，在渲染的过程中会跳过静态根节点，优化diff的过程。但是在Vue2中，静态节点还需要再进行diff，这个过程没有被优化。而在Vue3中通过标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容。Vue3中还引入Fragments（片段）特性，模板中不需要再创建唯一的根节点。静态节点只会在初始化时被创建一次，并且会被提升到render函数外，当我们再次调用render函数时，这些静态节点不会再被创建。在动态节点中会标记Patch flag，根据Patch flag的不同，只会匹配对应的动态节点的diff情况。如果节点设置了事件处理函数，则会生成一个缓存该事件处理函数的函数，并将该函数缓存起来。该缓存函数不会发生变化，但会在调取时，会重新绑定最新的事件处理函数。
### 3. 源码体积的优化

- 移除了一些不常用的API
  - 例如： inline-template、filter等
- Tree-shaking

## 二. Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

- Options API

- - 包含一个描述组件选项（data、methods、 props等）的对象
  - Options API 开发复杂组件， 同一个功能逻辑代码可能会拆分到不同的选项中

- Composition API （非常像 react hooks ）

- - Vue.js 3.0 新增的一组API
  - 一组基于函数的API
  - 可以更加灵活的组织组件的逻辑

### Options API Demo

```js
export default{
    data(){
        return {
            position:{
                x:0,
                y:0
            }
        }
    },
    created(){
        window.addEventListener('mousemove',this.handle)
    },
    destroyed(){
        window.removeEventListener('mousemove',this.handle)
    },
    methods:{
        handle(e){
            this.position.x = e.pageX
            this.position.y = e.pageY
        }
    }
}
```

### Composition API Demo

```js
import { reactive,onMounted,onUnmounted } from 'vue'
function useMousePosition(){
    const position = reactive({
        x:0,
        y:0
    })
    const update = (e)=>{
        position.x = e.pageX
        position.y = e.pageY
    }
    onMounted(()=>{
        window.addEventListener('mousemove',update)
    })
    onUnmounted(()=>{
        window.removeEventListener('mousemove',update)
    })
    return position
}
export default{
    setup(){
        const position = useMousePosition()
        return{
            position
        }
    }
}
```

## 三. Proxy 相对于 Object.defineProperty 有哪些优点？

- Proxy 初始化的时候， 不需要遍历对象，将属性通过defineProperty 转换成getter/setter
- 多层属性嵌套时候， 只有在访问属性过程中才会递归处理下一级属性， 所以Proxy 性能更高
- 默认可以监听动态添加的属性
- 默认可以监听属性的删除操作
- 默认可以监听数组的索引和length属性的变化
- 可以作为模块单独使用

## 四. Vue 3.0 在编译方面有哪些优化？

- Vue.js 2.x中通过标记静态根节点，优化diff 的过程
- Vue.js 3.0中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容

- - Fragments(升级vetur插件)
  - 静态提升
  - Patch flag
  - 缓存事件处理函数

## 五. Vue.js 3.0 响应式系统的实现原理？

```js
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
    if (!isObject(target)) return target

    const handler = {
        get(target, key, receiver) {
            // 收集依赖
            track(target, key)
            const result = Reflect.get(target, key, receiver)
            return convert(result)
        },
        set(target, key, value, receiver) {
            const oldValue = Reflect.get(target, key, receiver)
            let result = true
            if (oldValue !== value) {
                result = Reflect.set(target, key, value, receiver)
                trigger(target, key)
            }
            return result
        },
        deleteProperty(target, key) {
            const hadKey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if (hadKey && result) {
                // 触发更新
                trigger(target, key)
            }
            return result
        }
    }

    return new Proxy(target, handler)
}

let activeEffect = null
export function effect(callback) {
    activeEffect = callback
    callback()
    activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
}

export function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        })
    }
}

export function ref(raw) {
    // 判断raw是否是ref创建的对象，如果是的话直接返回
    if (isObject(raw) && raw.__v_isRef) return
    let value = convert(raw)
    const r = {
        __v_isRef: true,
        get value() {
            track(r, 'value')
            return value
        },
        set value(newValue) {
            if (newValue !== value) {
                raw = newValue
                value = convert(raw)
                trigger(r, 'value')
            }
        }
    }
    return r
}

export function toRefs(proxy) {
    const ret = proxy instanceof Array ? new Array(proxy.length) : {}
    for (const key in proxy) {
        ret[key] = toProxyRef(proxy, key)
    }
    return ret
}

function toProxyRef(proxy, key) {
    const r = {
        __v_isRef: true,
        get value() {
            return proxy[key]
        },
        set value(newValue) {
            proxy[key] = newValue
        }
    }
    return r
}

export function computed(getter){
    // 默认value的值是undefined
    const result = ref()
    effect(()=>(result.value = getter()))
    return result
}
```

