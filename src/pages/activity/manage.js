import React from 'react';
import { QueryTable } from 'sula';
import access from '@/components/access';

class ActivityManage extends React.Component {
  format = this.props.formatMessage;

  config = {
    rowKey: 'id',
    columns: [
      {
        key: 'id',
        title: 'ID',
        sorter: true,
      },
      {
        key: 'name',
        title: this.format({ id: 'activity.name' }),
        filterRender: 'search',
      },
      {
        key: 'title',
        title: this.format({ id: 'activity.title' }),
      },
      {
        key: 'creater',
        title: this.format({ id: 'activity.creater' }),
        filterRender: 'search',
      },
      {
        key: 'createTime',
        title: this.format({ id: 'activity.createTime' }),
      },
      {
        key: 'operator',
        title: this.format({ id: 'activity.operator' }),
        render: {
          type: 'operationgroup',
          max: 3,
          actionsRender: [
            {
              type: 'icon',
              tooltip: this.format({ id: 'view' }),
              props: {
                type: 'eye',
              },
              action: [
                {
                  type: 'route',
                  path: '/activity/view/#{record.id}',
                },
              ],
            },
            {
              type: 'icon',
              tooltip: this.format({ id: 'edit' }),
              props: {
                type: 'edit',
              },
              action: [
                {
                  type: 'route',
                  path: '/activity/edit/#{record.id}',
                },
              ],
            },
            {
              type: 'icon',
              text: this.format({ id: 'copy' }),
              props: {
                type: 'copy',
              },
              action: [
                {
                  url: '/api/activity/copy.json',
                  method: 'post',
                  params: {
                    id: '#{record.id}',
                  },
                },
                'refreshtable',
              ],
            },
            {
              type: 'icon',
              text: this.format({ id: 'refresh' }),
              props: {
                type: 'redo',
              },
              action: ['refreshtable'],
            },
            {
              type: 'icon',
              text: this.format({ id: 'delete' }),
              props: {
                type: 'delete',
              },
              action: [
                {
                  url: '/api/activity/delete.json',
                  method: 'post',
                  params: {
                    id: '#{record.id}',
                  },
                },
                'refreshtable',
              ],
            },
          ],
        },
      },
    ],
    rowSelection: {},
    actionsRender: [
      {
        type: 'button',
        props: {
          danger: true,
          children: this.format({ id: 'activity.delete' }),
          type: 'primary',
        },
        confirm: this.format({ id: 'activity.delete.confirm' }),
        disabled: ctx => {
          const { length } = ctx.table.getSelectedRowKeys() || [];
          return !length;
        },
        action: [
          {
            url: '/api/activity/delete.json',
            method: 'post',
            params: {
              id: '#{table.getSelectedRowKeys()}',
            },
          },
          'refreshtable',
        ],
      },
      {
        type: 'button',
        props: {
          children: this.format({ id: 'create' }),
          type: 'primary',
        },
        action: {
          type: 'route',
          path: '/activity/create',
        },
      },
    ],
    remoteDataSource: {
      url: '/api/activity/list.json',
      method: 'POST',
      convertParams: ({ params }) => {
        const { current, pageSize, ...restParams } = params;

        return {
          currentPage: current,
          size: pageSize,
          ...restParams,
        };
      },
      converter: ({ data }) => {
        const { pageData, currentPage, size, total } = data;
        return {
          list: pageData,
          current: currentPage,
          pageSize: size,
          total,
        };
      },
    },
  };

  render() {
    return <QueryTable {...this.config} />;
  }
}

export default access(ActivityManage);
