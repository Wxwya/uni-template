<script setup lang="ts">
import { onLaunch, onShow, onHide,onLoad,onTabItemTap } from "@dcloudio/uni-app";
import monitorRouter from "@/router"


onLaunch(() => {
  // console.log("启动1");
  // uni.addInterceptor('navigateBack', (options) => {
  //     console.log('用户进行了侧滑返回操作');
  //     // 处理侧滑返回操作
  //   });

});
onLoad(() => { 

  
  // monitorRouter()
})

onShow(() => {
  // console.log("App Show");
});
onHide(() => {
  // console.log("App Hide");
});
</script>
<style></style>
