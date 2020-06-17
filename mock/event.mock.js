import { Random, mock } from 'mockjs';
import moment from 'moment';
import { getManageData, success, parseGetParams, logInfo } from './utils';

const status = ['D', 'S', 'W', 'E'];
const level = ['High', 'Medium', 'Low'];
const statusList = [
  { text: '进行中', value: 'D' },
  { text: '成功', value: 'S' },
  { text: '异常', value: 'E' },
  { text: '默认状态', value: 'W' },
];

let dataSource = [];
let maxId = 199;

for (let i = 0; i < 200; i += 1) {
  dataSource.push({
    id: i + '',
    name: `事件${i}`,
    level: Random.pick(level),
    status: Random.pick(status),
    running: Random.boolean(),
    modifier: Random.name(),
    creater: Random.name(),
    modifyTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    description: Random.sentence(3, 4),
  });
}

const modifierList = [...new Set(dataSource.map(ele => ele.modifier))];

mock('/api/event/manage.json', req => {
  const data = getManageData(req.body, dataSource);
  logInfo(req, data);
  return data;
});

mock('/api/event/add.json', 'post', req => {
  const body = JSON.parse(req.body);
  maxId += 1;
  dataSource.unshift({
    id: maxId.toString(),
    ...body,
    status: 'W',
    running: false,
    modifier: Random.name(),
    creater: Random.name(),
    modifyTime: moment().format('yyyy-MM-DD HH:mm:ss'),
  });
  logInfo(req, success);
  return success;
});

mock('/api/event/update.json', 'post', req => {
  const body = JSON.parse(req.body);
  const index = dataSource.findIndex(ele => ele.id === body.id);
  dataSource.unshift({
    ...body,
    status: 'W',
    running: false,
    modifier: Random.name(),
    creater: Random.name(),
    modifyTime: moment().format('yyyy-MM-DD HH:mm:ss'),
  });
  dataSource.splice(index + 1, 1);
  logInfo(req, success);
  return success;
});

mock(/\/api\/event\/detail.json/, req => {
  const { id } = parseGetParams(req.url);
  const data = {
    ...success,
    data: dataSource.find(ele => ele.id === id),
  };
  logInfo(req, data);
  return data;
});

mock('/api/event/delete.json', 'post', req => {
  const body = JSON.parse(req.body);
  dataSource = dataSource.filter(ele => ele.id !== body.id);
  logInfo(req, success);
  return success;
});

mock('/api/event/run.json', 'post', req => {
  const body = JSON.parse(req.body);
  const index = dataSource.findIndex(ele => ele.id === body.id);
  dataSource.unshift({
    ...dataSource[index],
    status: 'D',
  });
  dataSource.splice(index + 1, 1);
  logInfo(req, success);
  return success;
});

mock('/api/event/online.json', 'post', req => {
  const body = JSON.parse(req.body);
  const index = dataSource.findIndex(ele => ele.id === body.id);
  dataSource.unshift({
    ...dataSource[index],
    running: true,
    status: 'S',
  });
  dataSource.splice(index + 1, 1);
  logInfo(req, success);
  return success;
});

mock('/api/event/upload.json', 'post', req => {
  const data = Random.uuid();
  return data;
});

mock('/api/event/uploaduuids.json', 'post', req => {
  const body = JSON.parse(req.body);
  const { fields } = body;
  fields.forEach(field => {
    maxId += 1;
    dataSource.unshift({
      id: maxId.toString(),
      name: field.slice(0, 5),
      level: 'Medium',
      status: 'D',
      running: false,
      modifier: Random.name(),
      creater: Random.name(),
      modifyTime: moment().format('yyyy-MM-DD HH:mm:ss'),
      description: Random.sentence(3, 4),
    });
  });

  logInfo(req, success);
  return success;
});

mock('/api/event/statusList.json', req => {
  const data = {
    ...success,
    data: statusList,
  };
  logInfo(req, data);
  return data;
});

mock('/api/event/modifierList.json', req => {
  const data = {
    ...success,
    data: modifierList,
  };
  logInfo(req, data);
  return data;
});

mock('/api/event/download.json', 'post', req => {
  const { rowKeys } = JSON.parse(req.body);
  const data = {
    ...success,
    message: '下载成功',
    data: `sulajs
github: https://github.com/umijs/sula

selected id: ${rowKeys.join(' ')}`,
  };
  logInfo(req, data);
  return data;
});

mock(/\/api\/event\/history.json/, req => {
  const { list } = mock({
    'list|1-5': [
      {
        'id|+1': 1,
        modifier: '@name',
        modifyTime: '@date',
        operator: Random.pick(['online', 'offline']),
      },
    ],
  });

  const data = {
    ...success,
    data: list,
  };

  logInfo(req, data);
  return data;
});
