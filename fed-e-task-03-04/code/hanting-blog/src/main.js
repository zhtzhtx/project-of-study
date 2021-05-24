// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 通用工具
import util from './utils/util'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(ElementUI)
  Vue.prototype.$util = util
  Vue.mixin({
    data(){
      return {
        GRIDSOME_API_URL:process.env.GRIDSOME_API_URL
      }
    }
  })
  Vue.component('Layout', DefaultLayout)
}
