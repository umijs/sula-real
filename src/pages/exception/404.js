import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="页面不存在."
    extra={
      <Link to="/">
        <Button type="primary">返回主页</Button>
      </Link>
    }
  />
);
