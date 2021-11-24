# 模块三：Vue.js + Vuex + TypeScript 实战项目开发与项目优化

## 一. 说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别

- application/x-www-form-urlencoded方式是Jquery的Ajax请求默认方式，这种方式的好处就是浏览器都支持，在请求发送过程中会对数据进行序列化处理，以键值对形式？key1=value1&key2=value2的方式发送到服务器，如果用Jquery，它内部已经进行了处理，如果自己写原生的Ajax请求，就需要自己对数据进行序列化。

- application/json，随着json规范的越来越流行，并且浏览器支持程度原来越好，许多开发人员易application/json作为请求content-type，告诉服务器请求的主题内容是json格式的字符串，服务器端会对json字符串进行解析，这种方式的好处就是前端人员不需要关心数据结构的复杂度，只要是标准的json格式就能提交成功，application/json数据格式越来越得到开发人员的青睐。

## 二. 说一说在前端这块，角色管理你是如何设计的

- 根据业务需求进行分析，设计规化各个角色的权限功能
- 编写角色管理页面，实现角色列表的增删改查功能
- 编写权限配置组件，实现各个权限模块（如：视图权限，菜单权限，按钮权限等）的功能
- 实现在各个角色中配置各自的权限模块的功能，通过角色id完成权限和角色绑定的效果
- 在人员管理中，添加“选择角色”选项，一个人员可以绑定多个角色，从而实现人员和权限之间灵活关联

​	总结一下，角色管理为人员管理和权限管理的中间层，角色不会因为人员的变动而改变，从而使后台权限系统更加的稳定。当一个角色的权限改变时，与其绑定的人员权限也会一起改变，从而使后台权限系统更加灵活。

## 三. @vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

- 启动@Vue-Cli Gui, 项目依赖 清晰明了亦可直接在界面安装依赖
- 在 2.x 版本里，不管数据多大，都会在一开始就为其创建观察者。当数据很大时，这可能会在页面载入时造成明显的性能压力。3.x 版本，只会对「被用于渲染初始可见部分的数据」创建观察者，而且 3.x 的观察者更高效
- 3.0 新加入了 TypeScript 以及 PWA 的支持
- 配置项更简单明了

> - 移除了配置文件目录，config 和 build 文件夹, 额外配置可通过在根目录vue.config.js 配置
> - 移除了 static 文件夹，新增 public 文件夹，并且 index.html 移动到 public 中
> - 在 src 文件夹中新增了 views 文件夹，用于分类 视图组件 和 公共组件

## 四. 详细讲一讲生产环境下前端项目的自动化部署的流程

1. 开发者把代码push到git仓库上面
2. git仓库上面的hooks监听到推送之后，并把更新通知给ci/cd服务器
3. ci/cd服务器拉取git仓库上面的代码
4. 首先进行 test
5. 然后对代码进行编译构建
6. 然后打包新版本并发布到生产环境服务器上

## 五. 你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点

### 1. 通过element-ui表格，实现动态单元格和动态计算的功能

效果如下图所示：

![](.\img.png)

需求：

​	后台传递一个树状数据，各级表格根据叶子数动态进行单元格合并，并且根据子级分数进行动态的总分计算。叶子单元格（如：四级单元格）中的数据用户可以手动修改（input输入框），当叶子分数修改时，各级单元格中的分数都动态计算变化。

难点：

​	1.element-ui表格要求的数据格式为数组嵌套对象（如：[{},{},{}]），而树状数据转化为这种形式数据后，很难获取其子级数据。

​	2.当子单元格数据改变时，如何通知其父级单元格数据进行同步计算修改

方法：

​	先储存原始树状数据，然后遍历树状数据，记录下各级单元格的需要合并单元格数，然后将其转化数组嵌套对象数据，需要在各个对象中记录各级单元格的需要合并单元格数，把该数据放入element-ui表格组件，根据记录的需要合并单元格数进行各级单元格动态合并。

​	接下来，分数展示通过计算属性实现。除了叶子单元格外，其它单元格分数通过计算属性展示，遍历原始树状数据，计算其子级总分。当叶子单元格中的分数改变时，获取该单元格的id，在原始树状数据中进行遍历，修改原始树状数据中的对应数据的分数，这样其它单元格分数也会因为计算属性动态变化

### 2.修改wangeditor源码，实现表格拖拽改变宽度修改

需求：

​	在项目使用了wangeditor富文本编辑器，但该编辑器中插入表格后，无法改变表格的宽度，用户希望实现通过拖拽修改表格的宽度

难点：

​	富文本编辑器中本身不支持该功能，扩展Tools的api同样难以实现该效果并且容易和富文本编辑器自带表格Tools冲突，所以需要直接修改wangeditor的源码

方法：

​	下载wangeditor富文本编辑器的源码，找到表格自带的Tools代码，编写拖拽表格改变宽度的方法插入到原来代码中，重新打包引入项目。

## 六. 针对新技术，你是如何过渡到项目中

​	考虑新技术在哪些方面带来效率或质量提升，考虑团队学习成本和考虑重构成本，根据官方文档api按需或整体引入。如非必要，在不变更原始项目结构情况下，进行过度。在变更的地方，写清楚注释，如有必要，进行团队会议，使同事了解相应技术变更。如果新技术效果优秀，在下次项目中加入原始结构中。