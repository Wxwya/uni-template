/** @type {import('tailwindcss').Config} */
const { addIconSelectors } = require('@iconify/tailwind');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: '24rpx',
        sm: '26rpx',
        base: '28rpx',
        lg: '30rpx',
        xl: '32rpx',
        '2xl': '34rpx',
        '3xl': '38rpx',
        '4xl': '40rpx',
        '5xl': '44rpx',
        '6xl': '56rpx'
      },
    },
  },
  plugins: [
    addIconSelectors(["solar"])
  ],
  corePlugins: {
    preflight: false,
  }
}