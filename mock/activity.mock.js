import { Random, mock } from 'mockjs';
import { success, logInfo, parseGetParams } from './utils';

let dataSource = [];
const weekList = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

for (let i = 0; i < 200; i += 1) {
  const repeat = Random.pick(['once', 'repeat']);
  const periodTime =
    repeat === 'repeat' ? Random.pick(['weekly', 'month']) : undefined;
  const times =
    periodTime === 'weekly'
      ? [Random.pick(weekList)]
      : periodTime === 'month'
      ? [Random.pick(['firstWeek', 'secondWeek'])]
      : undefined;
  const openConfig = Random.boolean();
  let activityType;
  let activityLanguage;
  let activityDesc;
  if (openConfig) {
    activityType = Random.pick(['online', 'offline']);
    activityLanguage = Random.pick(['zh-cn', 'en-us']);
    activityDesc = Random.sentence(3, 10);
  }
  const startTime = Random.integer(1598110000000, 1628110000000);

  dataSource.push({
    id: i + '',
    name: Random.name(),
    title: Random.name(),
    creater: Random.cname(),
    createTime: Random.date(),
    notDisturb: [Random.pick(weekList)],
    repeat,
    times,
    periodTime,
    activityType,
    activityLanguage,
    activityDesc,
    title: Random.title(),
    subtitle: Random.title(),
    other: Random.sentence(),
    activityMonth: [Random.date().valueOf(), Random.date().valueOf()],
    activityTime: [startTime, startTime + 1200000],
  });
}

let maxId = 199;

function getPagingData(dataSource, ...options) {
  const [
    { current, pageSize },
    filters = {},
    { order, columnKey } = {},
  ] = options;

  let filteredDataSource = dataSource || [];
  if (Object.keys(filters).length) {
    filteredDataSource = filteredDataSource.filter(row => {
      const isMatched = Object.keys(filters).every(key => {
        const filterValue = filters[key];
        const cellValue = row[key];
        if (filterValue === null) {
          return true;
        }
        if (Array.isArray(filterValue)) {
          if (filterValue.length === 0) {
            return true;
          }
          if (typeof cellValue === 'string') {
            return cellValue.includes(filterValue);
          }
          return true;
        }
        if (typeof cellValue === 'number' || typeof cellValue === 'boolean') {
          return filterValue === cellValue;
        }
        if (typeof cellValue !== 'number' && !cellValue) {
          return true;
        }

        return cellValue.includes(filterValue);
      });

      return isMatched;
    });
  }

  if (order) {
    filteredDataSource.sort((a, b) => {
      return order === 'ascend'
        ? a[columnKey] - b[columnKey]
        : b[columnKey] - a[columnKey];
    });
  }

  const pageData = [];
  const start = (current - 1) * pageSize;
  let end = current * pageSize;

  if (end > filteredDataSource.length) {
    end = filteredDataSource.length;
  }
  for (let i = start; i < end; i += 1) {
    pageData.push(filteredDataSource[i]);
  }

  return { pageData, length: filteredDataSource.length };
}

mock('/api/activity/update.json', 'post', req => {
  const body = JSON.parse(req.body);
  if (body.id) {
    const index = dataSource.findIndex(ele => ele.id === body.id);
    dataSource.splice(index, 1);
    maxId += 1;
  }
  dataSource.unshift({
    id: maxId.toString(),
    ...body,
    creater: Random.cname(),
    createTime: Random.date(),
  });
  logInfo(req, success);
  return success;
});

mock('/api/activity/list.json', 'post', req => {
  const { currentPage, size, filters, sorter } = JSON.parse(req.body);

  const { pageData, length } = getPagingData(
    dataSource,
    {
      current: currentPage,
      pageSize: size,
    },
    filters,
    sorter,
  );

  const data = {
    ...success,
    data: {
      pageData,
      currentPage,
      size,
      total: length,
    },
  };
  logInfo(req, data);
  return data;
});

mock('/api/activity/delete.json', 'post', req => {
  let { id: ids } = JSON.parse(req.body);
  ids = Array.isArray(ids) ? ids : [ids];
  dataSource = dataSource.filter(v => !ids.some(id => id === v.id));
  logInfo(req, success);
  return success;
});

mock('/api/activity/copy.json', 'post', req => {
  const { id } = JSON.parse(req.body);
  const data = dataSource.find(v => v.id === id);
  maxId += 1;
  dataSource.unshift({
    ...data,
    id: maxId.toString(),
  });
  logInfo(req, success);
  return success;
});

mock(/\/api\/activity\/detail.json/, req => {
  const { id } = parseGetParams(req.url);
  const data = {
    ...success,
    data: dataSource.find(v => v.id === id),
  };
  logInfo(req, success);
  return data;
});
