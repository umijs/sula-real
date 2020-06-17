import React from 'react';

import style from './index.less';

export default class Rank extends React.Component {
  renderRankItem = data => {
    if (!data) return;
    return data.map(({ name, value }, idx) => {
      return (
        <div className={style.item} key={name}>
          <span className={style.rank}>{idx + 1}</span>
          <span className={style.name}>{name}</span>
          <span className={style.count}>{value}次</span>
        </div>
      );
    });
  };

  render() {
    const { data } = this.props;

    if (!Object.keys(data).length) {
      return <div />;
    }

    const { xAxisData, list } = data || {};

    let sortList = [];
    xAxisData.forEach((key, idx) => {
      sortList.push({
        name: key,
        value: list.reduce((a, b) => {
          return a + b.dataSource[idx];
        }, 0),
      });
    });

    sortList = sortList.sort((a, b) => b.value - a.value);

    return <div>{this.renderRankItem(sortList)}</div>;
  }
}
