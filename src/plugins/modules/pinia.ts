import { createPinia } from 'pinia'

// #ifdef APP  

import Vue from 'vue'  

if (!Vue.hasInjectionContext) {  

    Vue.hasInjectionContext = () => {  

        return Vue.getCurrentInstance()  

    }  

}  

// #endif  
const pinia = createPinia()
export default (app:any) => {
    app.use(pinia)
}
