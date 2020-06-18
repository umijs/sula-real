import React from 'react';
import Graphin from '@antv/graphin';
import { Descriptions, Card } from 'antd';
import GraphTooltip from './tooltip';
import { handleResize } from './util';

const source = {
  nodes: [
    {
      name: '商家',
      type: 'amazon-square-fill',
    },
    {
      name: 'A某',
      type: 'user',
    },
    {
      name: 'B某',
      type: 'user',
    },
    {
      name: 'C某',
      type: 'user',
    },
    {
      name: '银行卡',
      type: 'credit card',
    },
  ],
  edges: [
    {
      source: 'A某',
      target: '银行卡',
      relative: '转账1000元',
    },
    {
      source: '银行卡',
      target: 'B某',
      relative: '常用银行卡',
    },
    {
      source: 'B某',
      target: 'C某',
      relative: '亲友',
    },
    {
      source: 'C某',
      target: '商家',
      relative: '交易1200元',
    },
    {
      source: '商家',
      target: 'A某',
      relative: '同人',
      lineType: 'dash',
    },
  ],
};

const nodes = source.nodes.map(node => {
  return {
    data: node,
    shape: 'CircleNode',
    id: node.name,
    label: node.name,
    style: {
      icon: node.type,
      fontFamily: 'graphin',
      nodeSize: 18,
    },
  };
});

const edges = source.edges.map(edge => {
  return {
    data: edge,
    source: edge.source,
    target: edge.target,
    shape: 'LineEdge',
    label: edge.relative,
    style: {
      line: {
        dash: edge.lineType === 'dash' ? [2, 2] : 0,
      },
    },
  };
});

class Relation extends React.Component {
  state = {
    nodes: [],
    edges: [],
    tooltipX: null,
    tooltipY: null,
    tooltipVis: false,
  };

  containerRef = React.createRef();
  graphRef = React.createRef();
  componentDidMount() {
    const { graph } = this.graphRef.current;
    handleResize(this.containerRef.current, graph);
    // 模拟服务端请求回的数据
    this.setState({
      nodes,
      edges,
    });

    graph.on('node:mouseenter', e => {
      const { item } = e;
      const model = item.getModel();
      const { x, y } = model;
      const point = graph.getCanvasByPoint(x, y);

      this.setState({
        tooltipX: point.x + 9,
        tooltipY: point.y + 9,
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
    const { nodes, edges, tooltipVis, tooltipX, tooltipY } = this.state;
    return (
      <Card title="交易关系">
        <div
          ref={this.containerRef}
          style={{
            height: 'calc(100vh - 200px)',
            background: '#fff',
            position: 'relative',
          }}
        >
          <Graphin
            ref={this.graphRef}
            data={{
              nodes,
              edges,
            }}
            layout={{
              name: 'force',
            }}
          />
          {tooltipVis ? (
            <GraphTooltip x={tooltipX} y={tooltipY}>
              <Descriptions bordered size="small" column={2}>
                <Descriptions.Item label="Item">
                  海外购物
                </Descriptions.Item>
                <Descriptions.Item label="Category">花费</Descriptions.Item>
                <Descriptions.Item label="Discount">20%</Descriptions.Item>
                <Descriptions.Item label="Total">$60.00</Descriptions.Item>
                <Descriptions.Item label="Other">$10.00</Descriptions.Item>
              </Descriptions>
            </GraphTooltip>
          ) : null}
        </div>
      </Card>
    );
  }
}

export default Relation;
