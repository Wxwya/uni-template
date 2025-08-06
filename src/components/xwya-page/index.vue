<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const open = ref(false)
const  onClose = () => {
  open.value = false
}
const onOpen = () => { 
  open.value = true
}

// provide('onClose', onClose)
// provide('onOpen', onOpen)


defineExpose({
  onClose,
  onOpen
})
onLoad(() => { 
  console.log(6666);
  
})
 
</script>


<template>
  <view class="">
    <view>
      <slot></slot>
    </view>
      
     
      <view  v-if="open" class=" fixed inset-0 bg-black/60 flex justify-center items-center text-white" > test66666</view>
  </view>
</template>

<style lang="scss" scoped></style>
