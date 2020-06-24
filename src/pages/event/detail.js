import React from 'react';
import { Form, Table } from 'sula';
import { Card, Button, Spin } from 'antd';
import { history } from 'umi';
import access from '@/components/access';

class EventDetail extends React.Component {
  state = {
    key: 'basic',
    loading: false,
  };

  format = this.props.formatMessage;

  setLoading = (loading) => {
    this.setState({
      loading,
    });
  };

  id = this.props.match.params.id;

  config = {
    mode: 'view',
    itemLayout: {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 8,
      },
    },
    fields: [
      {
        name: 'name',
        label: this.format({ id: 'event.name' }),
        field: 'input',
      },
      {
        name: 'level',
        label: this.format({ id: 'event.level' }),
        field: 'input',
      },
      {
        name: 'status',
        label: this.format({ id: 'event.status' }),
        field: 'select',
        remoteSource: {
          url: '/api/event/statusList.json',
        },
      },
      {
        name: 'running',
        label: this.format({ id: 'event.running' }),
        field: 'switch',
        valuePropName: 'checked',
      },
      {
        name: 'description',
        label: this.format({ id: 'event.description' }),
        field: 'textarea',
      },
    ],
    remoteValues: {
      url: '/api/event/detail.json',
      params: {
        id: this.id,
      },
    },
    onRemoteValuesStart: () => {
      this.setLoading(true);
    },
    onRemoteValuesEnd: () => {
      this.setLoading(false);
    },
  };

  onTabChange = (key) => {
    this.setState({ key });
  };

  contentList = {
    basic: <Form {...this.config} />,
    history: (
      <Table
        rowKey="id"
        size="small"
        columns={[
          {
            key: 'modifier',
            title: this.format({ id: 'event.modifier' }),
          },
          {
            key: 'modifyTime',
            title: this.format({ id: 'event.modifyTime' }),
          },
          {
            key: 'operator',
            title: this.format({ id: 'event.operator' }),
            render: {
              type: 'tag',
              props: {
                color: '#{text === "online" ? "success" : "error"}',
              },
              funcProps: {
                children: (ctx) => {
                  return this.format({
                    id:
                      ctx.text === 'online'
                        ? 'event.running.online'
                        : 'event.running.offline',
                  });
                },
              },
            },
          },
        ]}
        remoteDataSource={{
          url: '/api/event/history.json',
          params: {
            id: this.id,
          },
        }}
        initialPaging={{
          pagination: false,
        }}
      />
    ),
  };

  tabListNoTitle = [
    {
      key: 'basic',
      tab: this.format({ id: 'event.title.basic' }),
    },
    {
      key: 'history',
      tab: this.format({ id: 'event.title.history' }),
    },
  ];

  render() {
    return (
      <Card
        tabList={this.tabListNoTitle}
        activeTabKey={this.state.key}
        tabBarExtraContent={
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            {this.format({ id: 'back' })}
          </Button>
        }
        onTabChange={(key) => {
          this.onTabChange(key);
        }}
      >
        <Spin spinning={this.state.loading}>
          {Object.keys(this.contentList).map((key) => (
            <div
              key={key}
              style={{ display: key === this.state.key ? '' : 'none' }}
            >
              {this.contentList[key]}
            </div>
          ))}
        </Spin>
      </Card>
    );
  }
}

export default access(EventDetail);
