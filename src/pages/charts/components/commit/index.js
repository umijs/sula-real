import React from 'react';
import Charts from '@sula/charts';

export default class Commit extends React.Component {
  static defaultProps = {
    type: 'line',
    title: '',
    url: '',
  };

  state = {
    option: {
      title: {
        text: this.props.title,
      },
      tooltip: {
        trigger: 'axis',
        formatter: ['0a', '0a', '0a'],
      },
      grid: {
        left: 50,
        top: 60,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          lineStyle: {
            color: 'rgba(0, 0, 0, .4)',
          },
        },
      },
      legend: {},
      yAxis: {
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0, 0, 0, .4)',
          },
        },
      },
      series: [],
    },
  };

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      const { xAxisData = [], list = [] } = props.data || {};

      return {
        option: {
          ...state.option,
          xAxis: {
            ...state.option.xAxis,
            data: xAxisData,
          },
          series: list.map(({ name, dataSource }, idx) => ({
            name,
            data: dataSource,
            type: props.type,
            ...props.seriesProps,
          })),
        },
      };
    }
    return null;
  }

  render() {
    const { option } = this.state;
    return (
      <div style={{ background: '#fff', padding: '16px' }}>
        <Charts style={{ height: 400 }} option={option} />
      </div>
    );
  }
}
