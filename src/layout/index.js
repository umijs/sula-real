import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConfigProvider } from 'sula';
import { history, getLocale } from 'umi';

import zhCN from 'sula/es/localereceiver/zh_CN';
import enUS from 'sula/es/localereceiver/en_US';

class LayoutComponent extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <ConfigProvider
        history={history}
        locale={getLocale() === 'zh-CN' ? zhCN : enUS}
      >
        <PageHeaderWrapper title={false}>
          <div style={{ maxWidth: 1920, margin: '0 auto' }}>{children}</div>
        </PageHeaderWrapper>
      </ConfigProvider>
    );
  }
}

export default LayoutComponent;
