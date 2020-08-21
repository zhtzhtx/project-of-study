// Part1
// 普通版
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello ')
    }, 10)
}).then(val => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val + 'lagou ')
        }, 10)
    })
}).then(val => {
    setTimeout(() => {
        console.log(val + 'I ❤ U')
    }, 10)
})

// 进阶版
function timeBox(str) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve(str), 10)
    })
}
async function speak() {
    let text = ''
    await timeBox('hello ').then(val => text += val)
    await timeBox('lagou ').then(val => text += val)
    await timeBox('I ❤ U ').then(val => text += val)
    console.log(text)
}
speak()

// 终极版
setTimeout(() => console.log('hello lagou I ❤ U'), 30)

// Part2
const fp = require('lodash/fp')
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// Exercise1
const prop = fp.curry((obj, key) => fp.prop(key, obj))
const isLastInStock = fp.flowRight(prop, fp.last)
// console.log(isLastInStock(cars)('in_stock'))

// Exercise2
const prop2 = fp.curry((obj, key) => fp.prop(key, obj))
const isFirstName = fp.flowRight(prop2, fp.first)
// console.log(isFirstName(cars)('name'))

// Exercise3
let _average = (xs) => fp.reduce(fp.add, 0, xs) / xs.length
let dollar_values = arr => fp.map(obj => obj.dollar_value, arr)
let averageDollarValue = fp.flowRight(_average, dollar_values)
// console.log(averageDollarValue(cars))

// Exercise4
let _underscore = fp.replace(/\W+/g, '_')
let f = fp.flowRight(_underscore, fp.toLower)
let f2 = fp.flowRight(f, fp.prop('name'))
let sanitizeNames = fp.map(f2)
// let sanitizeNames = fp.map(obj=>{
//     obj.name=f2(obj)
//     return obj
// })
console.log(sanitizeNames(cars))

// Part3
const { Maybe, Container } = require('./support')

// Exercise1
let maybe = Maybe.of([5, 6, 1])
let ex1 = arr => fp.map(fp.add(1), arr)
// maybe.map(ex1).map(v => console.log(v))

// Exercise2
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = arr => fp.first(arr)
// xs.map(ex2).map(v => console.log(v))

// Exercise3
let safeProp = fp.curry((x,o)=>{
    return Maybe.of(o[x])
})
let user = {id:2,name:'Albert'}
let ex3 = fp.flowRight(fp.first,fp.split(''))
// safeProp('name',user).map(ex3).map(v => console.log(v))

// Exercise4
let ex4 = n=>{
    return Maybe.of(n).map(v=>parseInt(v))
}
// ex4(null).map(v => console.log(v))
// ex4('1').map(v => console.log(v))

// Part4
// 详情见MyPromise.js
let MyPromise = require('./myPromise')

let promise111 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        // resolve('成功。。。')
        reject('失败。。。')
    }, 2000)
})

let promise222 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功。。。')
        // reject('失败。。。')
    }, 2000)
})

// MyPromise.reject(promise222).catch(err=>{
//     console.log(err)
// })

MyPromise.any([promise111,promise222]).then(
    val=>{
        console.log(val)
    }
).catch(err=>{
    console.log(err)
})
// promise111.then().then().then(val => {
//     console.log(val)
// }).catch(res=>{
//     console.log(res)
// })