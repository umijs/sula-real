import React from 'react';
import { Switch } from 'antd';
import { CreateForm } from 'sula';
import Upload from '@/components/avatarUpload';
import access from '@/components/access';

class FlowDetail extends React.Component {
  format = this.props.formatMessage;

  state = {
    mode: this.props.match.params.mode,
  };

  id = this.props.match.params.id;

  modeSwitchRender = () => {
    if (this.props.match.params.mode !== 'view') {
      return null;
    }
    return (
      <div>
        {this.format({ id: 'flow.enableEditing' })}:{' '}
        <Switch
          onChange={this.onModeChange}
          checkedChildren={this.format({ id: 'flow.enableEditing.yes' })}
          unCheckedChildren={this.format({ id: 'flow.enableEditing.no' })}
        />
      </div>
    );
  };

  onModeChange = (checked) => {
    this.setState({
      mode: checked ? 'edit' : 'view',
    });
  };

  config = {
    actionsPosition: 'bottom',
    container: {
      type: 'div',
      props: {
        style: {
          marginBottom: 64,
        },
      },
    },
    itemLayout: {
      span: 12,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 16,
      },
    },
    fields: [
      {
        container: {
          type: 'card',
          props: {
            title: this.format({ id: 'flow.basicInformation' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
            extra: this.modeSwitchRender(),
          },
        },
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
            rules: [
              {
                required: true,
                message: this.format({ id: 'flow.name.rules' }),
              },
            ],
          },
          {
            name: 'type',
            label: this.format({ id: 'flow.type.label' }),
            field: {
              type: 'select',
              props: {
                placeholder: this.format({
                  id: 'flow.type.placeholder',
                }),
              },
            },
            rules: [
              {
                required: true,
                message: this.format({ id: 'flow.type.rules' }),
              },
            ],
            initialSource: [
              {
                text: this.format({
                  id: 'flow.type.initialSource.structure',
                }),
                children: [
                  {
                    text: this.format({
                      id: 'flow.type.initialSource.rope',
                    }),
                    value: 'rope',
                  },
                  {
                    text: this.format({
                      id: 'flow.type.initialSource.data',
                    }),
                    value: 'data',
                  },
                ],
              },
              {
                text: this.format({ id: 'flow.type.initialSource.middle' }),
                value: 'middle',
              },
              {
                text: this.format({ id: 'flow.type.initialSource.high' }),
                value: 'high',
              },
            ],
          },
          {
            name: 'description',
            label: this.format({ id: 'flow.description' }),
            field: {
              type: 'input',
              props: {
                placeholder: this.format({
                  id: 'flow.description.placeholder',
                }),
              },
            },
          },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: this.format({
              id: 'flow.container.classifiedInformation',
            }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'category',
            label: this.format({ id: 'flow.category.label' }),
            field: {
              type: 'select',
              props: {
                placeholder: this.format({
                  id: 'flow.category.placeholder',
                }),
              },
            },
            rules: [
              {
                required: true,
                message: this.format({ id: 'flow.category.rules' }),
              },
            ],
            remoteSource: {
              url: '/api/flow/categoryList.json',
            },
          },
          {
            name: 'mode',
            label: this.format({ id: 'flow.mode.label' }),
            field: {
              type: 'select',
              props: {
                placeholder: this.format({ id: 'flow.mode.placeholder' }),
              },
            },
            rules: [
              {
                required: true,
                message: this.format({ id: 'flow.mode.rules' }),
              },
            ],
            remoteSource: {
              init: false, // 初始不请求数据源
              url: '/api/flow/modeList.json',
              convertParams: ({ params }) => {
                // params中可以拿到关联项的值
                const { category } = params;
                return {
                  parent: category,
                };
              },
            },
            dependency: {
              source: {
                // 远程数据源关联
                relates: ['category'],
                defaultOutput: [],
              },
            },
          },
          {
            name: 'level',
            label: this.format({ id: 'flow.level.label' }),
            field: {
              type: 'select',
              props: {
                placeholder: this.format({ id: 'flow.level.placeholder' }),
              },
            },
            rules: [
              {
                required: true,
                message: this.format({ id: 'flow.level.rules' }),
              },
            ],
            remoteSource: {
              init: false,
              url: '/api/flow/levelList.json',
              convertParams: ({ params }) => {
                const { mode } = params;
                return {
                  parent: mode,
                };
              },
            },
            dependency: {
              source: {
                relates: ['mode'],
                defaultOutput: [],
              },
            },
          },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: this.format({ id: 'flow.container.deployInformation' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        itemLayout: {
          span: 24,
          labelCol: {
            span: 6,
          },
        },
        fields: [
          {
            name: 'icon',
            label: this.format({ id: 'flow.icon' }),
            field: (ctx) => {
              const { mode } = ctx; // 自定义表单组件
              return <Upload mode={mode} />;
            },
          },
          {
            name: 'iconDesc',
            label: this.format({ id: 'flow.iconDesc.label' }),
            field: {
              type: 'textarea',
              props: {
                placeholder: this.format({
                  id: 'flow.iconDesc.placeholder',
                }),
              },
            },
          },
        ],
      },
    ],
    submit: {
      url: '/api/flow/update.json',
      method: 'POST',
      params: {
        ...(this.state.mode !== 'create' ? { id: this.id } : {}),
      },
    },
    remoteValues: {
      url: '/api/flow/detail.json',
      params: {
        id: this.id,
      },
    },
    ...(this.state.mode === 'audit'
      ? {
          actionsRender: [
            {
              type: 'button',
              props: {
                children: this.format({ id: 'flow.auditorPassed' }),
                type: 'primary',
              },
              action: [
                {
                  url: '/api/flow/updateStatus.json',
                  method: 'POST',
                  params: {
                    id: this.id,
                    action: 'G',
                  },
                },
                'back',
              ],
            },
            {
              type: 'button',
              props: {
                children: this.format({ id: 'flow.refuseAudit' }),
                type: 'primary',
              },
              action: [
                {
                  url: '/api/flow/updateStatus.json',
                  method: 'POST',
                  params: {
                    id: this.id,
                    action: 'D',
                  },
                },
                'back',
              ],
            },
            {
              type: 'button',
              props: {
                children: this.format({ id: 'back' }),
              },
              action: 'back',
            },
          ],
        }
      : {}),
  };

  render() {
    const { mode } = this.state;

    return (
      <CreateForm mode={mode === 'audit' ? 'view' : mode} {...this.config} />
    );
  }
}

export default access(FlowDetail);
