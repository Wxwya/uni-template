<template>
  <view class="content">
    <XwyaHead  :onTitle="onTitle"  />
     <view class=" text-red-400 text-lg">Index</view>
     <view @click="login" class="mt-4">登录</view>
     <view @click="home">home</view>

     <view @click="logins">关闭所有页面去login</view>
     <view @click="deleteName">删除名称</view>
     <!-- <text class="iconify solar--alt-arrow-left-line-duotone"></text> -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XwyaHead from '@/components/XwyaHead'
import cache from '@/utils/cache';
import { onLaunch, onLoad } from '@dcloudio/uni-app';
import useSystemStore from '@/stores/system';
const title = ref('Hello')
const { proxy } = getCurrentInstance()
const systemStore = useSystemStore()
const onTitle = () => { 
  console.log("点击标题");
  cache.set('name','张三',60)
  // console.log(cache.get('name'));
  // const val = cache.get("name")
  // console.log(cache.get("name"));
  
  
}
const deleteName = () => { 
  systemStore.clearName()
}
const logins = () => { 
  uni.reLaunch({
       url:"/pages/login/index"
      })
}

const login = () => {
  uni.navigateTo({
    url: '/pages/baidu/index?id=1'
  })
}
const home = () => {
  uni.navigateTo({
    url: '/pages/home/index'
  })
}
const test = async () => { 
  const res = await proxy.$api.system.test()
  console.log(res);
  
}
onLoad(() => { 
  // test()
  // test()
})

</script>

<style>

</style>
