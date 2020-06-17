import { Random, mock } from 'mockjs';
import { getManageData, success, logInfo, parseGetParams } from './utils';

const categoryList = [
  {
    text: '位置',
    value: 'position',
    children: [
      {
        text: '开始',
        value: 'start',
      },
      {
        text: '结束',
        value: 'end',
      },
    ],
  },
  {
    text: '流程',
    value: 'flow',
    children: [{ text: '流程', value: 'flow' }],
  },
  {
    text: '判定',
    value: 'judge',
    children: [
      {
        text: '成功',
        value: true,
      },
      { text: '失败', value: false },
    ],
  },
  {
    text: '描述',
    value: 'desc',
    children: [
      {
        text: '描述',
        value: 'desc',
      },
    ],
  },
  {
    text: '注释',
    value: 'common',
    children: [
      { text: '单行', value: 'single' },
      { text: '多行', value: 'multiple' },
    ],
  },
];

const levelList = [
  { text: '高级', value: 'high' },
  { text: '中级', value: 'middle' },
  { text: '低级', value: 'low' },
];

const statusList = ['D', 'A', 'G', 'R'];

let dataSource = [];
let maxId = 199;

for (let i = 0; i < 200; i += 1) {
  const category = Random.pick(categoryList.map(v => v.value));
  const modeList = categoryList.find(v => v.value === category).children;
  dataSource.push({
    id: i + '',
    name: Random.word(),
    type: Random.pick(levelList.map(v => v.value)),
    description: Random.sentence(3),
    category,
    mode: Random.pick(modeList.map(v => v.value)),
    level: Random.pick(['middle', 'low']),
    icon: 'https://img.alicdn.com/tfs/TB1SSl7I7L0gK0jSZFxXXXWHVXa-260-260.png',
    submitter: Random.name(),
    submitTime: Random.date(),
    auditor: Random.name(),
    auditTime: Random.date(),
    status: Random.pick(statusList),
    iconDesc: Random.sentence(3, 10),
  });
}

mock('/api/flow/categoryList.json', req => {
  const list = categoryList.map(({ text, value }) => ({ text, value }));
  const data = {
    ...success,
    data: list,
  };
  logInfo(req, data);
  return data;
});

mock(/\/api\/flow\/modeList.json/, req => {
  const { url } = req;
  const { parent } = parseGetParams(url);
  const list = categoryList.find(v => v.value === parent).children;
  const data = {
    ...success,
    data: list,
  };
  logInfo(req, data);
  return data;
});

mock(/\/api\/flow\/levelList.json/, req => {
  const { parent } = parseGetParams(req.url);
  const data = {
    ...success,
    data: parent === 'true' ? levelList : levelList.slice(1),
  };
  logInfo(req, data);
  return data;
});

mock(/\/api\/flow\/detail.json/, req => {
  const { id } = parseGetParams(req.url);
  const data = {
    ...success,
    data: dataSource.find(v => v.id === id),
  };
  logInfo(req, data);
  return data;
});

mock('/api/flow/manage.json', 'post', req => {
  const data = getManageData(req.body, dataSource);
  logInfo(req, data);
  return data;
});

mock('/api/flow/delete.json', 'post', req => {
  const { id } = JSON.parse(req.body);
  dataSource = dataSource.filter(v => v.id !== id);
  logInfo(req, success);
  return success;
});

mock('/api/flow/updateStatus.json', 'post', req => {
  const { action, id } = JSON.parse(req.body);
  const index = dataSource.findIndex(ele => ele.id === id);
  dataSource.unshift({
    ...dataSource[index],
    status: action,
    id,
  });
  dataSource.splice(index + 1, 1);
  logInfo(req, success);
  return success;
});

mock('/api/flow/update.json', 'post', req => {
  const body = JSON.parse(req.body);
  if (body.id) {
    const index = dataSource.findIndex(ele => ele.id === body.id);
    dataSource.splice(index, 1);
    maxId += 1;
  }
  dataSource.unshift({
    id: maxId.toString(),
    ...body,
    submitter: Random.name(),
    submitTime: Random.date(),
    auditor: Random.name(),
    auditTime: Random.date(),
    status: 'D',
  });
  logInfo(req, success);
  return success;
});
