import React from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { triggerRenderPlugin } from 'sula/es/rope/triggerPlugin'; // 配置写法解析函数
import access from '@/components/access';

class OperatorDropdown extends React.Component {
  state = {
    visible: false,
  };

  handleClick = () => {
    this.setState({
      visible: true,
    });
  };

  hidden = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  // 组件卸载后阻止异步操作
  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }

  overlay = () => {
    const { ctx, config } = this.props;
    const { render = [] } = config;
    const children = render.map((v, idx) => {
      const { action = [] } = v;
      const finalConfig = {
        ...v,
        action: [
          ...action,
          ctx => {
            ctx.menu.hidden();
          },
        ],
      };
      return (
        <Menu.Item key={idx} style={{ padding: '5px 8px' }}>
          {triggerRenderPlugin(
            Object.assign({}, ctx, { menu: { hidden: this.hidden } }),
            finalConfig,
          )}
          {finalConfig.text}
        </Menu.Item>
      );
    });
    return <Menu>{children}</Menu>;
  };

  render() {
    const { visible } = this.state;
    return (
      <Dropdown
        overlay={this.overlay()}
        onClick={this.handleClick}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <EllipsisOutlined style={{ color: '#1890ff' }} />
      </Dropdown>
    );
  }
}

export default access(OperatorDropdown);
