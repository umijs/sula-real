import { defineConfig } from 'umi';
import routes from './route.config';
import { IrisBlue } from './theme';

export default defineConfig({
  sula: {
    locale: {
      default: 'zh-CN',
    },
  },
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
    baseNavigator: true,
  },
  routes,
  ignoreMomentLocale: true,
  layout: {
    locale: true,
  },
  theme: IrisBlue
});
