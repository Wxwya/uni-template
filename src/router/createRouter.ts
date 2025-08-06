import { tabbar } from '@/utils/page'
let that
let parentRoute = { path: '/', query: {}, url: '/' }
let toPageUrl = null
let flag = false
let notFound
const tabbarMap = {}
const replaceRouters = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch', 'navigateBack']

function getQueryParams(url: string): { path: string; query: Record<string, string> } {
  const [path, queryString = ''] = url.split('?') || [url, '']
  let query = {}
  if (queryString) {
    query = Object.fromEntries(queryString.split('&').map((pair) => pair.split('=').map(decodeURIComponent)))
  }

  return { path, query }
}
function getCurrentPage(index?: number = 1): UniApp.Page {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - index]
  return currentPage
}
function isTabbarPage(path: string) {
  return tabbar.find((item) => item.pagePath === path) ? true : false
}
async function handleBeforeValue(value: RouterPage | boolean) {
  if ((typeof value != 'object' && typeof value != 'boolean') || value == null || Array.isArray(value)) {
    throw new Error('beforeEach 返回值必须是一个布尔值或页面路由信息')
  }
  if (typeof value === 'object') {
    uni[value.router](value)
  }
}
replaceRouters.forEach((item) => {
  uni.addInterceptor(item, {
    async invoke(e) {

      uni.showLoading({
        title: '加载中',
      })
      let path = ''
      let query = {}
      if (e.url) {
        let info = getQueryParams(e.url)
        path = info.path === '/' ? '/' + tabbar[0].pagePath : info.path
        query = info.query
      } else {
        try {
          const prevPage = getCurrentPage((e.delta ?? 1) + 1)
          e.url = prevPage?.$page?.fullPath
          path = prevPage?.route
          query = prevPage?.options || prevPage.$page?.options
        } catch (error) {
          uni.showToast({ title: '页面不存在', icon: 'error' })
          return false
        }
      }
      const verifyPath = path.startsWith('/') ? path.slice(1) : path
      if (isTabbarPage(verifyPath)) {
        tabbarMap[path] = true
      }
  
      const currentPage = getCurrentPage()
      const hooksBody: RouterEvent = {
        to: {},
        from: {},
      }
      if (currentPage) {
        hooksBody.from = {
          path: '/' + currentPage?.route,
          query: currentPage?.options || currentPage.$page?.options,
          url: currentPage?.$page?.fullPath,
          // type:
        }
      }
      hooksBody.to = { path: path, query, url: e.url }
      const value = await that.beforeEachFunc(hooksBody)
      if ((typeof value != 'object' && typeof value != 'boolean') || value == null || Array.isArray(value)) {
        throw new Error('beforeEach 返回值必须是一个布尔值或页面路由信息')
        return false
      }
      if (typeof value === 'object') {
        parentRoute = hooksBody.from
        uni[value.router](value)
        return false
      }
      if (value) {
        parentRoute = hooksBody.from
        return e
      }
      return value
    },
    fail() {
      if (notFound) {
        uni.navigateTo({ url: notFound })
      }
    },
    async returnValue(result) {
      const value = await result
      uni.hideLoading()
    },
  })
})
const createRouter = ({ notFoundPath }): RouterMixin => {
  notFound = notFoundPath
  const router: RouterMixin = {
    beforeEachFunc: null,
    afterEachFunc: null,
    afterEach(callback: RouterAfterEach) {
      if (typeof callback === 'function') {
        this.afterEachFunc = callback
      } else {
        throw new Error('afterEach 必须是一个函数')
      }
    },
    beforeEach(callback: RouterBeforeEach) {
      if (typeof callback === 'function') {
        this.beforeEachFunc = callback
        that = this
      } else {
        throw new Error('beforeEach 必须是一个函数')
      }
    },

    async onShow() {
      const currentPage = getCurrentPage()
      if (currentPage) {
        const hooksBody: RouterEvent = {
          to: {
            path: '/' + currentPage?.route,
            query: currentPage?.options || currentPage.$page?.options,
            url: currentPage?.$page?.fullPath,
          },
          from: parentRoute,
        }
        if ((isTabbarPage(currentPage.route) && !tabbarMap['/' + currentPage.route]) || !flag) {
          console.log("test 进来触发前置");
          
          const value = await that.beforeEachFunc(hooksBody)
          if ((typeof value != 'object' && typeof value != 'boolean') || value == null || Array.isArray(value)) {
            throw new Error('beforeEach 返回值必须是一个布尔值或页面路由信息')
            return
          }
          if (typeof value === 'object') {
            parentRoute = hooksBody.from
            uni[value.router](value)
            return
          }
          if (value) {
            parentRoute = hooksBody.from
          }

        }
        that.afterEachFunc(hooksBody)
        flag = true
      }
    },
    onHide() {
      const currentPage = getCurrentPage()
      if (currentPage) {
        if (isTabbarPage(currentPage.route)) {
          tabbarMap['/' + currentPage.route] = false
          parentRoute = {
            path: '/' + currentPage?.route,
            query: currentPage?.options || currentPage.$page?.options,
            url: currentPage?.$page?.fullPath,
          }
        }
      }
    },
  }
  parentRoute.path = '/' + tabbar[0].pagePath
  return router
}
export default createRouter
