<template>
  <view>
      <xwya-page ref="page">
  <view class="content">
    <xwya-head  :onTitle="onTitle"  />
     <view class=" text-red-400 text-lg" @tap="testOpen">Index</view>
     <view @click="login" class="mt-4">登录</view>
     <view @click="home">home</view>
     <view @click="logins">关闭所有页面去login</view>
     <view @click="deleteName">删除名称</view>
     <!-- <text class="iconify solar--alt-arrow-left-line-duotone"></text> -->
  </view>
  </xwya-page>
  </view>

</template>

<script setup lang="ts">
// import XwyaPage from "@/components/xwya-page/index.vue"
import { ref} from 'vue'
import cache from '@/utils/cache';
import { onLoad } from '@dcloudio/uni-app';
import useSystemStore from '@/stores/system';
const title = ref('Hello')
const page = ref(null)
const { proxy } = getCurrentInstance()
const systemStore = useSystemStore()
const onTitle = () => { 
  console.log("点击标题");
  cache.set('name','张三',60)
}
const testOpen = () => { 
  console.log(page.value);
  
}
const deleteName = () => { 
  systemStore.clearName()
}
const logins = () => { 
  uni.reLaunch({
       url:"/pages/login/index?id=333"
      })
}

const login = () => {
  // '/pages/baidu/index?id=1'
  uni.navigateTo({
    url: '/pages/warn/index'
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
  const pages = getCurrentPages()
  console.log(pages);
  
}) 


</script>

<style>

</style>
