import { defineConfig } from 'umi';
import routes from './route.config';

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
  // https://github.com/umijs/umi/issues/4363
  title: false,
  routes,
  ignoreMomentLocale: true,
  layout: {
    locale: true,
  },
  theme: {
    'layout-header-background': '#104560', // 自定义 dark siderMenu 需要修改Antd的theme layout-header-background, menu-dark-submenu-bg, menu-dark-item-active-bg
    'menu-dark-submenu-bg': '#0B3043',
    'menu-dark-item-active-bg': '#2a6590'
  }
});
