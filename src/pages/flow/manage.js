import React from 'react';
import { QueryTable } from 'sula';
import StatusFlow from '@/components/statusFlow';
import access from '@/components/access';

class FlowManage extends React.Component {
  format = this.props.formatMessage;

  statusConfig = {
    D: {
      text: this.format({ id: 'flow.status.draft' }),
      operators: [
        {
          text: this.format({ id: 'flow.submitter' }),
          confirm: true,
          url: '/api/flow/updateStatus.json',
          action: 'A',
        },
        {
          text: this.format({ id: 'flow.operate.delete' }),
          confirm: true,
          url: '/api/flow/delete.json',
        },
      ],
    },
    G: {
      text: this.format({ id: 'flow.status.grayscale' }),
      operators: [
        {
          text: this.format({ id: 'flow.operate.publish' }),
          confirm: true,
          url: '/api/flow/updateStatus.json',
          action: 'R',
        },
        {
          text: this.format({ id: 'flow.operate.rollback' }),
          confirm: true,
          url: '/api/flow/updateStatus.json',
          action: 'D',
        },
        {
          text: this.format({ id: 'flow.operate.delete' }),
          confirm: true,
          url: '/api/flow/delete.json',
        },
      ],
    },
    A: {
      text: this.format({ id: 'flow.status.audit' }),
      operators: [
        {
          text: this.format({ id: 'flow.status.audit' }),
          href: '/flow/audit',
        },
      ],
    },
    R: {
      text: this.format({ id: 'flow.status.run' }),
      operators: [
        {
          text: this.format({ id: 'flow.operate.offline' }),
          confirm: true,
          url: '/api/flow/updateStatus.json',
          action: 'D',
        },
      ],
    },
  };

  config = {
    rowKey: 'id',
    layout: 'vertical',
    fields: [
      {
        name: 'name',
        label: this.format({ id: 'flow.name' }),
        field: {
          type: 'input',
          props: {
            placeholder: this.format({ id: 'flow.name.placeholder' }),
          },
        },
      },
    ],
    initialValues: {
      // 默认搜索条件
      name: 's',
    },
    columns: [
      {
        key: 'id',
        title: 'ID',
        sorter: true,
      },
      {
        key: 'name',
        title: this.format({ id: 'flow.name' }),
        render: ({ text, record }) => {
          // 支持自定义组件
          return <a href={`#/flow/view/${record.id}`}>{text}</a>;
        },
      },
      {
        key: 'submitter',
        title: this.format({ id: 'flow.submitter' }),
      },
      {
        key: 'auditor',
        title: this.format({ id: 'flow.auditor' }),
      },
      {
        key: 'status',
        width: '400px',
        title: this.format({ id: 'flow.status' }),
        render: (ctx) => {
          // 自定义操作列
          return (
            <StatusFlow
              status={ctx.text}
              statusConfig={this.statusConfig}
              {...ctx}
            />
          );
        },
      },
    ],
    actionsRender: [
      {
        type: 'button',
        props: {
          type: 'primary',
          children: this.format({ id: 'flow.create' }),
        },
        action: {
          type: 'route',
          path: '/flow/create',
        },
      },
    ],
    tableProps: {
      // table属性透传
      initialPaging: {
        pagination: {
          showSizeChanger: false,
        },
      },
      expandable: {
        expandedRowRender: (record) => {
          return <div style={{ marginLeft: 20 }}>{record.description}</div>;
        },
      },
    },
    remoteDataSource: {
      url: '/api/flow/manage.json',
      method: 'post',
    },
  };

  render() {
    return <QueryTable {...this.config} />;
  }
}

export default access(FlowManage);
