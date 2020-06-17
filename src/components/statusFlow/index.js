import React from 'react';
import { Dropdown, Menu, Button, Modal } from 'antd';
import { request } from 'sula';
import { history } from 'umi';
import access from '@/components/access';

import styles from './index.less';

class StatusList extends React.Component {
  format = this.props.formatMessage;

  static defaultProps = {
    statusList: ['D', 'A', 'G', 'R'],
  };

  getCurrentIndex = () => {
    const { status, statusList } = this.props;
    return statusList.indexOf(status);
  };

  renderButton = ({ index, text }) => (
    <Button
      className={styles.flowItem}
      disabled={this.getCurrentIndex() < index}
    >
      {text}
    </Button>
  );

  getColor = idx => {
    let color =
      this.getCurrentIndex() === idx
        ? '#1890ff'
        : this.getCurrentIndex() > idx
        ? '#69c0ff'
        : '#DBE2EC';
    let fontColor =
      this.getCurrentIndex() < idx ? 'rgba(0, 0, 0, .65)' : '#fff';
    return {
      backgroundColor: color,
      borderColor: color,
      color: fontColor,
    };
  };

  getMenu = data => (
    <Menu>
      {data.map((item, index) => {
        const { value = '', text, disabled } = item;
        return (
          <Menu.Item
            key={`${value}${index}`}
            style={{ textAlign: 'center' }}
            onClick={() => {
              this.handleMenuItemClick(item);
            }}
            disabled={disabled}
          >
            {text}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  handleMenuItemClick = item => {
    const { text, confirm, action, url, href } = item;
    const {
      table,
      record: { id },
    } = this.props;
    if (confirm) {
      Modal.confirm({
        title: this.format(
          {
            id: 'flow.operator.confirm',
          },
          { name: text },
        ),
        okText: this.format({ id: 'flow.confirm' }),
        cancelText: this.format({ id: 'flow.cancel' }),
        onOk: () => {
          return request({
            url,
            method: 'POST',
            successMessage: this.format({ id: 'flow.operate.success' }),
            params: {
              id,
              action,
            },
          }).then(() => {
            table.refreshTable();
          });
        },
      });
    }
    if (href) {
      history.push(`${href}/${id}`);
    }
  };

  render() {
    const { statusList } = this.props;
    return (
      <div className={styles.flow}>
        {statusList.map((item, index) => {
          const { text, operators } = this.props.statusConfig[statusList[index]];
          return (
            <div
              className={styles.item}
              key={item}
              style={{ ...this.getColor(index), textIndent: index ? '1em' : 0 }}
            >
              {index > 0 && <div className={styles.leftcorner} />}

              {this.getCurrentIndex() === index ? (
                <Dropdown overlay={this.getMenu(operators)}>
                  {this.renderButton({ index, text })}
                </Dropdown>
              ) : (
                <div style={{ zIndex: 100, position: 'relative' }}>{text}</div>
              )}
              <div
                className={styles.corner}
                style={{ ...this.getColor(index) }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default access(StatusList);
