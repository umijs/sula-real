import React from 'react';
import { StepForm } from 'sula';
import Wrapper from '@/components/picWrapper';
import access from '@/components/access';

function getMode(props) {
  const { pathname } = props.location;
  if (pathname.includes('edit')) {
    return 'edit';
  }

  return 'create';
}
class ActivityEdit extends React.Component {
  formRef = React.createRef(null);

  mode = getMode(this.props);

  format = this.props.formatMessage;

  weekSource = [
    { text: this.format({ id: 'activity.source.moday' }), value: 'monday' },
    { text: this.format({ id: 'activity.source.tuesday' }), value: 'tuesday' },
    {
      text: this.format({ id: 'activity.source.wednesday' }),
      value: 'wednesday',
    },
    {
      text: this.format({ id: 'activity.source.thursday' }),
      value: 'thursday',
    },
    { text: this.format({ id: 'activity.source.friday' }), value: 'friday' },
    {
      text: this.format({ id: 'activity.source.saturday' }),
      value: 'saturday',
    },
    { text: this.format({ id: 'activity.source.sunday' }), value: 'sunday' },
  ];

  config = {
    itemLayout: {
      span: 8,
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    },
    mode: this.mode,
    steps: [
      {
        title: this.format({ id: 'activity.title.basic' }),
        fields: [
          {
            fields: [
              // 利用分组单独占一行
              {
                name: 'name',
                label: this.format({ id: 'activity.name' }),
                field: {
                  type: 'input',
                  props: {
                    placeholder: this.format({
                      id: 'activity.name.placeholder',
                    }),
                  },
                },
                itemLayout: {
                  offset: 6,
                },
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.name.required' }),
                  },
                ],
              },
            ],
          },
          {
            fields: [
              {
                name: 'activityMonth',
                label: this.format({ id: 'activity.activityMonth' }),
                itemLayout: {
                  offset: 6,
                },
                field: {
                  type: 'rangepicker',
                  props: {
                    style: { width: '100%' },
                    picker: 'month',
                    format: 'yyyy-MM', // 显示格式
                    valueFormat: 'utc', // utc格式传输
                  },
                },
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
              },
              {
                name: 'activityTime',
                label: this.format({ id: 'activity.activityTime' }),
                field: {
                  type: 'timerangepicker',
                  props: {
                    style: { width: '100%' },
                    valueFormat: 'utc',
                  },
                },
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
              },
            ],
          },
          {
            fields: [
              {
                name: 'notDisturb',
                label: this.format({ id: 'activity.notDisturb' }),
                field: {
                  type: 'checkboxgroup',
                },
                itemLayout: {
                  span: 48,
                  offset: 6,
                },
                initialSource: this.weekSource,
              },
            ],
          },
          {
            fields: [
              {
                name: 'repeat',
                label: this.format({ id: 'activity.repeat' }),
                field: {
                  type: 'radiogroup',
                },
                itemLayout: {
                  span: 48,
                  offset: 6,
                },
                initialValue: 'once',
                initialSource: [
                  {
                    text: this.format({ id: 'activity.repeat.source.once' }),
                    value: 'once',
                  },
                  {
                    text: this.format({ id: 'activity.repeat.source.repeat' }),
                    value: 'repeat',
                  },
                ],
              },
              {
                name: 'periodTime',
                label: <div />, // 纵向对其，不显示label，但是保留label位置
                field: {
                  type: 'select',
                  props: {
                    style: {
                      width: 100,
                    },
                    placeholder: this.format({
                      id: 'activity.periodTime.placeholder',
                    }),
                  },
                },
                itemLayout: {
                  span: 24,
                },
                style: {
                  paddingLeft: 12,
                },
                initialSource: [
                  {
                    text: this.format({
                      id: 'activity.periodTime.source.weekly',
                    }),
                    value: 'weekly',
                  },
                  {
                    text: this.format({
                      id: 'activity.periodTime.source.month',
                    }),
                    value: 'month',
                  },
                ],
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
                required: false, // rules和required 必填，但不显示必填标记
                initialVisible: false,
                dependency: {
                  visible: {
                    relates: ['repeat'],
                    inputs: [['repeat']],
                    output: true,
                    defaultOutput: false,
                  },
                },
              },
              {
                name: 'times',
                label: <div />,
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
                required: false,
                field: {
                  type: 'select',
                  props: {
                    mode: 'multiple',
                    allowClear: true,
                  },
                  funcProps: {
                    placeholder: ctx => {
                      const value = ctx.form.getFieldValue('periodTime');
                      if (value === 'weekly')
                        return this.format({
                          id: 'activity.times.placeholder.weekly',
                        });
                      if (value === 'month')
                        return this.format({
                          id: 'activity.times.placeholder.month',
                        });
                      return this.format({ id: 'activity.times.placeholder' });
                    },
                  },
                },
                initialVisible: false,
                dependency: {
                  visible: {
                    relates: ['repeat'],
                    inputs: [['repeat']],
                    output: true,
                    defaultOutput: false,
                  },
                  source: {
                    relates: ['periodTime'],
                    cases: [
                      {
                        inputs: [['weekly']],
                        output: this.weekSource,
                      },
                      {
                        inputs: [['month']],
                        output: [
                          {
                            text: this.format({
                              id: 'activity.times.source.firstWeek',
                            }),
                            value: 'firstWeek',
                          },
                          {
                            text: this.format({
                              id: 'activity.times.source.secondWeek',
                            }),
                            value: 'secondWeek',
                          },
                          {
                            text: this.format({
                              id: 'activity.times.source.thirdWeek',
                            }),
                            value: 'thirdWeek',
                          },
                          {
                            text: this.format({
                              id: 'activity.times.source.fourceWeek',
                            }),
                            value: 'fourceWeek',
                          },
                        ],
                      },
                    ],
                    defaultOutput: [],
                  },
                },
              },
            ],
          },
        ],
      },
      {
        title: this.format({ id: 'activity.title.config' }),
        layout: 'horizontal',
        itemLayout: {
          span: 24,
        },
        fields: [
          {
            name: 'openConfig',
            collect: false,
            label: this.format({ id: 'activity.openConfig' }),
            valuePropName: 'checked',
            initialValue: true,
            field: {
              type: 'switch',
              props: {
                checkedChildren: this.format({
                  id: 'activity.openConfig.source.yes',
                }),
                unCheckedChildren: this.format({
                  id: 'activity.openConfig.source.no',
                }),
              },
            },
          },
          {
            name: 'group',
            dependency: {
              visible: {
                relates: ['openConfig'],
                inputs: [[true]],
                output: true,
                defaultOutput: false,
              },
            },
            fields: [
              {
                name: 'activityType',
                label: this.format({ id: 'activity.activityType' }),
                field: {
                  type: 'select',
                  props: {
                    placeholder: this.format({
                      id: 'activity.activityType.placeholder',
                    }),
                  },
                },
                initialSource: [
                  {
                    text: this.format({
                      id: 'activity.activityType.source.online',
                    }),
                    value: 'online',
                  },
                  {
                    text: this.format({
                      id: 'activity.activityType.source.offline',
                    }),
                    value: 'offline',
                  },
                ],
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
              },
              {
                name: 'activityLanguage',
                label: this.format({ id: 'activity.activityLanguage' }),
                field: {
                  type: 'select',
                  props: {
                    placeholder: this.format({
                      id: 'activity.activityLanguage.placeholder',
                    }),
                  },
                },
                initialSource: [
                  {
                    text: this.format({
                      id: 'activity.activityLanguage.source.zh',
                    }),
                    value: 'zh-cn',
                  },
                  {
                    text: this.format({
                      id: 'activity.activityLanguage.source.en',
                    }),
                    value: 'en-us',
                  },
                ],
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
              },
              {
                name: 'activityDesc',
                label: this.format({ id: 'activity.activityDesc' }),
                field: {
                  type: 'textarea',
                  props: {
                    placeholder: this.format({
                      id: 'activity.activityDesc.placeholder',
                    }),
                    style: {
                      height: 100,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        title: this.format({ id: 'activity.title.button' }),
        fields: [
          {
            itemLayout: {
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            container: () => {
              // 图片在wrapper里
              return (
                <Wrapper url="https://img.alicdn.com/tfs/TB1VCQjI4D1gK0jSZFsXXbldVXa-746-318.png" />
              );
            },
            fields: [
              {
                name: 'title',
                label: this.format({ id: 'activity.title' }),

                field: {
                  type: 'input',
                  props: {
                    placeholder: this.format({
                      id: 'activity.title.placeholder',
                    }),
                  },
                },
                rules: [
                  {
                    required: true,
                    message: this.format({ id: 'activity.required' }),
                  },
                ],
              },
              {
                name: 'subtitle',
                label: this.format({ id: 'activity.subtitle' }),

                field: {
                  type: 'input',
                  props: {
                    placeholder: this.format({
                      id: 'activity.subtitle.placeholder',
                    }),
                  },
                },
              },
              {
                name: 'other',
                label: this.format({ id: 'activity.other' }),
                field: {
                  type: 'textarea',
                  props: {
                    placeholder: this.format({
                      id: 'activity.other.placeholder',
                    }),
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    result: true, // 显示结果页
    submit: {
      url: '/api/activity/update.json',
      method: 'post',
      params: {
        ...(this.mode === 'edit'
          ? {
              id: this.props.match.params.id,
            }
          : {}),
      },
    },
    remoteValues: {
      url: '/api/activity/detail.json',
      params: {
        id: this.props.match.params.id,
      },
      converter: ({ data }) => {
        const { activityType, activityLanguage, ...rest } = data;
        if (!activityType && !activityLanguage) {
          // openConfig 字段只在前端感知，处理数据
          return {
            ...rest,
            openConfig: false,
          };
        }
        return data;
      },
    },
  };

  render() {
    return (
      <StepForm
        ref={ref => {
          this.formRef = ref;
        }}
        {...this.config}
      />
    );
  }
}

export default access(ActivityEdit);
