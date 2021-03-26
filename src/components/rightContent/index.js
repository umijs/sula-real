import React from 'react';
import { Space, Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Dropdown from '@/components/avatarDropdown';
import LocaleSwitch from '@/components/localeSwitch';

export default () => {
  return (
    <Space align="center" style={{ marginRight: 24 }}>
      <Tooltip title="github">
        <GithubOutlined
          onClick={() => {
            window.open('https://github.com/umijs/sula-real');
          }}
          style={{
            color: '#24292f',
            fontSize: 26,
            display: 'block',
          }}
        />
      </Tooltip>
      <LocaleSwitch />
      <Dropdown />
    </Space>
  );
};
