import React from 'react';
import { Card, Statistic, Tooltip, Divider } from 'antd';
import Charts from '@sula/charts';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import style from './index.less';

export default class Static extends React.Component {
  static defaultProps = {
    type: 'line',
    areaStyle: false,
    data: {},
  };

  render() {
    const { title, data, ...restProps } = this.props;
    const { data: dataSource = [] } = data;

    const option = {
      tooltip: {},
      grid: {
        left: -10,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        show: false,
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
        ],
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          data: dataSource,
          type: this.props.type,
          areaStyle: this.props.areaStyle ? {} : undefined,
          ...restProps,
        },
      ],
    };

    const total = dataSource.reduce((a, b) => a + b, 0);

    return (
      <Card bodyStyle={{ paddingBottom: 8 }}>
        <Statistic title={title} value={total} />
        <Charts style={{ height: 46 }} option={option} />
        <Tooltip className={style.info} title={`每月${title}数量统计`}>
          <ExclamationCircleOutlined />
        </Tooltip>
        <Divider style={{ margin: '12px 0 8px' }} />
        <span>
          月最高{title}数量: {dataSource.length ? Math.max(...dataSource) : 0}
        </span>
      </Card>
    );
  }
}
