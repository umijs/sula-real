import { mock } from 'mockjs';
import { success, logInfo } from './utils';

mock('/api/login.json', 'post', req => {
  const { username, password } = JSON.parse(req.body);

  let data = { ...success };
  if (password !== 'sula') {
    data.message = '账号或密码错误';
    data.success = false;
    data.data = false;
    localStorage.setItem('currentUser', 'none');
  } else if (password === 'sula' && username === 'admin') {
    data.message = '登录成功';
    data.data = 'admin';
    localStorage.setItem('currentUser', 'admin');
  } else {
    data.message = '登录成功';
    data.data = 'user';
    localStorage.setItem('currentUser', 'user');
  }

  logInfo(req, data);
  return data;
});

mock('/api/current.json', 'post', req => {
  const data = {
    ...success,
    data: localStorage.getItem('currentUser'),
  };
  logInfo(req, data);
  return data;
});

mock('/api/logout.json', 'post', req => {
  localStorage.setItem('currentUser', 'none');
  const data = {
    ...success,
    message: '退出登录',
  };
  logInfo(req, data);
  return data;
});
