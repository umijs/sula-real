import { defineConfig } from 'umi';
import routes from './route.config';
import { IrisBlue } from './theme';

export default defineConfig({
  sula: {
    locale: {
      default: 'zh-CN',
    },
  },
  extraBabelPlugins: [
    // libraryDirectory: 'es' 必须这样写
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  // https://umijs.org/plugins/plugin-layout#locale
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  routes,
  ignoreMomentLocale: true,
  layout: {
    locale: true,
  },
  theme: IrisBlue,
});
