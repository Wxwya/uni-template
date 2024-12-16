/**
 * @author xwya
 * @since 2024-12-14
 * @name cache
 * @description 缓存工具类
 * @example
 * cache.set("key", "value", 60); // 设置缓存，60秒后过期
 * const value = cache.get("key"); // 获取缓存
 * cache.remove("key"); // 删除缓存
 */
const cache = {
  key: "xwya_app_",
  set(key: string, value: any, expire?: number){
    key = this.getKey(key);
    let data: any = {
      expire: expire ? this.time() + expire : "",
      value,
    };
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }
    try {
      uni.setStorageSync(key, data);
    } catch (e) {
      console.error(e);
    }
  },
  get(key: string) {
    key = this.getKey(key);
    try {
      let data = uni.getStorageSync(key);
      if (!data) {
        return null;
      }
      const { value, expire } = JSON.parse(data);
      if (expire && expire < this.time()) {
        uni.removeStorageSync(key);
        return null;
      }
      return value;
    }catch(e){ 
      console.error(e);
    }
  },
  remove(key: string) {
    key = this.getKey(key);
    uni.removeStorageSync(key);
  },
  time() {
    return Math.round(new Date().getTime() / 1000);
  },
  getKey(key: string): string {
    return this.key + key;
  },
  clear() {
    uni.clearStorage();
  }
};

export default cache;
