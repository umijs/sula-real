import React from 'react';
import { StepQueryTable, ModalForm, Text } from 'sula';
import access from '@/components/access';
import { filterConfig } from './config';

function principal(text) {
  switch (text) {
    case 'limengqi':
      return '李梦琪';
    case 'zhangbaili':
      return '张白丽';
    default:
    case 'xujiajia':
      return '徐佳佳';
  }
}

class PublishRelease extends React.Component {
  stepQueryTableRef = React.createRef(null);
  modalRef = React.createRef(null); // modalForm 实例
  format = this.props.formatMessage;

  jumpSteps = action => {
    switch (action) {
      case 'G':
        return this.stepQueryTableRef.handleStepChange(1);
      case 'R':
      case 'O':
        return this.stepQueryTableRef.handleStepChange(2);
      case 'A':
      case 'D':
      default:
        return this.stepQueryTableRef.handleStepChange(0);
    }
  };

  // 创建、编辑、查看、审核操作（抽屉）
  getDrawerForm = (mode, id, table) => {
    const configParams = { mode, id, format: this.format };
    if (mode === 'create') {
      return filterConfig(configParams);
    }
    this.modalRef
      .show({
        ...filterConfig(configParams)
      })
      .then(results => {
        const { $submit = {} } = results || {};
        if (results) {
          if ($submit.action) {
            this.jumpSteps($submit.action);
          }
          table.refreshTable();
        }
      });
  };

