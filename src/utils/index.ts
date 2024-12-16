/**
 * @author xwya
 * @since 2024-12-14
 * @description 获取当前页面实例
 * @returns {Page.PageInstance|Object}
 */
export function currentPage(): Page.PageInstance | Object {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage || {}
}

/**
 * @author xwya
 * @since 2024-12-14
 * @description 将一个数组分成几个同等长度的数组
 * @param  { Array } - array[分割的原数组]
 * @param  { Number } - size[每个子数组的长度]
 * @return { Array } - result[分割后的数组]
 * @example
 * sliceArray([1, 2, 3, 4, 5, 6, 7, 8], 3)
 */
export const sliceArray = (array: any[], size: number) => {
  const result = []
  for (let x = 0; x < Math.ceil(array.length / size); x++) {
    const start = x * size
    const end = start + size
    result.push(array.slice(start, end))
  }
  return result
}

/**
 * @author xwya
 * @since 2024-12-16
 * @description 复制文本
 * @description 复制文本到剪贴板
 * @param text 
 */
export function copyText(text: string) {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
      })
    },
  })
}
