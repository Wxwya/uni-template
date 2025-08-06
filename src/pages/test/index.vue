<script lang="ts" setup>
import { onShow, onHide } from '@dcloudio/uni-app';
const toIndex = () => { 
  uni.switchTab({ url: '/pages/index/index' })
}


</script>

<template>
  <view class=" py-10">
    <xwya-head />
    测试页面
    <view @click="toIndex">回退首页</view>
  </view>
</template>

<style lang="scss" scoped></style>
