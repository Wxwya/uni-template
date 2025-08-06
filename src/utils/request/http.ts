import { RequestMethodsEnum, RequestErrMsgEnum } from '@/enums/requestEnums'
import requestCancel from "./cancel"
export default class HttpRequest {
  private readonly options: HttpRequestOptions
  constructor(options: HttpRequestOptions) {
    this.options = options
  }
  private readonly retryRequest(options: UniNamespace.RequestOptions, config: HttpRequestConfig = {}) {
    const { retry, retryTimeout, retryCount } = this.options

    if (retry) {
      config && config.loading && uni.showLoading({ title: config.loadingText || '加载中...' })
      config.hasRetryCount = config.hasRetryCount ?? 0
      if (config.hasRetryCount >= retryCount) {
        return Promise.reject()
      }
      config.hasRetryCount++
      return new Promise((resolve) => setTimeout(resolve, retryTimeout))
        .then(() => this.request(options, config))
        .finally(() => config && config.loading && uni.hideLoading())
    }
  }
  async get(options: UniNamespace.RequestOptions, config: HttpRequestConfig) {
    return this.request({ ...options, method: RequestMethodsEnum.GET }, config)
  }
  async post(options: UniNamespace.RequestOptions, config: HttpRequestConfig) {
    return this.request({ ...options, method: RequestMethodsEnum.POST }, config)
  }
  async put(options: UniNamespace.RequestOptions, config: HttpRequestConfig) {
    return this.request({ ...options, method: RequestMethodsEnum.PUT }, config)
  }
  async delete(options: UniNamespace.RequestOptions, config: HttpRequestConfig) {
    return this.request({ ...options, method: RequestMethodsEnum.DELETE }, config)
  }
  async uploadFile(options: UniNamespace.UploadFileOption, config: HttpRequestConfig) {
    const newOptions = this.options.requestHooks?.handleRequestOptions?.call(this.options, optipns)
    config && config.loading && uni.showLoading({ title: config.loadingText || '上传中...' })
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        ...newOptions,
        success: (response) => {
          try {
            this.options.requestHooks?.handleRequestMsg(response, config)
            resolve(response.data)
          } catch (err) {
            reject(err)
          }
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => config && config.loading && uni.hideLoading(),
      })
    })
  }
  async downloadFile(options: UniNamespace.DownloadFileOption, config: HttpRequestConfig) {
    const newOptions = this.options.requestHooks?.handleRequestOptions?.call(this.options, optipns)
    config && config.loading && uni.showLoading({ title: config.loadingText || '下载中...' })
    return new Promise((resolve, reject) => {
     const requestTask = uni.downloadFile({
        ...newOptions,
       success: (response) => { 
          if (response.statusCode === 200) {
            resolve(response)
          }
        },
        fail: (err) => {
          reject(err)
       },
       complete: () => config && config.loading && uni.hideLoading(),
     })
     const { ignoreCancel } = this.options
     ignoreCancel && requestCancel.add(options.url, requestTask)
    })
  }
  private readonly request(options: UniNamespace.RequestOptions, config?: HttpRequestConfig): Promise<any> {
    const newOptions = this.options.requestHooks?.handleRequestOptions?.call(this.options, options)
    config && config.loading && uni.showLoading({ title: config.loadingText || '加载中...' })
    return new Promise((resolve, reject) => {
      const requestTask = uni.request({
        ...newOptions,
        success: (response) => {
          try {
            this.options.requestHooks?.handleRequestMsg(response, config)
            resolve(response.data)
          } catch (err) {
            reject(err)
          }
        },
        fail: (err) => {
          if (err.errMsg == RequestErrMsgEnum.TIMEOUT) {
            this.retryRequest(newOptions, config)
              .then((res) => resolve(res))
              .catch((err) => reject(err))
            return
          }
          reject(err)
        },
        complete() {
          config && config.loading && uni.hideLoading()
        },
      })
      const { ignoreCancel } = this.options
      ignoreCancel && requestCancel.add(options.url, requestTask)
    })
  }
}
