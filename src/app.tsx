import React from 'react';
import { request } from 'sula';
import { history, getLocale, Link } from 'umi';
import RightContent from '@/components/rightContent';
import { BasicLayoutProps, DefaultFooter } from '@ant-design/pro-layout';

//  https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState() {
  const { pathname, href = '' } = location;
  if (pathname !== '/user/login') {
    try {
      let redirect = '';
      if (href.includes('?')) {
        redirect = '?redirect=' + href;
      }

      const currentUser = await request({
        url: '/api/current.json',
        method: 'post',
      });

      if (!currentUser || currentUser === 'none') {
        history.push('/user/login' + redirect);
        return;
      }
      return {
        currentUser,
      };
    } catch (error) {
      history.push('/user/login');
    }
  }

  return {};
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = (): BasicLayoutProps => {
  return {
    title: 'Sula-Real',
    logo: 'https://img.alicdn.com/tfs/TB1GfPJxYH1gK0jSZFwXXc7aXXa-56-56.svg',
    siderWidth: 208,
    breadcrumbRender: (routers = []) => {
      return [
        {
          path: '/',
          breadcrumbName: getLocale() === 'zh-CN' ? '主页' : 'Home',
        },
        ...routers,
      ];
    },
    // hash 路由跳转
    itemRender: (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
      const { path, breadcrumbName } = route;
      if (last) {
        return <span>{breadcrumbName}</span>;
      }
      return <Link to={path}>{breadcrumbName}</Link>;
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: 'Sula Real',
      fontSize: 13,
    },
    footerRender: () => (
      <DefaultFooter
        links={[
          {
            key: 'sula-real',
            title: 'Sula Real',
            href: 'https://github.com/umijs/sula-real',
          },
          {
            key: 'logo',
            title: (
              <img
                src="https://img.alicdn.com/tfs/TB1GfPJxYH1gK0jSZFwXXc7aXXa-56-56.svg"
                width="14px"
              />
            ),
            href: 'https://github.com/umijs/sula-real',
          },
          { key: 'sula', title: 'Sula', href: 'https://github.com/umijs/sula' },
        ]}
        copyright="Sula.JS"
      />
    ),
  };
};
