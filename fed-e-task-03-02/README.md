# 模块三：Vue.js 源码分析（响应式、虚拟 DOM、模板编译和组件化）

## 一. 请简述 Vue 首次渲染的过程。

1. 首先，进行Vue的初始化，也就是初始化Vue的实例成员和静态成员。

 2. 当初始化结束后，调用Vue的构造函数（ new Vue() ）。

 3. 在构造函数中调用了_init()方法，这个方法相当于整个Vue的入口文件。

 4. 在_init()方法最后定义了vm.$mount()，这个vm.$mount()会将模板编译成render函数。**需要注意的是，这里的$mount方法是在src\platforms\web\entry-runtime-with-compiler.js中调用**

    (1)  首先，它判断当前是否有传render函数，如果没有传入render，它会获取template选项，如果template也没有的话，会获取el中的模板，然后把el中的模板编译为render函数。

    (2)  其次，通过compileToFunctions生成render()渲染函数。

    (3)  接下来，它将编译好的render函数存到options.render中

5. 调用src\platforms\web\runtime\index.js中的vm.$mount()方法，**注意！这和上面的$mount()方法不是同一个文件中**，只有是运行时版本，才会执行这个入口文件，用于在这个方法中重新获取el，

6. 调用mountComponent(this,el)方法，它是在src\core\instance\lifecycle.js中定义的。

   (1)  首先，判断是否有render选项，如果没有但是传入了模板，并且当前是开发环境的话会发送警告，告诉我们运行时版本不支持编译器

   (2)  触发生命周期中的beforeMount钩子函数

   (3)  定义updateComponent函数，在这个函数中调用_update和 _render函数， _render函数作用是渲染虚拟DOM， _update将虚拟DOM转化成真实DOM

   (4)  创建Watcher实例，在Watcher中定义和调用updateComponent函数，然后调用get()方法

   (5)  触发生命周期中的mounted钩子函数

   (6)  挂载结束，返回Vue实例

7.  在创建完Watcher会调用一次get方法，在get方法中会调用updateComponent(),updateComponent方法中会调用 _render和 _update方法。 
8.   _render函数作用是渲染虚拟DOM，在render方法中调用用户传入的render方法或者编译生成的render，最终将生成的VNode返回
9.   _update函数中调用__ patch __方法，patch方法就是把虚拟DOM转化为真实DOM并挂载到页面上，它会把生成的真实DOM记录到vm.$el中

## 二. 请简述 Vue 响应式原理。

1.  整个响应式是从Vue实例的init方法开始的，在init方法先通过initState初始化Vue实例的状态，在这个方法中调用了initData方法将data属性注入到Vue实例上，并且调用observe()将data对象转化为响应式对象，observe()就是整个响应式入口。

2. observe()方法位置是src\core\observer\index.js, observe(value)接受一个参数，这个参数就是响应式要判断的对象

   (1)  判断value是否是对象，如果不是对象直接返回

   (2)  判断value对象是否有__ ob __属性，如果有说明这个对象之前有做过响应式处理，直接返回

   (3)  如果没有__ ob __属性，就为这个对象创建observer对象

   (4)  返回observer对象

3. Observe()这个构造函数的位置是src\core\observer\index.js

   (1)  给value对象定义不可枚举的__ ob __属性，记录当前的observer对象

   (2)  数组的响应式处理，设置数组的push()、pop()等方法，这些方法会改变数组数据，所以在调用这些方法时需要通知数组对应的observer对象。再遍历数组中每一个成员，对每一个成员调用observe，如果这个成员是对象的话，也会把这个成员转化为响应式对象

   (3)  对象的响应式处理，调用walk方法，遍历对象每个属性，对每个属性调用defineReactive

4.  defineReactive()的位置是src\core\observer\index.js

   (1)  为每一个属性创建dep对象，让dep对象收集依赖

   (2)  如果当前属性的值是对象，调用observe将这个对象也转化成响应式对象

   (3)  定义getter方法，在getter中为每一个属性收集依赖，然后返回这个属性的值

   (4)  定义setter方法，先将新值保存下来，如果新值是对象，调用observe()将其转化为响应式对象，然后派发更新通知，调用dep.notify()

5. 收集依赖

   (1)  先调用watcher对象的get方法，在getter方法中通过pushTarget记录Dep.target属性

   (2)  访问data中的成员时候收集依赖,defineReactive的getter中收集依赖

   (3)  把属性对应的watcher对象添加到dep的subs数组中，为属性收集依赖

   (4)  如果这个属性的值也是对象，创建一个childOb收集依赖，目的是子对象添加和删除成员时发送通知

6.  当数据发生变化时，调用Watcher

   (1)  dep.notify()在调用watcher对象的update()方法

   (2)  queueWatcher()判断watcher是否被处理，如果没有的话添加到queue队列中，并调用flushSchedulerQueue()来刷新任务队列

   (3)  在flushSchedulerQueue()中触发beforeUpdate钩子函数，并且调用watcher.run()方法来触发updateComponent函数（  run()-->get()-->getter()-->updateComponent  ）,将数据更新在视图上

   (4)  清空上一次的依赖，重置Watcher中的一些状态

   (5)  触发actived钩子函数

   (6)  触发updated钩子函数

## 三. 请简述虚拟 DOM 中 Key 的作用和好处。

​	key的作用：为每个节点添加一个“身份证”。当我们通过diff算法更新新旧节点时，可以通过key来准确定位到每一个节点并判断节点是否更新，重用未修改节点，只更新被修改节点

​	key的好处：可以减少 dom 的操作，减少 diff 和渲染所需要的时间，提升了性能

## 四. 请简述 Vue 中模板编译的过程。

1.  comileToFunctions(template,...)是整个模板编译的入口文件，它先从缓存中加载编译好的render函数，如果缓存中没有则调用complie(template,options)
2.  在complie(template,options)函数中,先合并options,然后调用baseCompile(template.trim(),finalOptions)编译模板，complie的核心是合并选项，真正处理是在baseCompile中完成的
3.  在baseCompile中先通过parse()将template转换为AST tree（抽象语法树）。然后通过optimize()标记AST tree中的静态sub trees（静态根节点），检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点，在patch阶段跳过静态子树。最后，通过generate()把优化过的AST tree对象转化为字符串代码。
4.   baseCompile结束后会回到comileToFunctions，通过调用createFunction()，继续把上一步中生成的字符串形式js代码转化为函数。当render和staticRenderFns初始化完毕，会挂载到Vue实例的options对应的属性中