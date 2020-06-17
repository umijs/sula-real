import React from 'react';
import { QueryTable, request } from 'sula';
import {
  InboxOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { Switch, Typography, Modal, Upload, message } from 'antd';
import access from '@/components/access';

const { Text } = Typography;
const { Dragger } = Upload;

class Event extends React.Component {
  state = {
    visible: false,
    fieldsList: [],
    confirmLoading: false,
  };

  format = this.props.formatMessage;

  refs = React.createRef(null);

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
      fieldsList: [],
    });
  };

  uplodaChange = info => {
    const { status } = info.file;
    if (status === 'done') {
      const uuidsList = info.fileList.map(file => file.response);
      this.setState({
        fieldsList: uuidsList,
      });
    } else if (status === 'error') {
      message.error(
        `${info.file.name} ${this.format({ id: 'event.upload.error' })}`,
      );
    }
  };

  uploadFields = async () => {
    const { fieldsList } = this.state;
    await this.setState({
      confirmLoading: true,
    });
    try {
      const res = await request({
        url: '/api/event/uploaduuids.json',
        method: 'post',
        params: {
          fields: fieldsList,
        },
        successMessage: true,
      });
      if (res) {
        this.closeModal();
        this.setState(
          {
            confirmLoading: false,
          },
          () => {
            this.refs.tableRef.current.refreshTable();
          },
        );
      }
    } catch (e) {
      this.setState({
        confirmLoading: false,
      });
    }
  };

  getModalConfig = mode => {
    return {
      type: 'modalform',
      title: this.format({ id: `${mode === 'edit' ? 'edit' : 'create'}` }),
      mode,
      fields: [
        {
          name: 'name',
          label: this.format({ id: 'event.name' }),
          field: {
            type: 'input',
            props: {
              placeholder: this.format({ id: 'event.name.placeholder' }),
            },
          },
          rules: [
            {
              required: true,
              message: this.format({ id: 'event.name.required' }),
            },
          ],
        },
        {
          name: 'level',
          label: this.format({ id: 'event.level' }),
          field: {
            type: 'select',
            props: {
              placeholder: this.format({ id: 'event.level.placeholder' }),
            },
          },
          initialSource: [
            {
              text: this.format({ id: 'event.level.source.high' }),
              value: 'High',
            },
            {
              text: this.format({ id: 'event.level.source.medium' }),
              value: 'Medium',
            },
            {
              text: this.format({ id: 'event.level.source.low' }),
              value: 'Low',
            },
          ],
          initialValue: 'Low',
          rules: [
            {
              required: true,
              message: this.format({ id: 'event.level.required' }),
            },
          ],
        },
        {
          name: 'description',
          label: this.format({ id: 'event.description' }),
          field: {
            type: 'textarea',
            props: {
              placeholder: this.format({ id: 'event.description.placeholder' }),
            },
          },
        },
      ],
      submit: {
        url: `/api/event/${mode === 'edit' ? 'update' : 'add'}.json`,
        method: 'POST',
        params: {
          ...(mode === 'edit'
            ? {
                id: '#{record.id}',
              }
            : {}),
        },
      },
      remoteValues: {
        url: '/api/event/detail.json',
        params: {
          id: '#{record.id}',
          domain: 'REAL',
        },
      },
    };
  };

  config = {
    layout: 'vertical',
    rowKey: 'id',
    columns: [
      {
        key: 'name',
        title: this.format({ id: 'event.name' }),
        render: {
          type: 'link',
          props: {
            children: '#{record.name}',
            href: '#/event/view/#{record.id}',
          },
        },
      },
      {
        key: 'level',
        title: this.format({ id: 'event.level' }),
        render: {
          type: 'tag',
          funcProps: ctx => {
            const { text } = ctx;
            if (text === 'High') {
              return {
                color: 'error',
                icon: <CaretUpOutlined style={{ margin: '0 -3px' }} />,
                children: this.format({ id: 'event.level.source.high' }),
              };
            }
            if (text === 'Medium') {
              return {
                color: 'success',
                children: this.format({ id: 'event.level.source.medium' }),
              };
            }
            if (text === 'Low') {
              return {
                color: 'warning',
                icon: <CaretDownOutlined style={{ margin: '0 -3px' }} />,
                children: this.format({ id: 'event.level.source.low' }),
              };
            }
          },
        },
      },
      {
        key: 'status',
        title: this.format({ id: 'event.status' }),
        render: {
          type: 'badge',
          props: {
            text: '#{record.status}',
          },
          funcProps: ctx => {
            const { text } = ctx;
            if (text === 'D') {
              return {
                status: 'processing',
                text: this.format({ id: 'event.status.processing' }),
              };
            }
            if (text === 'S') {
              return {
                status: 'success',
                text: this.format({ id: 'event.status.success' }),
              };
            }
            if (text === 'E') {
              return {
                status: 'error',
                text: this.format({ id: 'event.status.error' }),
              };
            }
            return {
              status: 'default',
              text: this.format({ id: 'event.status.default' }),
            };
          },
        },
      },
      {
        key: 'running',
        title: this.format({ id: 'event.running' }),
        render: ctx => {
          return <Switch checked={ctx.text} disabled />;
        },
      },
      {
        key: 'modifier',
        title: this.format({ id: 'event.modifier' }),
        render: ctx => {
          return (
            <div>
              <div>{ctx.text}</div>
              <Text style={{ fontSize: 12 }} type="secondary">
                {ctx.record.modifyTime}
              </Text>
            </div>
          );
        },
      },
      {
        key: 'operator',
        title: this.format({ id: 'event.operator' }),
        width: 260,
        render: [
          {
            type: 'link',
            props: {
              children: this.format({ id: 'edit' }),
            },
            disabled: '#{record.running}',
            action: [this.getModalConfig('edit'), 'refreshtable'],
          },
          {
            type: 'link',
            props: {
              children: this.format({ id: 'event.run' }),
            },
            disabled: '#{record.status !== "W"}',
            confirm: this.format({ id: 'event.run.confirm' }),
            action: [
              {
                url: '/api/event/run.json',
                method: 'POST',
                params: {
                  id: '#{record.id}',
                },
              },
              ,
              'refreshtable',
            ],
          },
          {
            type: 'link',
            props: {
              children: this.format({ id: 'delete' }),
            },
            visible: this.props.currentUser === 'admin', // 只有admin可删除
            confirm: this.format({ id: 'delete.confirm' }),
            disabled: '#{record.running && record.status === "S"}',
            action: [
              {
                url: '/api/event/delete.json',
                method: 'POST',
                params: {
                  id: '#{record.id}',
                },
              },
              'refreshtable',
            ],
          },
        ],
      },
    ],
    fields: [
      {
        name: 'name',
        label: this.format({ id: 'event.name' }),
        field: {
          type: 'input',
          props: {
            placeholder: this.format({ id: 'event.name.placeholder' }),
          },
        },
      },
      {
        name: 'modifier',
        label: this.format({ id: 'event.modifier' }),
        field: {
          type: 'select',
          props: {
            placeholder: this.format({ id: 'event.modifier.placeholder' }),
            showSearch: true,
            allowClear: true,
          },
        },
        remoteSource: {
          url: '/api/event/modifierList.json',
          converter: ({ data }) => {
            return data.map(v => ({ text: v, value: v }));
          },
        },
      },
      {
        name: 'status',
        label: this.format({ id: 'event.status' }),
        field: {
          type: 'select',
          props: {
            placeholder: this.format({ id: 'event.status.placeholder' }),
            mode: 'multiple',
            allowClear: true,
          },
        },
        remoteSource: {
          url: '/api/event/statusList.json',
        },
      },
    ],
    rowSelection: {},
    actionsRender: [
      {
        type: 'button',
        props: {
          children: this.format({ id: 'event.upload' }),
          type: 'primary',
          icon: 'upload',
        },
        action: this.showModal,
      },
      {
        type: 'button',
        disabled: ctx => {
          const selectedRows = ctx.table.getSelectedRowKeys() || [];
          return !selectedRows.length;
        },
        props: {
          children: this.format({ id: 'event.download' }),
          type: 'primary',
          icon: 'download',
        },
        action: ctx => {
          const selectedRows = ctx.table.getSelectedRowKeys() || [];
          return request({
            url: '/api/event/download.json',
            method: 'POST',
            params: {
              rowKeys: selectedRows,
            },
            successMessage: true,
          }).then(url => {
            download(url, 'sula');
            ctx.table.clearRowSelection();
          });
        },
      },
      {
        type: 'button',
        props: {
          children: this.format({ id: 'create' }),
          type: 'primary',
          icon: 'create',
        },
        action: [this.getModalConfig('create'), 'refreshtable'],
      },
    ],
    remoteDataSource: {
      url: '/api/event/manage.json',
      method: 'POST',
    },
  };

  render() {
    const { visible, confirmLoading } = this.state;

    return (
      <div>
        <QueryTable
          ref={ref => {
            this.refs = ref;
          }}
          {...this.config}
        />
        <Modal
          visible={visible}
          closable={false}
          okText={this.format({ id: 'event.upload' })}
          onOk={this.uploadFields}
          onCancel={this.closeModal}
          confirmLoading={confirmLoading}
          destroyOnClose
        >
          <Dragger action="/api/event/upload.json" onChange={this.uplodaChange}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {this.format({ id: 'event.upload.text' })}
            </p>
            <p className="ant-upload-hint">
              {this.format({ id: 'event.upload.hint' })}
            </p>
          </Dragger>
        </Modal>
      </div>
    );
  }
}

function download(content, fileName) {
  const downloadNode = document.createElement('a');
  downloadNode.setAttribute('download', fileName);
  const blob = new Blob([content]);
  downloadNode.setAttribute('href', URL.createObjectURL(blob));
  downloadNode.setAttribute('style', 'display: none');
  document.body.appendChild(downloadNode);
  downloadNode.click();
  document.body.removeChild(downloadNode);
}

export default access(Event);
