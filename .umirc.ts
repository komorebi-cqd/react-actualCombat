import { defineConfig } from 'umi';
const { resolve } = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
  },
  alias: {
    utils: resolve(__dirname, './src/utils'),
    common: resolve(__dirname, './src/common'),
    components: resolve(__dirname, './src/components'),
    api: resolve(__dirname, './src/servicer'),
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});
