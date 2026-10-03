import { defineConfig } from 'vite';

// base: './' 让构建产物可以直接部署到 GitHub Pages 的任意子路径
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0', // 监听所有网卡，允许局域网设备（手机、平板）访问
    port: 5173,
    open: false,
  },
});
