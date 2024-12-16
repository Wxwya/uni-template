import cache from "@/utils/cache";
import createRouter from "./createRouter";
import { TOKEN_KEY } from "@/enums/constantEnums";
import useSystemStore from "@/stores/system";
import { storeToRefs} from "pinia"
const router = createRouter({notFoundPath:"/pages/notFound/index"});
router.beforeEach(async ({ to,form}: RouterEvent) => {
  const token = cache.get(TOKEN_KEY)
  const systemStore = useSystemStore();
  const { userInfo } = storeToRefs(systemStore) 
  console.log("获取最新token",token);
  
  if (token) {
    if (userInfo.value.name) {
      return true
    } else { 
      await systemStore.getUserInfo();
      return true
    }
  } else { 
    if (to.path === "/pages/login/index") { 
      return true
    }
    return {router:"reLaunch",url:"/pages/login/index"}
  }
  // if(to.path ===)

  // if (e.to.path === "/pages/about/index") {
  //   return { router: "navigateTo", url: "/pages/login/index" };
  // }
  // return true; 
});
router.afterEach((e: RouterEvent) => {
  // console.log("afterEach钩子", e);
});
export default router;
