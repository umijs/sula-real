export const success = {
  success: true,
  code: 200,
  message: 'success',
  description: 'success',
};

export function logInfo(req, data) {
  const { url, type, body } = req;
  const jsonBody = JSON.parse(body);

  console.log(
    `%c request: %c ${type} ${url}`,
    'color:#f80;font-weight:bold;',
    'color:#f00;',
  );
  console.log('%c params:', 'color:#f80;font-weight:bold;', jsonBody);
  console.log('%c response:', 'color:#f80;font-weight:bold;', data);
  console.log('');
}

export function parseGetParams(data) {
  const search = data.split('?')[1];
  const searchList = search.split('&');
  const res = {};
  searchList.forEach(v => {
    const [key, value] = v.split('=');
    res[key] = value;
  });
  return res;
}

export function statusFilter(status, dataSource) {
  switch (status) {
    case 'grayscale':
      return dataSource.filter(
        item => item.status === 'G'
      );
    case 'publish':
      return dataSource.filter(
        item => item.status === 'R' || item.status === 'O'
      );
    case 'noPublish':
    default:
      return dataSource.filter(
        item => item.status === 'A' || item.status === 'D' || item.status === 'W',
      );
  }
}

export function getPagingData(dataSource, ...options) {
  const [
    { current, pageSize },
    filters = {},
    { order, columnKey } = {},
    nopag,
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
            return filterValue.includes(cellValue);
          }
          return true;
        }
        if (typeof cellValue === 'number' || typeof cellValue === 'boolean') {
          return filterValue === cellValue;
        }
        if (typeof cellValue !== 'number' && !cellValue) {
          return true;
        }

        if (key === 'id') {
          return cellValue.includes(filterValue);
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

  if (nopag) {
    return {
      ...success,
      data: dataSource.slice(0, 20),
    };
  }

  return {
    ...success,
    data: {
      list: pageData,
      total: filteredDataSource.length,
      pageSize,
      current,
    },
  };
}

export const getManageData = (body, dataSource, nopag) => {
  const { filters, pageSize, current, sorter } =
    typeof body === 'string' ? JSON.parse(body) : body;
  return getPagingData(
    dataSource,
    { current, pageSize },
    filters,
    sorter,
    nopag,
  );
};
