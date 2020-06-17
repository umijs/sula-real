import { mock } from 'mockjs';
import { success, logInfo } from './utils';

mock('/api/charts/list.json', 'post', req => {
  const data = {
    ...success,
    data: {
      commits: {
        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        list: [
          {
            name: 'Michelle',
            dataSource: [5, 8, 12, 7, 2, 1, 6],
          },
          {
            name: 'Jackson',
            dataSource: [1, 3, 5, 3, 4, 2, 8],
          },
          {
            name: 'Taylor',
            dataSource: [4, 7, 5, 3, 3, 6, 1],
          },
        ],
      },
      commitLines: {
        xAxisData: [
          '2020-01',
          '2020-02',
          '2020-03',
          '2020-04',
          '2020-05',
          '2020-06',
          '2020-07',
          '2020-08',
          '2020-09',
        ],
        list: [
          {
            name: 'Young',
            dataSource: [
              15424,
              13135,
              12534,
              16056,
              12423,
              16022,
              8234,
              7754,
              9982,
            ],
          },
          {
            name: 'David',
            dataSource: [
              7348,
              18345,
              11551,
              7351,
              15485,
              7355,
              4223,
              5788,
              8624,
            ],
          },
          {
            name: 'Clark',
            dataSource: [
              9441,
              7552,
              8638,
              6357,
              11324,
              10353,
              12200,
              9943,
              5601,
            ],
          },
        ],
        progress: [
          {
            name: 'Young',
            value: 80,
          },
          {
            name: 'David',
            value: 60,
          },
          {
            name: 'Clark',
            value: 40,
          },
        ],
      },
      statis: {
        download: {
          data: [
            190,
            254,
            325,
            543,
            312,
            546,
            763,
            409,
            345,
            325,
            543,
            321,
            746,
            763,
          ],
          count: 14231,
        },
        active: {
          data: [
            290,
            325,
            746,
            543,
            345,
            321,
            673,
            543,
            231,
            290,
            345,
            786,
            325,
            763,
          ],
          count: 999,
        },
        commit: {
          data: [
            190,
            345,
            249,
            543,
            225,
            321,
            290,
            321,
            746,
            345,
            746,
            325,
            543,
            663,
          ],
          count: 58,
        },
      },
    },
  };
  logInfo(req, data);
  return data;
});

mock('/api/charts/pie.json', 'post', req => {
  const data = {
    ...success,
    data: [
      {
        name: 'Paum',
        value: 5600,
      },
      {
        name: 'Helen',
        value: 3600,
      },
      {
        name: 'Amy',
        value: 1500,
      },
      {
        name: 'Frank',
        value: 2000,
      },
      {
        name: 'Linda',
        value: 899,
      },
    ],
  };
  logInfo(req, data);
  return data;
});

mock('/api/charts/radar.json', 'post', req => {
  const data = {
    ...success,
    data: [
      {
        name: 'Davis',
        value: [6, 2, 7, 8, 10, 9],
      },
      {
        name: 'Wilson',
        value: [7, 8, 3, 6, 7, 10],
      },
      {
        name: 'Clark',
        value: [4, 10, 7, 5, 8, 6],
      },
      {
        name: 'Melen',
        value: [3, 7, 9, 2, 5, 1],
      },
    ],
  };
  logInfo(req, data);
  return data;
});

mock('/api/charts/map.json', 'post', req => {
  const data = {
    ...success,
    data: [
      { name: '西湖区', value: 19 },
      { name: '下城区', value: 3 },
      { name: '上城区', value: 9 },
      { name: '余杭区', value: 10 },
      { name: '拱墅区', value: 7 },
      { name: '滨江区', value: 5 },
      { name: '江干区', value: 15 },
      { name: '萧山区', value: 6 },
      { name: '富阳区', value: 15 },
      { name: '临安区', value: 4 },
      { name: '建德市', value: 2 },
      { name: '桐庐县', value: 1 },
      { name: '淳安县', value: 1 },
    ],
  };
  logInfo(req, data);
  return data;
});
