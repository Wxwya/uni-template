import { titleobj,tabbar } from "@/utils/page"
/**
 * @author xwya
 * @since 2024-12-14
 * @description 获取当前页面的头部信息，包括状态栏高度、胶囊高度以及是否显示返回按钮。
 * @returns {Object} 返回一个包含以下属性的对象：
 * - height: 胶囊高度
 *  - top: 状态栏高度
 *  - title: 当前页面标题
 *  - backIconShow: 是否显示返回按钮
 */
const useHead = () => {
  const current = getCurrentPages();
  const path = current[current.length - 1].route;
  // #ifdef MP-WEIXIN
  const custom = uni.getMenuButtonBoundingClientRect(); // 胶囊
  // #endif
  const system = uni.getSystemInfoSync();

  const statusBar = computed(() => {
    return system.statusBarHeight;
  });
  const customBar = computed(() => {
    // #ifdef MP-WEIXIN
    return custom.bottom + custom.top - statusBar.value;
    // #endif
  
    // #ifdef  MP || H5
    return 45 + statusBar.value;
    // #endif

    // #ifdef APP-PLUS 
    return 45 ;
    // #endif
  
    // #ifdef MP-ALIPAY
    return statusBar.value + system.titleBarHeight;
    // #endif
  });
  const backIconShow = computed(()=>tabbar.findIndex(item=>item.pagePath==path)==-1?true:false)
  return {
    height: customBar,
    top: statusBar,
    title: titleobj[path],
    backIconShow
  }
};
export default useHead;
