# 模块二：模块化开发与规范化标准简答题

## 一. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

​	首先，webpack会查找你在webpack.config.js中配置的入口文件，然后从入口文件出发，调用在配置文件中配置的该文件类型对应的loader对其进行翻译，再查找该模块依赖的模块，递归相同步骤，直到所有的依赖模块都进行了翻译。在得到每个模块被翻译后的最终内容以及它们之间的依赖关系后，根据依赖关系将模块组装成一个个包含多个模块的Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表。最后，根据配置文件中确定输出的路径和文件名，把文件内容写入到文件系统。

## 二. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

### Loader 和 Plugin 的不同

#### 不同的作用

- **Loader**直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到`loader`。 所以Loader的作用是让webpack拥有了加载和解析*非JavaScript文件*的能力。
- **Plugin**直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

#### 不同的用法

- **Loader**在`module.rules`中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个`Object`，里面描述了对于什么类型的文件（`test`），使用什么加载(`loader`)和使用的参数（`options`）
- **Plugin**在`plugins`中单独配置。 类型为数组，每一项是一个`plugin`的实例，参数都通过构造函数传入。

### 开发 Loader 和 Plugin 的思路

#### 	开发loader

​	首先创建一个js文件，这个文件通过module.exports导出一个函数，函数的形参（source）接受源文件的内容，我们在函数中对源文件内容进行处理，最后return出处理后的内容。值得注意的是，我们最后return的必须是一段js代码，因为webpack会直接将这段代码加载到使用该loader的地方，所以如果不是js代码会报错。

```js
//source是源文件内容
module.exports=source=>{
    // 对源文件内容处理
    return `console.log(source)`//返回js代码
}
```



#### 	开发Plugin

​	首先定义一个class，然后在class中定义一个apply方法，这个方法在webpack加载这个插件时自动被调用，apply方法有一个compiler的形参，是我们webpack所有的配置信息。接下来选择一个合适的钩子，通过.tap（）函数注册一个钩子函数，这个函数第一个参数为我们自定义插件的名称，第二个参数为接受compilationd（此次打包的上下文）的函数，在这个函数中我们可以对文件内容进行处理替换。

```js
class MyPlugin {
    //compiler为webpack所有的配置信息
    apply(compiler) {
        //通过compiler调用webpack的钩子函数
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation=>可以理解为此次打包的上下文
            for (const name in compilation.assets) {
                // name为每个文件的名称
                if (name.endsWith('.js')) {
                    //通过source()拿到文件内容
                    const contents = compilation.assets[name].source()
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
                    //用处理后的内容和内容长度替换原来的内容和内容长度
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}
```

