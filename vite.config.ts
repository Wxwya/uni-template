import { defineConfig } from "vite";
import { resolve } from 'path';
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";
// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isH5 = process.env.UNI_PLATFORM === "h5";
const isApp = process.env.UNI_PLATFORM === "app";
const WeappTailwindcssDisabled = isH5 || isApp;
// import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ["vue", "pinia"],
      dts: "./src/types/auto-import.d.ts",
    }),
    Components({
      dts: "./src/types/components.d.ts",
      dirs: ["src/components"], // 默认就是识别src/components文件，该文件夹下的所有组件都会自动 import
    }),
    uvwt({
			rem2rpx: true,
			disabled: WeappTailwindcssDisabled,
			// 由于 hbuilderx 会改变 process.cwd 所以这里必须传入当前目录的绝对路径
			tailwindcssBasedir: __dirname
	  })
  ],
  css: {
	  postcss: {
			plugins: [
				require("tailwindcss")({
					// 注意此处，手动传入你 `tailwind.config.js` 的绝对路径
					config: resolve("./tailwind.config.js")
				}),
				require("autoprefixer")
			],
	  },
	}
});
