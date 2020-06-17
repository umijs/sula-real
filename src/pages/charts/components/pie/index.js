import React from 'react';
import Charts from '@sula/charts';
import { request } from 'sula';

export default class Pie extends React.Component {
  state = {
    option: {
      title: {
        text: '开发占比',
        top: 8,
        left: 8,
      },
      tooltip: {
        formatter: ['0,0'],
      },
      label: {
        formatter: '{b}\n{d}%',
      },
      legend: {
        bottom: 10,
      },
      series: [],
    },
  };

  componentDidMount() {
    request({
      url: '/api/charts/pie.json',
      method: 'post',
    }).then(data => {
      this.setState({
        option: {
          ...this.state.option,
          series: {
            name: '开发占比',
            type: 'pie',
            center: ['50%', '46%'],
            radius: ['40%', '50%'],
            data,
          },
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
