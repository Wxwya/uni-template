import { TOKEN_KEY } from "@/enums/constantEnums";
import { RequestCodeEnum} from "@/enums/requestEnums"
import cache from "@/utils/cache";
import HttpRequest from "./http";

const requestHooks: RequestHooks = {
  handleRequestOptions(options){ 
    const { header, url } = options 
    if (this.withToken) {
      const token = cache.get(TOKEN_KEY)
      if (token) {
        options.header[this.tokenName] = `${this.prefixToken}${token}`
      }
    }
    if (url) { 
      options.url = `${this.baseUrl}${url}`
    }
    if (this.timeout) { 
      options.timeout = this.timeout
    }
    options.header = {...this.header,...header}
    // #ifdef WEB
      options.withCredentials = this.withCredentials
    // #endif
    return options
  },
  handleRequestMsg(response, config) { 
    const { data: { code, msg } } = response
    if (code === RequestCodeEnum.SUCCESS) {
      config && config.show && uni.showToast({ title: msg, icon: "success" })
    } else if (RequestCodeEnum.TOKEN_INVALID.includes(code)) {
      uni.showToast({ title:"请稍后在试..", icon: "error" })
      cache.clear()
      uni.reLaunch({ url: "/pages/login/index" })
      throw new Error(msg || "请求失败")
    } else { 
      uni.showToast({ title: msg || "请求失败", icon: 'error', })
      throw new Error(msg || "请求失败")
    }
  }
}

const defaultOptions: HttpRequestOptions = {
  baseUrl: `${import.meta.env.VITE_APP_BASE_URL || ""}`,
  withToken: true,
  prefixToken: "Bearer ",
  tokenName:"AccessToken",
  retry:true,
  retryCount: 2,
  retryTimeout: 1000,
  header: {},
  withCredentials:true,
  timeout: 3000,
  ignoreCancel: true,
  requestHooks: requestHooks,
};
function createRequest(opt?: HttpRequestOptions): HttpRequest {
  return new HttpRequest({...defaultOptions,...opt});
}
const request = createRequest();

export default request