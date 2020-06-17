import React from 'react';
import { Form, request } from 'sula';
import { UserOutlined, LockTwoTone } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { parse, stringify } from 'querystring';
import style from './index.less';

const redirectToPage = () => {
  const urlParams = new URL(window.location.href);
  const params = parse(
    window.location.href
      .split('?')
      .slice(1)
      .join('?'),
  );
  let { redirect, ...rest } = params;

  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect =
          redirect.substr(redirect.indexOf('#') + 1) +
          (stringify(rest) ? `&${stringify(rest)}` : '');
      }
    } else {
      window.location.href = '/';
      return;
    }
  }

  history.replace(redirect || '/');
};

function LoginForm() {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');

  const config = {
    size: 'large',
    initialValues: {
      username: 'admin',
      password: 'sula',
    },
    itemLayout: {
      wrapperCol: {
        style: {
          maxWidth: 500,
          margin: '0 auto',
          padding: '0 24px',
        },
      },
    },
    fields: [
      {
        name: 'username',
        field: {
          type: 'input',
          props: {
            prefix: <UserOutlined style={{ color: '#1890ff' }} />,
            placeholder: '用户名： admin or user',
          },
        },
        rules: [
          {
            required: true,
            message: '请输入用户名!',
          },
        ],
      },
      {
        name: 'password',
        field: 'password',
        field: {
          type: 'password',
          props: {
            prefix: <LockTwoTone />,
            placeholder: '密码： sula',
          },
        },
        rules: [
          {
            required: true,
            message: '请输入密码!',
          },
        ],
      },
      {
        container: {
          type: 'div',
          props: {
            className: style.wrapper,
          },
        },
        fields: [
          {
            name: 'autologin',
            field: {
              type: 'checkbox',
              props: {
                children: '自动登录',
              },
            },
            initialValue: true,
            valuePropName: 'checked',
          },
          {
            style: {
              flex: 1,
              textAlign: 'right',
            },
            render: {
              type: 'link',
              props: {
                size: 'default',
                children: '忘记密码',
              },
            },
          },
        ],
      },
      {
        render: {
          type: 'button',
          props: {
            children: '登录',
            type: 'primary',
            htmlType: 'submit',
            style: {
              width: '100%',
            },
          },
        },
      },
    ],
  };

  const handleSubmit = async values => {
    try {
      const res = await request({
        url: '/api/login.json',
        method: 'post',
        params: values,
        successMessage: true,
      });
      setInitialState({ ...initialState, currentUser: res });

      redirectToPage();
      setTimeout(() => {
        refresh();
      }, 0);

      // TODO: https://github.com/ant-design/ant-design-pro-layout/issues/508
      window.location.reload();
    } catch (e) {}
  };

  return <Form {...config} onFinish={handleSubmit} />;
}

export default LoginForm;
