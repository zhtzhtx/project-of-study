# 模块一：ES新特性与Typescript，JS性能优化简答题

## 一. 请说出下列最终的执行结果，并解释为什么。

```js
var a = [];
for(var i = 0;i < 10;i++){
    a[i] = function(){
        console.log(i)
    }
}
a[6]()
```

答案：10

​	由于变量提升，上述代码相当于:

```js
var a;
var i;
a = [];
for(i = 0;i < 10;i++){
    a[i] = function(){
        console.log(i)
    }
}
a[6]()
```

​	i是一个全局变量，在调用a[6]（）的方法时，打印的是已经循环10次的i，所以是10。如果想要依次打印1，2，3...10。

​	可以通过let使用块级作用域：

```js
var a = [];
for(let i = 0;i < 10;i++){
    a[i] = function(){
        console.log(i)
    }
}
a[6]()
```

​	或者使用闭包：

```js
var a = [];
for(var i = 0;i < 10;i++){
   a[i] = (function(i){
       return ()=>console.log(i)
    })(i)
}
a[6]()
```



## 二. 请说出下列最终的执行结果，并解释为什么。

```js
var tmp = 123;
if(true){
    console.log(tmp)
    let tmp
}
```

答案：我认为是123，实际运行会报错（ReferenceError: Cannot access 'tmp' before initialization）

​	首先，var tmp定义了一个全局变量，在if(true){}中打印出来，再let tmp定义一个块级变量，这个变量和上面var tmp定义的无关。

## 三. 结合ES6新语法，用最简单的方式找出数组中的最小值

```js
var arr = [12,34,32,89,4]
```

答案：

```js
var min = Math.min(...arr)
```

## 四. 请详情说明var，let，const三种声明变量的方式之间的具体差别

​	var定义的变量，如果在函数中，那作用域是整个函数，如果在全局中，那作用域就是全局。同时，var定义的变量会变量提升，就是不论通过var声明的变量处于当前作用于的第几行，都会提升到作用域的最顶部。

​	例如：

```js
console.log(a)
var a = 1
```

​	等于：

```js
var a
console.log(a)
a = 1 
```

​	而let和const都是块级作用域，就是所声明的变量都会绑定在这个区域，同时不允许在相同作用域中重复声明相同变量（let a; var a;或者let a; let a;会报错)。同时let和const声明的变量不会变量提升。

```js
console.log(a)
let a = 1
```

​	不等于：

```js
let a
console.log(a)
a = 1
```

​	let和const区别在于，const是用来声明常量的，声明的常量不可改变，声明时必须初始化（赋值）。如果const声明的是引用类型，我们是可以改变其中的值，但不能改变它的指针。

```js
//可以
const arr = [1,2,3];
arr.push(4);
console.log(arr);  //[1,2,3,4]

//报错
const arr = [];
arr = {};
```

​	而let是声明变量的，声明的变量值和指针都可以改变

```js
//可以
let a = {};
a = [];
```

## 五. 请说出下列代码最终输出的结果，并解释为什么

```js
var a = 10;
var obj = {
    a:20,
    fn(){
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}
obj.fn()
```

答案：20

​	因为fn()中console.log(this.a)中的this指向的obj这个对象，相当于console.log(obj.a)。如果想要获取全局变量a可以如下进行：

```js
var a = 10;
var obj = {
    a:20,
    fn(){
        setTimeout(()=>{
            console.log(a)
        })
    }
}
obj.fn()
```

## 六.简述Symbol类型的用途

​	Symbol是一种基本数据类型。

​	每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。

```js
console.log(Symbol('a')===Symbol('a'))//false
```

​	那么Symbol具体的应用场景是什么呢？

### 应用场景1：使用Symbol来替代常量：

​	我们经常定义一组常量来代表一种业务逻辑下的几个不同类型，我们通常希望这几个常量之间是唯一的关系，为了保证这一点，我们需要为常量赋一个唯一的值，但是当常量一多，不仅想名字要绞尽脑汁，而且还容易出现重复。

​	而现在有了Symbol，我们就不必如此麻烦了：

```js
//我们过去常常设置的常量
const TYPE_AUDIO = 'AUDIO'
const TYPE_VIDEO = 'VIDEO'
const TYPE_IMAGE = 'IMAGE'

//使用Symbol改进的
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
```

### 应用场景2：使用Symbol定义对象属性：

​	在学习Symbol之前，定义对象的key值都是使用字符串，而现在，Symbol可同样用于对象属性名。

```js
//之前
let obj = {
  abc: 123,
  "hello": "world"
}

//现在
const PROP_NAME = Symbol()

let obj = {
  abc: 123,
  "hello": "world",
  [PROP_NAME]: "lagou"
}

obj[PROP_NAME] // 'lagou'

```

​	同时需要注意的是，我们经常会需要使用Object.keys()或者for...in来枚举对象的属性名，而在使用了Symbol作为对象的属性key后，Symbol类型的key是不能通过Object.keys()或者for...in来枚举的，它未被包含在对象自身的属性名集合(property names)之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用 Symbol来定义。

```js
let obj = {
   [Symbol('name')]: 'lagou',
   age: 23,
   title: 'test'
}

Object.keys(obj)   // ['age', 'test']

for (let i in obj) {
   console.log(i)   // 分别会输出：'age' 和 'title'
}
```

### 应用场景3：使用Symbol定义类的私有属性/方法：	

​	根据Symbol唯一这个特性，我们发现Symbol特别适合用来定义私有属性。之前我们定义私有属性只能约定使用_来定义私有属性，而现在，可以使用Symbol来定义私有属性，因为外界无法直接获取这个Symbol，也无法创建一个一模一样的Symbol出来(因为Symbol是唯一的)，从而达到一个私有化的效果。

