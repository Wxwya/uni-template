import cache from "@/utils/cache";
import createRouter from "./createRouter";
// import createRouter from "uni-route-plugins";
import { TOKEN_KEY } from "@/enums/constantEnums";
import useSystemStore from "@/stores/system";
import { storeToRefs } from "pinia"
const router = createRouter({ notFoundPath: "/pages/notFound/index" });
router.beforeEach(async (e) => {
  console.log("前置",e);
  
  if (e.to.path === "/pages/home/index") { 
    return  {router:"reLaunch",url:"/pages/login/index"}
  }
  return true
  // return false
  // const token = cache.get(TOKEN_KEY)
  // const systemStore = useSystemStore();
  // const { userInfo } = storeToRefs(systemStore) 
    
  // if (token) {
  //   if (userInfo.value.name) {
  //     console.log("进来了");
      
  //     return false
  //   } else { 
  //     await systemStore.getUserInfo();
  //     return true
  //   }
  // } else { 
  //   if (to.path === "/pages/login/index") { 
  //     return true
  //   }
  //   return {router:"reLaunch",url:"/pages/login/index"}
  // }
});
router.afterEach((e) => {
  console.log("afterEach钩子", e);
});
export default router;
