import { createPinia } from 'pinia'
const pinia = createPinia()
export default (app:any) => {
    app.use(pinia)
}
