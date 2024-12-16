<script lang="ts" setup>
import { onShow, onHide } from '@dcloudio/uni-app';
import PageHead from "@/components/XwyaHead/index.vue"
const toIndex = () => { 
  uni.switchTab({ url: '/pages/index/index' })
}
onShow(() => { 
  console.log("test onShow");
  
})
onHide(() => { 
  console.log("test onHide")
})
onBeforeUnmount(() => {
  console.log('test onBeforeUnmount');
})
</script>

<template>
  <view class=" py-10">
    <PageHead />
    测试页面
    <view @click="toIndex">回退首页</view>
  </view>
</template>

<style lang="scss" scoped></style>
