import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { request } from 'sula';
import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { stringify, parse } from 'querystring';

function AvatarDropdown() {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleLogout = async () => {
    await request({
      url: '/api/logout.json',
      method: 'post',
      successMessage: true,
    });

    const { redirect } = parse(window.location.href.split('?')[1]);
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
      setInitialState({ ...initialState, currentUser: 'none' });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Avatar
        style={{
          backgroundColor: '#00a2ae',
          cursor: 'pointer',
        }}
        size={26}
      >
        {initialState.currentUser}
      </Avatar>
    </Dropdown>
  );
}

export default AvatarDropdown;
