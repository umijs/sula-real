import React from 'react';
import Charts from '@sula/charts';
import { request } from 'sula';

export default class Radar extends React.Component {
  state = {
    option: {
      title: {
        text: '综合能力',
        left: '8px',
        top: '8px',
      },
      tooltip: {},
      legend: {
        bottom: 10,
        textStyle: {
          rich: {
            value: {
              padding: [0, 0, 0, 4],
            },
          },
        },
      },
      radar: {
        radius: 80,
        center: ['50%', '45%'],
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0, 0, 0, 0.3)'
          }
        },
        indicator: [
          {
            name: '优化效果',
            max: 10,
          },
          {
            name: '开发时间',
            max: 10,
          },
          {
            name: '语法',
            max: 10,
          },
          {
            name: '复用性',
            max: 10,
          },
          {
            name: '完整性',
            max: 10,
          },
          {
            name: '美观',
            max: 10,
          },
        ],
      },
    },
  };

  componentDidMount() {
    request({
      url: '/api/charts/radar.json',
      method: 'post',
    }).then(data => {
      this.setState({
        option: {
          ...this.state.option,
          legend: {
            ...this.state.option.legend,
            formatter: name => {
              const { value } = data.find(v => v.name === name);
              const average = value.reduce((a, b) => a + b, 0) / value.length;
              return `{title|${name}}{value|${average.toFixed(2)}}{unit|分}`;
            },
          },
          series: [
            {
              type: 'radar',
              data,
            },
          ],
        },
      });
    });
  }

  render() {
    const { option } = this.state;
    return (
      <div style={{ background: '#fff' }}>
        <Charts style={{ height: 320 }} option={option} />
      </div>
    );
  }
}
