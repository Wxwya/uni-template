const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

export default {
  install: (app: any) => {
    for (const module of Object.values(modules)) {
      const fun = module.default
      if (typeof fun === 'function') {
        fun(app)
      }
    }
  },
}
