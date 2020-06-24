import React from 'react';
import { CreateForm } from 'sula';
import access from '@/components/access';

class ActivityDetail extends React.Component {
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
    mode: 'view',
    container: {
      type: 'div',
      props: {
        style: {
          maxWidth: 1920,
          margin: '0 auto 72px',
        },
      },
    },
    fields: [
      {
        container: {
          type: 'card',
          props: {
            title: this.format({ id: 'activity.title.basic' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'name',
            label: this.format({ id: 'activity.name' }),
            field: {
              type: 'input',
              props: {
                placeholder: this.format({ id: 'activity.name.placeholder' }),
              },
            },
          },
          {
            name: 'activityMonth',
            label: this.format({ id: 'activity.activityMonth' }),
            field: {
              type: 'rangepicker',
              props: {
                style: { width: 300 },
                picker: 'month',
                format: 'yyyy-MM',
                valueFormat: 'utc',
              },
            },
          },
          {
            name: 'activityTime',
            label: this.format({ id: 'activity.activityTime' }),
            field: {
              type: 'timerangepicker',
              props: {
                style: { width: 300 },
                valueFormat: 'utc',
              },
            },
          },
          {
            fields: [
              {
                name: 'notDisturb',
                label: this.format({ id: 'activity.notDisturb' }),
                field: {
                  type: 'checkboxgroup',
                },
                initialSource: this.weekSource,
              },
            ],
          },
          {
            name: 'repeat',
            label: this.format({ id: 'activity.repeat' }),
            field: {
              type: 'radiogroup',
            },
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
            label: this.format({ id: 'activity.periodTime' }),
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
            initialSource: [
              {
                text: this.format({ id: 'activity.periodTime.source.weekly' }),
                value: 'weekly',
              },
              {
                text: this.format({ id: 'activity.periodTime.source.month' }),
                value: 'month',
              },
            ],
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
            label: this.format({ id: 'activity.times' }),
            field: {
              type: 'select',
              props: {
                mode: 'multiple',
                allowClear: true,
              },
            },
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
      {
        container: {
          type: 'card',
          props: {
            title: this.format({ id: 'activity.title.config' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'group',
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
        container: {
          type: 'card',
          props: {
            title: this.format({ id: 'activity.title.button' }),
          },
        },
        fields: [
          {
            name: 'title',
            label: this.format({ id: 'activity.title' }),
            field: {
              type: 'input',
              props: {
                placeholder: this.format({ id: 'activity.title.placeholder' }),
              },
            },
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
                placeholder: this.format({ id: 'activity.other.placeholder' }),
              },
            },
          },
        ],
      },
    ],
    actionsPosition: 'bottom',
    remoteValues: {
      url: '/api/activity/detail.json',
      params: {
        id: this.props.match.params.id,
      },
    },
  };

  render() {
    return <CreateForm {...this.config} />;
  }
}

export default access(ActivityDetail);
