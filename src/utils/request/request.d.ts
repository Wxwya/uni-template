

type HttpRequestOptions  = {
  baseUrl?: string;
  withToken?: boolean;
  prefixToken?: string;
  tokenName?: string;
  retry?: boolean;
  retryCount?: number;
  retryTimeout?: number;
  header?: any;
  requestHooks?: RequestHooks;
  ignoreCancel?:boolean
}

type HttpRequestConfig = {
  show?: boolean;
  loadingText?: string;
  messgae?: string;
  loading?: boolean
  hasRetryCount?: number;
}

type RequestHooks = {
  handleRequestOptions?: (options: UniNamespace.RequestOptions) => UniNamespace.RequestOptions;
  handleRequestMsg: (response:UniNamespace.RequestSuccessCallbackResult,config: HttpRequestConfig) => void;
}