let that;
let parentRoute = { path: "/", $page: { fullPath: "/", options: {} }, options: {} };
let toPageUrl = null;
let flag = false;
let notFound
const replaceRouters = [
  "navigateTo",
  "redirectTo",
  "switchTab",
  "reLaunch",
  "navigateBack",
];
/**
 *
 * @param url
 * @returns {Object}
 */
function getQueryParams(url: string): { path: string; query: Object } {
  const query = {};
  if (url.indexOf("?") === -1) {
    return { path: url, query };
  }
  const routerPathArr = url.split("?");
  const path = routerPathArr[0];
  const queryString = routerPathArr[1];
  const keyValuePairs = queryString.split("&");
  keyValuePairs.forEach((keyValuePair) => {
    const [key, value] = keyValuePair.split("=");
    query[key] = value;
  });
  return { path, query };
}

// #ifdef WEB
window.addEventListener("popstate", function (event) {
  const currentPage = getCurrentPage();
  if (currentPage) {
    parentRoute = currentPage;
  }
})
// #endif
replaceRouters.forEach((item) => {
  uni.addInterceptor(item, {
    invoke({ url }) {
      const currentPage = getCurrentPage();
      if (currentPage) {
        parentRoute = currentPage;
      }
    },
    fail({ url }) {
      if (notFound) {
        uni.navigateTo({url:notFound})
      }
    }
  });
});
function getCurrentPage(index?: number = 1): UniApp.Page {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - index];
  return currentPage;
}
async function handleBeforeValue(value: RouterPage | boolean) {
  if (
    (typeof value != "object" && typeof value != "boolean") ||
    value == null ||
    Array.isArray(value)
  ) {
    throw new Error("beforeEach 返回值必须是一个布尔值或页面路由信息");
  }
  if (typeof value === "object") {
    uni[value.router](value);
  }
}
const createRouter = ({ notFoundPath }): RouterMixin => {
  notFound=notFoundPath;
  const router: RouterMixin = {
    beforeEachFunc: null,
    afterEachFunc: null,
    afterEach(callback: RouterAfterEach) {
      if (typeof callback === "function") {
        this.afterEachFunc = callback;
      } else {
        throw new Error("afterEach 必须是一个函数");
      }
    },
     beforeEach(callback: RouterBeforeEach) {
      if (typeof callback === "function") {
        this.beforeEachFunc = callback;
        that = this;
      } else {
        throw new Error("beforeEach 必须是一个函数");
      }
    },
  async onShow() {
      const currentPage = getCurrentPage();
      flag = true;
      if (currentPage) {
        const hooksBody: RouterEvent = {
          to: {},
          form: {},
        };
        hooksBody.to = {
          path: "/" + currentPage?.route,
          query: currentPage?.options ||currentPage.$page?.options ,
          url: currentPage?.$page?.fullPath,
        };
        hooksBody.form =
          parentRoute.path == "/"
            ? { path: "/", query: {}, url: "/" }
            : {
                path: "/" + parentRoute?.route,
                query: parentRoute?.options||parentRoute.$page?.options,
                url: parentRoute?.$page?.fullPath,
              };
        const value = await that.beforeEachFunc(hooksBody);
        handleBeforeValue(value);
        if (value) {
          that.afterEachFunc(hooksBody);
        }
      }
    },
    beforeUnmount() {
      if (flag) {
        const pages = getCurrentPages();
        
        const currentPage = pages[pages.length - 1];
        if (pages.length > 2) {
          flag = false;
        }
        // #ifdef MP-WEIXIN  || APP-IOS
        if (currentPage) {
          parentRoute = currentPage;
        }
        // #endif
      }
    },
  };
  return router;
};
export default createRouter