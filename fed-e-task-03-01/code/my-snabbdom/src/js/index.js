import { h } from 'snabbdom/build/package/h'
import { init } from 'snabbdom/build/package/init'
// 1. 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

import btn from '../img/delete.png'

// 2. 注册模块
let patch = init([
  styleModule,
  classModule,
  propsModule,
  eventListenersModule
])
// 定义基础的数据
const originalMovies = [
  { rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
  { rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.' },
  { rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.' },
  { rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.' },
  { rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.' },
  { rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.' },
  { rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.' },
  { rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.' },
  { rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.' },
  { rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...' },
]

// 备份原始数据，并在这里进行数据操作
let dataList = originalMovies.map(item => {
  item.elmHeight = 0
  item.offsetTop = 0
  return item
})


let oldVnode = null;
// 渲染
function render(data) {
  data.reduce((arr, hero) => {
    let last = arr[arr.length - 1];
    hero.offsetTop = last ? last.offsetTop + last.elmHeight + 10 : 10;
    return arr.concat(hero);
  }, []);
  // 创建主体部分
  oldVnode = patch(oldVnode, vnode(data));
}
// 创建VNODE
function vnode(data) {
  return h('div.container', [
    h('header', [
    h('h1', 'Top 10 movies'),
    h('div.sortArea', [
      h('div.sortButtonGroup', [
        'Sort by:',
        h('span.sortButton', { on: { click: () => sort('rank') } }, 'Rank'),
        h('span.sortButton', { on: { click: () => sort('title') } }, 'Title'),
        h('span.sortButton', { on: { click: () => sort('desc') } }, 'Description')
      ]),
      h('span.sortButton', {
        on: {
          click: handlerAdd
        }
      }, ['Add'])
    ])
  ]), 
  h('div.listBox', [
    h('ul', dataList.map((item, index) => {
      return h('li', {
        hook: {
          key: item.rank,
          insert: (vnode) => {
            item.elmHeight = vnode.elm.offsetHeight;
          },
        },
        style: {
          opacity: 0,
          transform: `translateY(0px)`,
          delayed: {
            opacity: 1,
            transform: `translateY(${item.offsetTop}px)`
          },
          remove: {
            opacity: 0,
            transform: `translateY(0px)`,
          },
        }
      }, [
        h('div.liIndex', item.rank),
        h('div.liTitle', item.title),
        h('div.liContent', item.desc),
        h('div.liDelete', [
          h('img', {
            props: { src: btn },
            on: {
              click: () => handlerDelete(index)
            }
          }),
        ]),
      ])
    }))
  ])
])
}
// 列表新增
function handlerAdd() {
  let arr = [...dataList]
  const max = arr.sort((a, b) => a.rank - b.rank).reverse()[0].rank
  dataList.push(
    { rank: max + 1, title: 'lie', desc: 'This is a meaningless passage, just translated into English, but you still choose to finish reading it', elmHeight: 150, offsetTop: 10 }
  )
  render(dataList);
}

// 排序
function sort(type) {
  const newList = dataList.sort((a, b) => {
    let num = 0
    a[type] < b[type] && (num = -1)
    a[type] > b[type] && (num = 1)
    return num
  })
  render(newList);
}

// 列表删除
function handlerDelete(num) {
  dataList = dataList.filter((item, index) => {
    if (index !== num) {
      return item;
    }
    return null
  });
  render(dataList)
}

// 获取根节点
let app = document.querySelector('#app')

// 初次渲染
oldVnode = patch(app, vnode(dataList))
render(dataList)

// 创建头部
function header() {
  return h('header', [
    h('h1', 'Top 10 movies'),
    h('div.sortArea', [
      h('div.sortButtonGroup', [
        'Sort by:',
        h('span.sortButton', { on: { click: () => sort('rank') } }, 'Rank'),
        h('span.sortButton', { on: { click: () => sort('title') } }, 'Title'),
        h('span.sortButton', { on: { click: () => sort('desc') } }, 'Description')
      ]),
      h('span.sortButton', {
        on: {
          click: handlerAdd
        }
      }, ['Add'])
    ])
  ])
}

// 创建列表部分
function list(data) {
  return h('div.listBox', [
    h('ul', data.map((item, index) => {
      return h('li', {
        hook: {
          key: item.rank,
          insert: (vnode) => {
            item.elmHeight = vnode.elm.offsetHeight;
          },
        },
        style: {
          opacity: 0,
          transform: `translateY(0px)`,
          delayed: {
            opacity: 1,
            transform: `translateY(${item.offsetTop}px)`
          },
          remove: {
            opacity: 0,
            transform: `translateY(0px)`,
          },
        }
      }, [
        h('div.liIndex', item.rank),
        h('div.liTitle', item.title),
        h('div.liContent', item.desc),
        h('div.liDelete', [
          h('img', {
            props: { src: btn },
            on: {
              click: () => handlerDelete(index)
            }
          }),
        ]),
      ])
    }))
  ])
}