  // StepQueryTable配置
  config = {
    fields: [
      {
        name: 'iterateName',
        label: this.format({ id: 'iterateName.title' }),
        field: {
          type: 'input',
          props: {
            placeholder: this.format({ id: 'iterateName.placeholder' }),
          },
        },
      },
      {
        name: 'operator',
        label: this.format({ id: 'operator.title' }),
        field: {
          type: 'input',
          props: {
            placeholder: this.format({ id: 'operator.placeholder' }),
          },
        },
      },
    ],

    rowKey: 'id',
    layout: 'vertical',
    rowSelection: {},

    columns: [
      {
        key: 'iterateId',
        title: this.format({ id: 'iterateId.title' }),
        filterRender: 'search',
      },
      {
        key: 'iterateName',
        title: this.format({ id: 'iterateName.title' }),
      },
      {
        key: 'principal',
        title: this.format({ id: 'principal.title' }),
        filters: [
          {
            value: 'limengqi',
            text: '李梦琪',
          },
          {
            value: 'zhangbaili',
            text: '张白丽',
          },
          {
            value: 'xujiajia',
            text: '徐佳佳',
          },
        ],
        render: ctx => principal(ctx.text),
      },
      {
        key: 'operator',
        title: this.format({ id: 'operator.title' }),
        render: ctx => {
          return (
            <div>
              <div>{ctx.text}</div>
              <Text style={{ fontSize: 12 }} type="secondary">
                {ctx.record.createTime}
              </Text>
            </div>
          );
        },
      },
      {
        key: 'direction',
        title: this.format({ id: 'direction.title' }),
        width: '20%',
      },
      {
        key: 'status',
        title: this.format({ id: 'status.title' }),
        width: 220,
        render: {
          type: 'status',
          max: 3,
          spaceSize: 'middle',
          props: {
            children: '#{text}',
            statusList: [
              {
                key: 'D',
                value: this.format({ id: 'draft' }),
                color: 'default',
              },
              {
                key: 'A',
                value: this.format({ id: 'audit' }),
                color: 'warning',
              },
              {
                key: 'G',
                value: this.format({ id: 'grayscale' }),
                children: this.format({ id: 'grayscale.change.button.action.label' }),
                color: 'default',
                statusSuffix: '#{record.grayScale}', // 状态后缀
              },
              {
                key: 'R',
                value: this.format({ id: 'status.running' }),
                color: 'success',
              },
              {
                key: 'O',
                value: this.format({ id: 'status.alreadyOffline' }),
                color: 'default',
              },
            ],
            style: {    // style透传到OperationGroup组件中
              marginTop: '4px',
            },
          },
          actionsRender: [
            {
              // 提交审核
              type: 'icon',
              confirm: this.format(
                { id: 'confirm.title' },
                { name: this.format({ id: 'audit' }) },
              ),
              text: this.format({ id: 'audit.send' }),
              tooltip: this.format({ id: 'audit.send' }),
              funcProps: {
                visible: ctx => ctx.text === 'D'
              },
              props: {
                type: 'audit',
              },
              action: [
                {
                  url: '/api/release/submitReview.json',
                  method: 'post',
                  params: {
                    action: 'A',
                  },
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      id: ctx.record.id,
                    };
                  },
                },
                'refreshTable',
              ],
            },
            {
              // 查看
              type: 'icon',
              text: this.format({ id: 'view' }),
              tooltip: this.format({ id: 'view' }),
              funcProps: {
                visible: ctx => ctx.text === 'D' || ctx.text === 'A',
              },
              props: {
                type: 'eye',
              },
              action: [
                ({ record, table }) => {
                  this.getDrawerForm('view', record.id, table);
                },
              ],
            },
            {
              // 编辑
              type: 'icon',
              text: this.format({ id: 'edit' }),
              tooltip: this.format({ id: 'edit' }),
              funcProps: {
                visible: ctx => ctx.text === 'D',
              },
              props: {
                type: 'edit',
              },
              action: [
                ({ record, table }) => {
                  this.getDrawerForm('edit', record.id, table);
                },
              ],
            },
            {
              // 灰度编辑
              type: 'icon',
              text: this.format({ id: 'edit' }),
              tooltip: this.format({ id: 'edit' }),
              funcProps: {
                visible: ctx => ctx.text === 'G',
              },
              props: {
                type: 'edit',
              },
              action: [
                ({ record, table }) => {
                  this.getDrawerForm('grayscaleEdit', record.id, table);
                },
              ],
            },
            {
              // 审核中
              type: 'icon',
              text: this.format({ id: 'audit' }),
              tooltip: this.format({ id: 'audit' }),
              funcProps: {
                visible: ctx => ctx.text === 'A',
              },
              props: {
                type: 'link',
              },
              action: [
                ({ record, table }) => {
                  this.getDrawerForm('audit', record.id, table);
                },
              ],
            },
            {
              // 发布
              type: 'icon',
              text: this.format({ id: 'publish' }),
              tooltip: this.format({ id: 'publish' }),
              confirm: this.format(
                { id: 'confirm.title' },
                { name: this.format({ id: 'publish' }) },
              ),
              funcProps: {
                visible: ctx => ctx.text === 'G' || ctx.text === 'O',
              },
              props: {
                type: 'cloudUpload',
              },
              action: [
                {
                  url: '/api/release/publish.json',
                  method: 'post',
                  params: { action: 'R' },
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      id: ctx.record.id,
                    };
                  },
                },
                () => {
                  this.jumpSteps('R');
                },
              ],
            },
            {
              // 下线
              type: 'icon',
              text: this.format({ id: 'status.offline' }),
              tooltip: this.format({ id: 'status.offline' }),
              confirm: this.format(
                { id: 'confirm.title' },
                { name: this.format({ id: 'status.offline' }) },
              ),
              funcProps: {
                visible: ctx => ctx.text === 'R',
              },
              props: {
                type: 'cloudDownload',
              },
              action: [
                {
                  url: '/api/release/publish.json',
                  method: 'post',
                  params: { action: 'O' },
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      id: ctx.record.id,
                    };
                  },
                },
                'refreshTable',
              ],
            },
            {
              // 回滚
              type: 'icon',
              text: this.format({ id: 'status.rollback' }),
              tooltip: this.format({ id: 'status.rollback' }),
              confirm: this.format(
                { id: 'confirm.title' },
                { name: this.format({ id: 'status.rollback' }) },
              ),
              props: {
                type: 'redo',
              },
              funcProps: {
                visible: ctx => ctx.text === 'R' || ctx.text === 'G',
              },
              action: [
                {
                  url: '/api/release/publish.json',
                  method: 'post',
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      action: ctx.text === 'R' ? 'G' : 'A',
                      id: ctx.record.id,
                    };
                  },
                },
                ctx => {
                  if (ctx.text === 'R') {
                    this.jumpSteps('G');
                  } else {
                    this.jumpSteps('A');
                  }
                },
              ],
            },
            {
              // 删除
              type: 'icon',
              text: this.format({ id: 'delete' }),
              confirm: this.format(
                { id: 'confirm.title' },
                { name: this.format({ id: 'delete' }) },
              ),
              tooltip: this.format({ id: 'delete' }),
              funcProps: {
                visible: ctx =>
                  ctx.text === 'D' || ctx.text === 'A' || ctx.text === 'O',
              },
              props: {
                type: 'delete',
              },
              action: [
                {
                  url: '/api/release/submitReview.json',
                  method: 'post',
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      id: ctx.record.id,
                    };
                  },
                },
                'refreshTable',
              ],
            },
          ],
        },
      },
    ],

    steps: [
      {
        title: this.format({ id: 'waitPublish' }),
        remoteDataSource: {
          url: '/api/release/manage.json',
          params: {
            status: 'noPublish',
          },
          method: 'post',
          converter: ({ data }) => {
            return data;
          },
        },
        actionsRender: [
          {
            type: 'button',
            props: {
              type: 'primary',
              children: this.format({ id: 'create' }),
            },
            action: [this.getDrawerForm('create'), 'refreshtable'],
          },
          {
            type: 'button',
            disabled: ctx => {
              const selectedRowKeys = ctx.table.getSelectedRowKeys() || [];
              return !selectedRowKeys.length;
            },
            confirm: this.format({ id: 'waitPublish.delete.confirm' }),
            props: {
              type: 'primary',
              children: this.format({ id: 'waitPublish.delete.children' }),
            },
            action: [
              {
                url: '/api/release/batchDelete.json',
                method: 'post',
                convertParams: ctx => {
                  return {
                    ...ctx.params,
                    id: ctx.table.getSelectedRowKeys(),
                  };
                },
              },
              'refreshTable',
            ],
          },
        ],
      },
      {
        title: this.format({ id: 'grayscale' }),
        remoteDataSource: {
          url: '/api/release/manage.json',
          params: {
            status: 'grayscale',
          },
          method: 'post',
          converter: ({ data }) => {
            return data;
          },
        },
        actionsRender: [
          {
            type: 'button',
            disabled: ctx => {
              const selectedRowKeys = ctx.table.getSelectedRowKeys() || [];
              return !selectedRowKeys.length;
            },
            confirm: this.format({ id: 'grayscale.button.confirm' }),
            props: {
              type: 'primary',
              children: this.format({ id: 'grayscale.button.text' }),
            },
            action: [
              {
                url: '/api/release/batchPublish.json',
                method: 'post',
                params: {
                  action: 'R',
                },
                convertParams: ctx => {
                  return {
                    ...ctx.params,
                    id: ctx.table.getSelectedRowKeys(),
                  };
                },
              },
              () => {
                this.stepQueryTableRef.handleStepChange(2);
              },
            ],
          },
          {
            type: 'button',
            disabled: ctx => {
              const selectedRowKeys = ctx.table.getSelectedRowKeys() || [];
              return !selectedRowKeys.length;
            },
            confirm: this.format({ id: 'publish.button.confirm' }),
            props: {
              type: 'primary',
              children: this.format({ id: 'publish.button.text' }),
            },
            action: [
              {
                url: '/api/release/batchPublish.json',
                method: 'post',
                params: {
                  action: 'A',
                },
                convertParams: ctx => {
                  return {
                    ...ctx.params,
                    id: ctx.table.getSelectedRowKeys(),
                  };
                },
              },
              () => {
                this.stepQueryTableRef.handleStepChange(0);
              },
            ],
          },
          {
            type: 'button',
            disabled: ctx => {
              const selectedRowKeys = ctx.table.getSelectedRowKeys() || [];
              return !selectedRowKeys.length;
            },
            props: {
              type: 'primary',
              children: this.format({ id: 'grayscale.change.button.children' }),
              style: {
                width: '100%',
              },
            },
            action: [
              {
                type: 'modalform',
                title: this.format({ id: 'grayscale.change.button.children' }),
                fields: [
                  {
                    name: 'grayScale',
                    label: this.format({
                      id: 'grayscale.change.button.action.label',
                    }),
                    field: {
                      type: 'inputnumber',
                      props: {
                        placeholder: this.format({
                          id: 'grayscale.change.button.action.placeholder',
                        }),
                        formatter: value => value && `${value}%`,
                        style: { width: '100%' },
                        max: 100,
                        min: 10,
                      },
                    },
                    rules: [
                      {
                        required: true,
                        message: this.format({
                          id: 'grayscale.change.button.action.placeholder',
                        }),
                      },
                    ],
                  },
                ],
                submit: {
                  url: '/api/release/changeProportion.json',
                  method: 'post',
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      getSelectedRows: ctx.table.getSelectedRows(),
                    };
                  },
                  successMessage: this.format({
                    id: 'grayscale.change.button.action.message',
                  }),
                },
              },
              'refreshtable',
            ],
          },
        ],
      },
      {
        title: this.format({ id: 'publish' }),
        remoteDataSource: {
          url: '/api/release/manage.json',
          params: {
            status: 'publish',
          },
          method: 'post',
          converter: ({ data }) => {
            return data;
          },
        },
      },
    ],
  };

  render() {
    return (
      <>
        <StepQueryTable
          {...this.config}
          ref={ref => {
            this.stepQueryTableRef = ref;
          }}
        />
        <ModalForm
          type="drawer"
          ref={ref => {
            this.modalRef = ref;
          }}
        />
      </>
    );
  }
}

export default access(PublishRelease);
