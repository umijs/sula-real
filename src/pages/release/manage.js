import React from 'react';
import { StepQueryTable, Text } from 'sula';
import access from '@/components/access';
import { fieldsConfig } from './config';

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
  format = this.props.formatMessage;

  jumpSteps = action => {
    const { handleStepChange } = this.stepQueryTableRef || {};
    switch (action) {
      case 'G':
        return handleStepChange(1);
      case 'R':
      case 'O':
        return handleStepChange(2);
      case 'A':
      case 'D':
      case 'W':
      default:
        return handleStepChange(0);
    }
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
          type: 'statusRender',
          max: 4,
          spaceSize: 'middle',
          props: {
            children: '#{text}',
            // 操作和状态中的状态列表配置
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
                key: 'W',
                value: this.format({ id: 'grayscale.waitGrayscale' }),
                color: 'volcano',
              },
              {
                key: 'G',
                value: this.format({ id: 'grayscale' }),
                children: this.format({
                  id: 'grayscale.change.button.action.label',
                }),
                color: 'success',
                statusSuffix: '#{record.grayScale}', // 状态文本后缀
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
            // style透传到OperationGroup组件中
            style: {
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
              visible: '#{text === "D"}',
              props: {
                type: 'audit',
              },
              action: [
                {
                  url: '/api/release/submitReview.json',
                  method: 'post',
                  successMessage: this.format({ id: 'confirm.successMessage' }),
                  params: {
                    action: 'A',
                    id: '#{record.id}',
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
              visible: '#{text === "D" || text === "A" || text === "W"}',
              props: {
                type: 'eye',
              },
              action: [
                {
                  type: 'drawerform',
                  title: this.format({ id: 'view' }),
                  mode: 'view',
                  remoteValues: {
                    url: '/api/release/detail.json',
                    params: { id: '#{record.id}' },
                    method: 'post',
                  },
                  fields: fieldsConfig('view', this.format),
                },
              ],
            },
            {
              // 编辑
              type: 'icon',
              text: this.format({ id: 'edit' }),
              tooltip: this.format({ id: 'edit' }),
              visible: '#{text === "D" || text === "W"}',
              props: {
                type: 'edit',
              },
              action: [
                {
                  type: 'drawerform',
                  mode: 'edit',
                  title: this.format({ id: 'edit' }),
                  remoteValues: {
                    url: '/api/release/detail.json',
                    params: { id: '#{record.id}' },
                    method: 'post',
                  },
                  fields: fieldsConfig('edit', this.format),
                  submit: {
                    url: '/api/release/edit.json',
                    method: 'post',
                    params: { id: '#{record.id}' },
                    successMessage: this.format({ id: 'edit.success' }),
                    finish: {
                      type: 'refreshtable',
                    },
                  },
                },
              ],
            },
            {
              // 灰度编辑
              type: 'icon',
              text: this.format({ id: 'edit' }),
              tooltip: this.format({ id: 'edit' }),
              visible: '#{text  === "G"}',
              props: {
                type: 'edit',
              },
              action: [
                {
                  type: 'drawerform',
                  mode: 'edit',
                  title: this.format({ id: 'edit' }),
                  remoteValues: {
                    url: '/api/release/detail.json',
                    params: { id: '#{record.id}' },
                    method: 'post',
                  },
                  fields: fieldsConfig('grayscale', this.format),
                  submit: {
                    url: '/api/release/edit.json',
                    method: 'post',
                    params: { id: '#{record.id}' },
                    successMessage: this.format({ id: 'edit.success' }),
                    finish: {
                      type: 'refreshtable',
                    },
                  },
                },
              ],
            },
            {
              // 灰度查看
              type: 'icon',
              text: this.format({ id: 'view' }),
              tooltip: this.format({ id: 'view' }),
              visible: '#{text === "G"}',
              props: {
                type: 'eye',
              },
              action: [
                {
                  type: 'drawerform',
                  mode: 'view',
                  title: this.format({ id: 'view' }),
                  remoteValues: {
                    url: '/api/release/detail.json',
                    params: { id: '#{record.id}' },
                    method: 'post',
                  },
                  fields: fieldsConfig('grayscale', this.format),
                },
              ],
            },
            {
              // 审核
              type: 'icon',
              text: this.format({ id: 'audit' }),
              tooltip: this.format({ id: 'audit' }),
              visible: '#{text === "A"}',
              props: {
                type: 'link',
              },
              action: [
                {
                  type: 'drawerform',
                  mode: 'edit',
                  title: this.format({ id: 'audit' }),
                  remoteValues: {
                    url: '/api/release/detail.json',
                    params: { id: '#{record.id}' },
                    method: 'post',
                  },
                  submitButtonProps: {
                    children: this.format({ id: 'submitAuditBtn.text' }),
                  },
                  fields: fieldsConfig('audit', this.format),
                  // 抽屉自定义底部操作组
                  actionsRender: [
                    {
                      type: 'button',
                      props: {
                        type: 'primary',
                        children: this.format({ id: 'submitAuditBtn.text' }),
                      },
                      action: [
                        'validateFields',
                        {
                          url: '/api/release/audit.json',
                          method: 'post',
                          params: { id: '#{record.id}', action: 'W' },
                          convertParams: ctx => {
                            return {
                              ...ctx.params,
                              ...ctx.result,
                            };
                          },
                        },
                        'refreshtable',
                        'modalCancel',
                      ],
                    },
                    {
                      type: 'button',
                      props: {
                        type: 'primary',
                        children: this.format({ id: 'submitAuditBtn.refuse' }),
                        danger: true,
                      },
                      action: [
                        'validateFields',
                        {
                          url: '/api/release/audit.json',
                          method: 'post',
                          params: { id: '#{record.id}', action: 'D' },
                          convertParams: ctx => {
                            return {
                              ...ctx.params,
                              ...ctx.result,
                            };
                          },
                        },
                        'refreshtable',
                        'modalCancel',
                      ],
                    },
                    {
                      type: 'button',
                      props: {
                        children: this.format({ id: 'submitAuditBtn.back' }),
                      },
                      action: 'modalCancel',
                    },
                  ],
                },
              ],
            },
            {
              // 灰度发布
              type: 'icon',
              text: this.format({ id: 'grayscale.release' }),
              tooltip: this.format({ id: 'grayscale.release' }),
              visible: '#{text === "W"}',
              props: {
                type: 'cloudUpload',
              },
              action: [
                {
                  type: 'modalform',
                  title: this.format({ id: 'grayscale.release' }),
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
                    url: '/api/release/grayScaleRelease.json',
                    method: 'post',
                    convertParams: ctx => {
                      return {
                        ...ctx.params,
                        id: ctx.record.id,
                        action: 'G',
                      };
                    },
                    successMessage: this.format({
                      id: 'confirm.successMessage',
                    }),
                    finish: {
                      type: () => this.jumpSteps('G'),
                    },
                  },
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
              visible: '#{text === "G" || text === "O"}',
              props: {
                type: 'cloudUpload',
              },
              action: [
                {
                  url: '/api/release/publish.json',
                  method: 'post',
                  params: { action: 'R', id: '#{record.id}' },
                  successMessage: this.format({ id: 'confirm.successMessage' }),
                  finish: {
                    type: () => this.jumpSteps('R'),
                  },
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
              visible: '#{text === "R"}',
              props: {
                type: 'cloudDownload',
              },
              action: [
                {
                  url: '/api/release/publish.json',
                  method: 'post',
                  params: { action: 'O', id: '#{record.id}' },
                  successMessage: this.format({ id: 'confirm.successMessage' }),
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
              visible: '#{text === "R" || text === "G"}',
              props: {
                type: 'redo',
              },
              action: [
                {
                  url: '/api/release/publish.json',
                  method: 'post',
                  successMessage: this.format({ id: 'confirm.successMessage' }),
                  convertParams: ctx => {
                    return {
                      ...ctx.params,
                      action: ctx.text === 'R' ? 'G' : 'W',
                      id: ctx.record.id,
                    };
                  },
                  finish: ctx => {
                    ctx.text === 'R'
                      ? this.jumpSteps('G')
                      : this.jumpSteps('W');
                  },
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
              visible: '#{text !== "R"}',
              props: {
                type: 'delete',
              },
              action: [
                {
                  url: '/api/release/submitReview.json',
                  method: 'post',
                  successMessage: this.format({ id: 'confirm.successMessage' }),
                  params: {
                    id: '#{record.id}',
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
      // 步骤一配置
      {
        title: this.format({ id: 'waitPublish' }),
        remoteDataSource: {
          url: '/api/release/manage.json',
          params: {
            status: 'noPublish',
          },
          method: 'post',
        },
        actionsRender: [
          {
            type: 'button',
            props: {
              type: 'primary',
              children: this.format({ id: 'create' }),
            },
            action: [
              {
                type: 'drawerform',
                title: this.format({ id: 'create' }),
                mode: 'create',
                fields: fieldsConfig('create', this.format),
                submit: {
                  url: '/api/release/create.json',
                  method: 'post',
                  successMessage: this.format({ id: 'create.success' }),
                  finish: {
                    type: 'refreshtable',
                  },
                },
              },
            ],
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
      // 步骤二配置
      {
        title: this.format({ id: 'grayscale' }),
        remoteDataSource: {
          url: '/api/release/manage.json',
          params: {
            status: 'grayscale',
          },
          method: 'post',
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
                      grayscaleList: ctx.table.getSelectedRows(),
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
      // 步骤三配置
      {
        title: this.format({ id: 'publish' }),
        remoteDataSource: {
          url: '/api/release/manage.json',
          params: {
            status: 'publish',
          },
          method: 'post',
        },
      },
    ],
  };

  render() {
    return (
      <StepQueryTable
        {...this.config}
        ref={ref => {
          this.stepQueryTableRef = ref;
        }}
      />
    );
  }
}

export default access(PublishRelease);
