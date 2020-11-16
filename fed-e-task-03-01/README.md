# 模块三：手写 Vue Router、手写响应式实现、虚拟 DOM 和 Diff 算法简答题

## 一. 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

​	我们直接给 data 增加的成员不是响应式成员，想把新增成员设置成响应式数据可以使用vue的$set方法，如例子中可以使用this.$set(this.dog,“name”,“Trump”)

​	原理是使用了 Object.defineProperty（）将数据转化为响应式数据

```js
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
```



## 二. 请简述 Diff 算法的执行过程。

​	首先，它将根节点转化虚拟dom，然后比较新旧的虚拟dom是否相同，如果完全相同就return，如果不同就更新dom。

​	然后，当数据改变时，重新将根节点转化虚拟dom，比较新旧虚拟dom，找到不同的节点后，先创建新的虚拟dom节点，然后删除旧的虚拟dom节点，将新的虚拟dom节点转化为真实dom，将新的dom渲染到页面上