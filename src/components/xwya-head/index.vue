<script lang="ts" setup>
import useHead from '@/hooks/useHead';
const { height, top, title: headTitle, backIconShow } = useHead();
type ToPageType = { router: string } & UniNamespace.NavigateToOptions
/**
 * @author xwya
 * @since 2024-12-14
 * @name XwyaHead
 * @description 导航栏组件
 * @param {string} title - 标题
 * @param {object} titleStyle - 标题样式
 * @param {string} titleColor - 标题颜色
 * @param {string} titleSize - 标题大小
 * @param {string} icon - 图标
 * @param {string} iconColor - 图标颜色
 * @param {string} iconSize - 图标大小
 * @param {object} iconStyle - 图标样式
 * @param {string} position - 标题位置 'left' | 'center' 默认left
 * @param {number} delta - 标题位置偏移量
 * @param {function} onTitle - 标题点击事件
 * @param {function} onIcon - 图标点击事件
 * @param {object} toPage - 跳转页面参数
 */
const props = defineProps({
  title: {
    type: String,
  },
  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  titleColor: {
    type: String,
    default: '#000'
  },
  titleSize: {
    type: String,
    default: "16px"
  },
  icon: {
    type: String,
    default: 'solar--alt-arrow-left-line-duotone'
  },
  iconColor: {
    type: String,
    default: '#000'
  },
  iconSize: {
    type: String,
    default: '18px'
  },
  iconStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  position: {
    type: String as PropType<'left' | 'center'>,
    default: 'center'
  },
  delta: {
    type: Number,
    default: 1
  },
  onTitle: {
    type: Function,
    default: () => { }
  },
  onIcon: {
    type: Function,
  },
  toPage: {
    type: Object as PropType<ToPageType>,
    default: null
  }
})
const { proxy } = getCurrentInstance()
const slot = useSlots()
const showTitle = computed(() => props.title ? props.title : headTitle)
const titlePosition = computed(() => props.position === 'left' ? 'left-4' : 'left-1/2 -translate-x-1/2')
const tapIcon = () => {
  if (props.toPage) {
    uni[props.toPage.router](props.toPage)
    return
  }
  if (props.onIcon) {
    props.onIcon()
    return
  }
  uni.navigateBack({ delta: props.delta })
}
</script>

<template>
  <view :style="{ height: height + 'px', paddingTop: top + 'px' }" class=" border-b  border-slate-100  sticky left-0 top-0 w-full">
    <view class=" w-full h-full relative">
      <view @click="onTitle" :style="{ ...titleStyle, color: titleColor, fontSize: titleSize }"
        :class="`absolute  top-1/2  -translate-y-1/2 ${titlePosition}`">
        <slot />
        <text v-if="!slot.default">{{ showTitle }}</text>
      </view>
      <view v-if="position === 'center'" @click="tapIcon" class=" absolute left-4 top-1/2 -translate-y-1/2">
        <slot name="icon"></slot>
        <text v-if="!slot.icon && backIconShow" :class="['iconify', icon]"
          :style="{ ...iconStyle, color: iconColor, fontSize: iconSize }"></text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
