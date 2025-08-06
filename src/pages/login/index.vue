<script lang="ts" setup>
import { onHide, onShow } from '@dcloudio/uni-app';
import useSystemStore from '@/stores/system';
import { TOKEN_KEY } from '@/enums/constantEnums';
import cache from '@/utils/cache';
const systemStore = useSystemStore()
const back = () => {
  uni.navigateBack()
}
const toUser = () => { 
  uni.switchTab({
    url: '/pages/user/index?id=222'
  })
}
const toCheshi = () => { 
  uni.navigateTo({
    url: '/pages/test/index?id=222'
  })
}
const login = async () => {  
  const tokens = await systemStore.getInfo()
  cache.set(TOKEN_KEY, tokens)
  uni.switchTab({ url: '/pages/index/index' })
}
onShow(() => { 
  console.log('login onShow');
})
onHide(() => { 
  console.log('login onHide')
})
onBeforeUnmount(() => {
  console.log('login onBeforeUnmount');
  
})
</script>

<template>
  <view class="">
    <view>login</view>
    <view @click="back">返回 </view>
    <view @click="toUser">用户</view>
    <view @click="toCheshi">测试</view>
    <view @click="login">登录</view>
  </view>
</template>

<style lang="scss" scoped></style>