​	例如：

在a.js中

```js
const PASSWORD = Symbol()

class Login {
  constructor(username, password) {
    this.username = username
    this[PASSWORD] = password
  }

  checkPassword(pwd) {
      return this[PASSWORD] === pwd
  }
}

export default Login
```

在b.js中

```js
import Login from './a'

const login = new Login('admin', '123456')

login.checkPassword('123456')  // true

login.PASSWORD  // oh!no!
```

## 七.说说什么是浅拷贝，什么是深拷贝？

​	首先，我们先看一段代码：

```js
//基础数据类型
var a = 3;
var b = a;
b = 5;
console.log(a); // 3
console.log(b); // 5

//引用数据类型
var obj1 = {
    a:  1,
    b:  2,
    c:  3
}
var obj2 = obj1;
obj2.a = 5;
console.log(obj1.a);  // 5
console.log(obj2.a);  // 5
```

​	从上面代码看出对于基础数据类型而言a和b是互相独立，互不影响的。但对于引用数据类型而言，obj1和obj2并不是互相独立的，obj2的值改变obj1也会跟着改变，这是因为obj1复制的是obj2的引用地址，并非是堆里面的值，对于这个现象，生出了浅拷贝和深拷贝两个概念，也就是说浅拷贝和深拷贝都是针对引用数据类型。

### 1. 浅拷贝

概念：只复制指向某个对象的指针，而不是对象本身，新旧对象共享一块内存

常见浅拷贝方法：

```js
//直接=
let a=[0,1,2,3,4]
let b=a;

console.log(a===b);//true
a[0]=1;
console.log(a,b);//[1,1,2,3,4],[1,1,2,3,4]

//for...in
function simpleCopy(obj1) {
   var obj2 = Array.isArray(obj1) ? [] : {};
   for (let i in obj1) {
   obj2[i] = obj1[i];
  }
   return obj2;
}

//Object.assign方法
var obj = {
    a: 1,
    b: 2
}
var obj1 = Object.assign(obj);
obj1.a = 3;
console.log(obj.a) // 3
```



### 2. 深拷贝

概念：复制并创建一个一模一样的对象，不共享内存，修改新对象，旧对象保持不变

常见深拷贝方法：

```js
//使用JSON对象来实现深拷贝，但是只能是一层对象的深拷贝，如果对象中存在function或者多层嵌套就无法拷贝
function deepClone2(obj) {
  var _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}

//手写递归方法
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}
```



## 八.请简述Typescript和Javascript之间的关系

​	Typescript是 JavaScript 的超集，包含了 JavaScript 的所有元素，可以载入 JavaScript 代码运行，并扩展了 JavaScript 的语法。



## 九.请谈谈你所认为的Typescript优缺点	

### TypeScript 的优点：

#### 1. 静态输入

​	静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

#### 2. 大型的开发项目

​	有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用TypeScript工具来进行重构更变的容易、快捷。

#### 3. 更好的协作

​	当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

### TypeScript 的缺点：

#### 1. 类型复杂

​	当项目不断的扩展时，TypeScript 定义的类型可能变的非常复杂，增加开发时的工作量，如果项目非常赶时间，还是用js好一点

### 总结：

​	目前，TypeScript 越来越流行，得到大部分业内的肯定，作为初级前端工程师应该早点学习掌握，比停滞不前死守JavaScript要好。



## 十.描述引用计数的工作原理和优缺点

工作原理：引用计数算法的工作原理很简单，它实际上是通过在对象头中分配一个空间来保存该对象被引用的次数。如果该对象被其它对象引用，则它的引用计数加一，如果删除对该对象的引用，那么它的引用计数就减一，当该对象的引用计数为0时，那么该对象就会被回收。

优点：一旦对象的引用技术为0时，内存直接释放了，不用像其它机制一样要等到特定时机。

缺点：例如下面代码

```js
let a = {};
let b = {};
a.child = b;
b.child = a;
```

​	a和b之间相互引用，那么即使他们不被其它对象引用，引用计数也仍然为1，所占用的内存永远无法被回收，导致内存泄露。

## 十一.描述标记整理算法的工作流程

​	标记整理算法可以看作是标记清除算法的增强，在一开始和标记清除一样，将所有可达对象都进行标记，但是在清除阶段会先将对象进行整理，将活动的对象移动到连续的地址上去，然后回收其它的对象。这样空出来的内存就是连续的，不会出现碎片化。

## 十二.描述V8中新生代存储区垃圾回收流程

​	V8内部先将内存分为新生代存储区和老生代存储区。新生代存储区用于存储存活时间较短的对象(如局部作用域中的对象)，新生代存储区内部也分为两个等大的空间：使用空间From和空闲空间To。一开始，先将所有活动对象存储于From空间，然后当From空间使用到一定程度触发垃圾回收时，将From空间标记整理后，将活动对象拷贝至To空间，最后交换From空间和To空间(From变To，To变From)同时释放From空间。

​	如果经历了一轮GC还存活的新生代需要晋升到老生代存储区，同时如果To空间使用率超过了25%也需要进行晋升操作。

## 十三.描述增量标记算法在何时使用及工作原理

​	在老生代存储区进行垃圾回收时，会采用增量标记对垃圾回收进行效率优化。	

​	所谓增量标记就是指将垃圾回收分成多个小步完成，如下图所示：

![image-20200828223522770](C:\Users\联想\AppData\Roaming\Typora\typora-user-images\image-20200828223522770.png)

​	增量标记的好处在于使垃圾回收和程序运行交替进行，使程序不至于在垃圾回收完全停滞，使时间效率更加合理。