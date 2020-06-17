import menu from './zh-CN/menu';
import event from './zh-CN/event';
import activity from './zh-CN/activity';
import flow from './zh-CN/flow';
import release from './zh-CN/release';

export default {
  view: '查看',
  edit: '编辑',
  create: '新建',
  audit: '审核',
  'audit.confirm': '确认提交审核吗？',
  delete: '删除',
  'delete.confirm': '确认删除吗？',
  back: '返回',
  copy: '复制',
  refresh: '刷新',
  uploadIcon: '上传图标',

  ...menu,
  ...event,
  ...activity,
  ...flow,
  ...release,
};
