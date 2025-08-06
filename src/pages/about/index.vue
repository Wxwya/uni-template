<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
const logins = () => { 
  uni.navigateTo({
       url:"/pages/login/index"
      })
}

</script>

<template>
  <view class="">about

    <view class=" !bg-red-500 w-10 h-10"></view>
    <view @click="logins">关闭所有页面去login</view>
  </view>
</template>

<style lang="scss" scoped></style>
