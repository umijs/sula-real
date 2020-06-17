import React from 'react';
import { Spin } from 'antd';
import Form from './component/loginform';

import style from './index.less';

class Login extends React.Component {
  state = {
    loading: false,
  };

  componentWillUnmount() {
    this.cn?.destroy();
  }

  render() {
    const { loading } = this.state;
    return (
      <div className={style.container}>
        <div className={style.login}>
          <div className={style.logo}>
            <img src="https://img.alicdn.com/tfs/TB1GfPJxYH1gK0jSZFwXXc7aXXa-56-56.svg" />
            <h1>Sula</h1>
          </div>
          <Spin spinning={loading}>
            <Form />
          </Spin>
        </div>
      </div>
    );
  }
}

export default Login;
