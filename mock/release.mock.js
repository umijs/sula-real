import { Random, mock } from 'mockjs';
import { getManageData, logInfo, statusFilter, success } from './utils';

let dataSource = [];
let idMax = 0; // 创建所用id
const statusList = ['D', 'A', 'G', 'R', 'O', 'W'];
const principalList = [
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
];

const versionUpdateList = [
  {
    value: 'manual',
    text: '手动',
  },
  {
    value: 'automatic',
    text: '自动',
  },
];

for (let i = 0; i < 66; i += 1) {
  const status = Random.pick(statusList);
  let grayScaleList = {};
  if (status !== 'D' && status !== 'A') {
    grayScaleList = { grayScale: Random.integer(20, 99) };
  }

  idMax += 1;
  dataSource.push({
    id: i + '',
    iterateId: `S9${Random.integer(265410, 486599)}`,
    iterateName: Random.word(6, 9),
    principal: Random.pick(principalList.map((c) => c.value)),
    createTime: Random.datetime(),
    estimatetime: Random.datetime(),
    operator: Random.name(), // 操作人
    direction: Random.title(3, 6),
    versionUpdate: Random.pick(versionUpdateList.map((c) => c.value)[0]),
    ...grayScaleList, // 灰度比例
    status,
  });
}

// release列表
mock('/api/release/manage.json', 'post', (req) => {
  const { body } = req || {};
  const { status } = JSON.parse(body) || {};
  const dataSourceFilter = statusFilter(status, dataSource);
  const data = getManageData(req.body, dataSourceFilter);
  logInfo(req, data);
  return data || {};
});

// 创建
mock('/api/release/create.json', 'post', (req) => {
  const { body } = req || {};
  const otherBody = JSON.parse(body) || {};
  idMax += 1;
  dataSource.unshift({
    id: idMax + '',
    status: 'D',
    iterateId: `S9${Random.integer(265410, 486599)}`,
    createTime: Random.now(),
    ...otherBody,
  });
  logInfo(req, success);
  return success;
});

// 获取详情
mock('/api/release/detail.json', 'post', (req) => {
  const { body } = req || {};
  const { id } = JSON.parse(body) || {};
  const details = dataSource.filter((c) => c.id === id)[0];
  logInfo(req, details);
  return details;
});

// 编辑提交
mock('/api/release/edit.json', 'post', (req) => {
  const { body } = req || {};
  const params = JSON.parse(body) || {};
  const details = dataSource.filter((c) => c.id === params.id)[0];
  dataSource = dataSource.filter((c) => c.id !== params.id);
  dataSource.unshift({
    ...details,
    ...params,
    createTime: Random.now(),
  });
  logInfo(req, success);
  return success;
});

// 删除
mock('/api/release/delete.json', 'post', (req) => {
  const { id } = JSON.parse(req.body);
  dataSource = dataSource.filter((v) => v.id !== id);
  logInfo(req, success);
  return success;
});

// 提交审核
mock('/api/release/submitReview.json', 'post', (req) => {
  const { id, action } = JSON.parse(req.body);
  const index = dataSource.findIndex((ele) => ele.id === id);
  const dataSourceTem = dataSource[index];
  dataSource = dataSource.filter((c) => c.id !== id);
  dataSource.unshift({
    ...dataSourceTem,
    ...JSON.parse(req.body),
    createTime: Random.now(),
    status: action,
  });
  logInfo(req, success);
  return success;
});

// 发布、下线、回滚
mock('/api/release/publish.json', 'post', (req) => {
  const { id, action } = JSON.parse(req.body);
  const index = dataSource.findIndex((ele) => ele.id === id);
  const dataSourceTem = dataSource[index];
  dataSource = dataSource.filter((c) => c.id !== id);
  dataSource.unshift({
    ...dataSourceTem,
    createTime: Random.now(),
    status: action,
  });
  logInfo(req, success);
  return success;
});

// 批量发布、批量回滚
mock('/api/release/batchPublish.json', 'post', (req) => {
  const { id = [], action } = JSON.parse(req.body);
  const indexList = [];
  id.length > 0 &&
    id.forEach((c) => {
      let indexTem = dataSource.findIndex((ele) => ele.id === c);
      if (indexTem !== -1) {
        indexList.push({
          id: c,
          index: indexTem,
        });
      }
    });
  indexList.length > 0 &&
    indexList.forEach((i) => {
      let dataSourceTem = dataSource[i.index];
      dataSource = dataSource.filter((c) => c.id !== i.id);
      dataSource.unshift({
        ...dataSourceTem,
        createTime: Random.now(),
        status: action,
        id: i.id,
      });
    });
  logInfo(req, success);
  return success;
});

// 修改灰度比例（批量）
mock('/api/release/changeProportion.json', 'post', (req) => {
  const { grayScale, grayscaleList } = JSON.parse(req.body);
  const dataSourceTem = grayscaleList.map((c) => ({
    ...c,
    createTime: Random.now(),
    grayScale,
  }));
  grayscaleList.forEach((i) => {
    dataSource = dataSource.filter((c) => {
      return c.id !== i.id;
    });
  });
  dataSource = [...dataSourceTem, ...dataSource];
  logInfo(req, success);
  return success;
});

// 审核通过、拒绝
mock('/api/release/audit.json', 'post', (req) => {
  const { id, action, ...otherParams } = JSON.parse(req.body);
  const index = dataSource.findIndex((ele) => ele.id === id);
  const dataSourceTem = dataSource[index];
  dataSource = dataSource.filter((c) => c.id !== id);
  dataSource.unshift({
    ...dataSourceTem,
    ...otherParams,
    createTime: Random.now(),
    status: action,
  });
  logInfo(req, success);
  return success;
});

// 灰度发布
mock('/api/release/grayScaleRelease.json', 'post', (req) => {
  const { id, grayScale, action } = JSON.parse(req.body);
  const index = dataSource.findIndex((ele) => ele.id === id);
  const dataSourceTem = dataSource[index];
  dataSource = dataSource.filter((c) => c.id !== id);
  dataSource.unshift({
    ...dataSourceTem,
    createTime: Random.now(),
    status: action,
    grayScale,
  });
  logInfo(req, success);
  return success;
});

// 批量删除
mock('/api/release/batchDelete.json', 'post', (req) => {
  const { id } = JSON.parse(req.body);
  id.length > 0 &&
    id.forEach((c) => {
      dataSource = dataSource.filter((i) => i.id !== c);
    });
  logInfo(req, success);
  return success;
});
