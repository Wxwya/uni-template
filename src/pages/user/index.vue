<script setup>
import cache from '@/utils/cache';

const logout = () => { 
  cache.clear()
}
</script>

<template>
  <div class="">User

    <view @click="logout">退出登录</view>
  </div>
</template>

<style lang="scss" scoped></style>
