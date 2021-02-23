import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b5eb4e8a = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _700c82b0 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _dc87c890 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _276a4390 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _2e50f974 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _cd890204 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _59d5bcf6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _b5eb4e8a,
    children: [{
      path: "",
      component: _700c82b0,
      name: "home"
    }, {
      path: "/login",
      component: _dc87c890,
      name: "login"
    }, {
      path: "/register",
      component: _dc87c890,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _276a4390,
      name: "profile"
    }, {
      path: "/settings",
      component: _2e50f974,
      name: "settings"
    }, {
      path: "/editor",
      component: _cd890204,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _59d5bcf6,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
