import React from 'react';
import G6 from '@antv/g6';
import { Descriptions, Card } from 'antd';
import GraphTooltip from './tooltip';
import { getSize } from './util';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
  ].map(item => {
    return {
      ...item,
      label: `${item.source}->${item.target}`,
    }
  }),
};

class Relation extends React.Component {
  state = {
    nodes: [],
    edges: [],
    tooltipX: null,
    tooltipY: null,
    tooltipVis: false,
  };

  containerRef = React.createRef();
  componentDidMount() {

    const { width, height } = getSize(this.containerRef.current);
    console.log('height: ', height);

    const graph = new G6.Graph({
      container: this.containerRef.current,
      width,
      height,
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: 140,
      },
      modes: {
        default: ['drag-node'],
      },
      defaultNode: {
        size: 24,
        color: '#5B8FF9',
        style: {
          lineWidth: 2,
          fill: '#C6E5FF',
        },
      },
      defaultEdge: {
        size: 1,
        color: '#e2e2e2',
        labelCfg: {
          autoRotate: true,
          refY: 0,
          style: {
            background: {
              fill: '#ffffff',
              padding: [4,4,4,4],
            },
          }
        },
        style: {
          endArrow: {
            path: 'M 0,0 L 5,3 L 5,-3 Z',
            fill: '#e2e2e2',
            stroke: '#e2e2e2',
            // ...
          }
        }
      },
    });

    graph.data(data);
    graph.render();


    graph.on('node:mouseenter', e => {
      const { item } = e;
      const model = item.getModel();
      const { x, y } = model;
      const point = graph.getCanvasByPoint(x, y);

      this.setState({
        tooltipX: point.x + 24,
        tooltipY: point.y - 24,
        tooltipVis: true,
      });
    });

    graph.on('node:mouseleave', e => {
      this.setState({
        tooltipVis: false,
      });
    });
  }
  render() {
    const { tooltipVis, tooltipX, tooltipY } = this.state;
    return (
      <div>
        <Card title="交易关系">
          <div
            ref={this.containerRef}
            style={{
              height: 'calc(100vh - 200px)',
              background: '#fff',
              position: 'relative',
            }}
          />
        </Card>
        {tooltipVis ? (
          <GraphTooltip x={tooltipX} y={tooltipY}>
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="Item">海外购物</Descriptions.Item>
              <Descriptions.Item label="Category">花费</Descriptions.Item>
              <Descriptions.Item label="Discount">20%</Descriptions.Item>
              <Descriptions.Item label="Total">$60.00</Descriptions.Item>
              <Descriptions.Item label="Other">$10.00</Descriptions.Item>
            </Descriptions>
          </GraphTooltip>
        ) : null}
      </div>
    );
  }
}

export default Relation;
