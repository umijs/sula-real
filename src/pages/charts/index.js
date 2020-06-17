import React from 'react';
import { Row, Col, Card, Progress, Space, Tooltip } from 'antd';
import { request } from 'sula';

import CommitStatic from './components/commit';
import Radar from './components/radar';
import Pie from './components/pie';
import Static from './components/static';
import Rank from './components/rank';
import Map from './components/map';
import CardProgress from './components/progress';

export default class SulaCharts extends React.Component {
  state = {
    data: {},
  };

  componentDidMount() {
    request({
      url: '/api/charts/list.json',
      method: 'post',
    }).then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { statis = {}, commits = {}, commitLines = {} } = this.state.data;
    const { download = {}, active = {}, commit = {} } = statis;

    return (
      <div>
        <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
          <Col span={12} xl={8}>
            <Static title="下载" data={download} smooth />
          </Col>
          <Col span={12} xl={8}>
            <Static type="bar" data={active} title="活跃用户" />
          </Col>
          <Col span={12} xl={8}>
            <Static type="line" data={commit} title="社区贡献" areaStyle />
          </Col>
        </Row>

        <Row style={{ background: '#fff', marginBottom: 16 }}>
          <Col span={16} xl={18}>
            <CommitStatic type="bar" title="提交统计" data={commits} />
          </Col>
          <Col span={8} xl={6} style={{ padding: '8px 24px' }}>
            <Card title="提交日期排行" bordered={false}>
              <Rank data={commits} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
          <Col xl={8} span={24}>
            <Radar />
          </Col>
          <Col xl={8} span={24}>
            <Pie />
          </Col>
          <Col xl={8} span={24}>
            <Map />
          </Col>
        </Row>

        <Row style={{ background: '#fff' }}>
          <Col span={16} xl={18}>
            <CommitStatic
              title="代码行数统计"
              data={commitLines}
              seriesProps={{ smooth: true, areaStyle: true }}
            />
          </Col>
          <Col span={8} xl={6} style={{ padding: '8px 24px' }}>
            <Card
              title="整体进度"
              bordered={false}
              size="small"
              style={{ marginTop: 16 }}
              bodyStyle={{ textAlign: 'center' }}
            >
              <Progress
                type="circle"
                strokeWidth={10}
                percent={
                  commitLines?.progress?.reduce((a, b) => a + b.value, 0) /
                  commitLines?.progress?.length
                }
              />
            </Card>
            <Card
              title="个人进度"
              bordered={false}
              size="small"
              style={{ marginTop: 16 }}
              bodyStyle={{ paddingLeft: 8, paddingRight: 8 }}
            >
              <CardProgress data={commitLines?.progress} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
