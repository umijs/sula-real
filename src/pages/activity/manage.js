import React from 'react';
import { QueryTable } from 'sula';
import access from '@/components/access';
import { parse } from 'querystring';
import { history } from 'umi';

class ActivityManage extends React.Component {
  state = {
    init: false,
    key: false,
    hashChange: true,
  };

  format = this.props.formatMessage;

  componentDidMount() {
    this.setState({
      init: true,
    });

    this.listenHistory();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  unlisten = () => {
    window.removeEventListener('hashchange', this.onHistoryChange);
  };

  setPaging = data => {
    const { pageSize, current, columnKey, order, ...restParams } = data;

    this.table.setFilters(restParams);
    this.table.setPagination({
      current: Number(current),
      pageSize: Number(pageSize),
    });
    this.table.setSorter({ order, columnKey });
  };

  onHistoryChange = event => {
    const { newURL } = event;

    // 同步视图 table内部状态 url更新
    const search = newURL.split('?')[1];
    this.setPaging(parse(search));

    this.setState(
      {
        init: false,
        key: !this.state.key,
        hashChange: true,
      },
      () => {
        this.setState({
          hashChange: false,
        });
      },
    );
  };

  listenHistory = () => {
    window.addEventListener('hashchange', this.onHistoryChange);
  };

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
          max: 2,
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
      convertParams: ({ params, table }) => {
        this.unlisten();
        const { init } = this.state;
        let urlParams = {};
        this.table = table;
        if (!init) {
          // 任意url跳转到该页面时，拼接参数到url
          const { search } = history.location;
          if (search) {
            history.push(search);
            urlParams = parse(search.slice(1));

            const {
              pageSize,
              current,
              columnKey,
              order,
              ...restParams
            } = urlParams;

            urlParams = {
              pageSize,
              current,
              sorter: {
                columnKey,
                order,
              },
              filters: restParams,
            };

            // 如果是hash变化，则从hash里拿参数
            const finalParams = this.state.hashChange
              ? Object.assign({}, params, urlParams)
              : Object.assign({}, urlParams, params);

            if (!this.state.hashChange) {
              addParamsToPath(finalParams);
            }

            // 后台数据不统一，处理数据
            const {
              current: finalCurrent,
              pageSize: finalPageSize,
              ...restFinalParams
            } = finalParams;

            this.setPaging({
              current: finalCurrent,
              pageSize: finalPageSize,
              ...finalParams.sorter,
              ...finalParams.filters,
            });

            return {
              currentPage: finalCurrent,
              size: finalPageSize,
              ...restFinalParams,
            };
          }
        }

        addParamsToPath(params);

        // 后台数据不统一，处理数据
        const {
          current: finalCurrent,
          pageSize: finalPageSize,
          ...restFinalParams
        } = params;

        return {
          currentPage: finalCurrent,
          size: finalPageSize,
          ...restFinalParams,
        };
      },
      converter: ({ data }) => {
        const { pageData, currentPage, size, total } = data;
        this.unlisten();
        this.listenHistory();
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
    return <QueryTable {...this.config} key={this.state.key} />;
  }
}

export default access(ActivityManage);

function addParamsToPath(params) {
  const { current, pageSize, sorter, filters = {} } = params;
  const { order, columnKey } = sorter || {};

  let paramsList = [
    { key: 'current', value: current },
    { key: 'pageSize', value: pageSize },
    { key: 'columnKey', value: columnKey },
    { key: 'order', value: order },
  ];

  Object.keys(filters).forEach(key => {
    paramsList.push({
      key,
      value: filters[key],
    });
  });

  paramsList = paramsList.filter(
    ele => ele.value !== undefined && ele.value !== null,
  );

  const searchList = paramsList.map(({ key, value }) => `${key}=${value}`);

  const search = '?' + searchList.join('&');
  history.push(search);
}
