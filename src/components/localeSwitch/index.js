import React from 'react';
import { Dropdown, Menu } from 'antd';
import { getLocale, setLocale } from 'umi';

import styles from './index.less';

export default () => {
  const localeUrl = {
    en: 'https://img.alicdn.com/tfs/TB1GdeYri_1gK0jSZFqXXcpaXXa-24-24.png',
    zh: 'https://img.alicdn.com/tfs/TB1AQ50reH2gK0jSZJnXXaT1FXa-24-24.png',
  };

  const menu = (
    <Menu className={styles.localeMenu}>
      <Menu.Item
        onClick={() => {
          setLocale('en-US', true);
        }}
      >
        <img src={localeUrl.en} /> English
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setLocale('zh-CN', true);
        }}
      >
        <img src={localeUrl.zh} /> 中文
      </Menu.Item>
    </Menu>
  );

  const logoUrl = getLocale() === 'en-US' ? localeUrl.en : localeUrl.zh;

  return (
    <div style={{ cursor: 'pointer' }}>
      <Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
        <div className={styles.localeLogo}>
          <img src={logoUrl} />
        </div>
      </Dropdown>
    </div>
  );
};
