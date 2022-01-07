# 模块四：React + Redux + Ant Design + TypeScript 实战

## 1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

静态输入

静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

大型的开发项目

有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用TypeScript工具来进行重构更变的容易、快捷。

更好的协作

类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

更强的生产力

自动完成和动态输入等因素有助于提高开发人员的工作效率

## 2.请简述一下支付流程

1. 提交订单后向服务器发生一个post请求，包含支付所需的订单信息和用户信息
2. 请求成功后服务端返回一个支付地址，客户端跳转到该支付地址以便用户支付
3. 支付完成后，支付宝会重定向事先设置好的客户端地址，用来告诉用户支付是成功还是失败的，同时支付宝还会向服务器发送一个Post请求，告诉服务器端当前支付是成功的还是失败的

## 3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

###  1.主要作用

 使react组价与redux数据中心（store）联系起来，调用dispatch函数修改数据状态后，触发通过subscribe注册更新视图的处理逻辑；

### 2.常用API

HOC（高阶组件）：Provider ；返回一个HOC（高阶组件）的函数：conncet

### 3.主要作用

1. Provider ，让通过props传递进来的store对象挂载到context环境上，并且渲染props.children；
   - 以便在`connect(mapStateToProps, mapDispatchToProps )` 返回的HOC中，通过context可以获取到store对象
   - 再通过store.subscribe函数，注册组件更新的逻辑
2. conncet，输入两个函数作为参数：mapStateToProps、mapDispatchToProps，返回一个HOC；
   - 在HOC中通过this.context获取到Provider中往下传递的store对象；
   - 在store.subscribe中注册视图更新逻辑；
   - 通过store.getState()作为mapStateToProps函数的参数，store.dispatch作为mapDispatchToProps的参数，生成两个对象；
   - 将产生的两个对象，通过props传递给真正的视图组件使用；

2.  

## 4.redux 中的异步如何处理？

 通过applyMiddleware函数，借助redux中间件（redux-thunk、redux-saga）来处理，即通过中间件模式将原始dispatch函数进行封装处理，形成洋葱模型，将原始dispatch函数作为参数传递，在处理异步事件时，再调用原始dispatch函数修改数据状态
