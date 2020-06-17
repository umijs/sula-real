import React from 'react';
import { Progress } from 'antd';

import style from './index.less';

export default class CardProgress extends React.Component {
  renderItem = data => {
    if (!data) return;
    return data.map(item => {
      const { name, value } = item;
      return (
        <div className={style.item} key={item.name}>
          <span className={style.name}>{name}</span>
          <Progress steps={5} percent={value} />
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderItem(this.props.data)}</div>;
  }
}
