import React from 'react';
import { Space, Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Avatar from '@/components/avatarDropdown';
import LocaleSwitch from '@/components/localeSwitch';

export default () => {
  return (
    <Space style={{ marginRight: 24 }}>
      <div style={{ display: 'flex' }}>
        <Tooltip title="github">
          <GithubOutlined
            onClick={() => {
              window.open('https://github.com/umijs/sula-real');
            }}
            style={{
              color: '#24292f',
              fontSize: 26,
            }}
          />
        </Tooltip>
      </div>
      <LocaleSwitch />
      <Avatar />
    </Space>
  );
};
