import { TOKEN_KEY } from "@/enums/constantEnums";
import cache from "@/utils/cache";
import { defineStore } from "pinia";

const useSystemStore = defineStore("systemSrore", () => { 
  const userInfo = ref({})
  const getInfo = () => { 
   return  new Promise((resolve, reject) => {
      setTimeout(() => { 
        resolve("21321321321321")
      },3000)
    })
  }
  const getUserInfo = async () => { 
    console.log("过来设置name");
    userInfo.value.name= "张三"
  }
  const clearName = () => {
    userInfo.value.name = ""
  }
  return {
    userInfo,
    getUserInfo,
    getInfo,
    clearName 
  }
})
export default useSystemStore