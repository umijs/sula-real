import menu from './en-US/menu';
import event from './en-US/event';
import activity from './en-US/activity';
import flow from './en-US/flow';
import release from './en-US/release';

export default {
  view: 'View',
  edit: 'Edit',
  create: 'Create',
  audit: 'Audit',
  'audit.confirm': 'Are you sure to audit?',
  delete: 'Delete',
  'delete.confirm': 'Are you sure to delete?',
  back: 'Back',
  copy: 'Copy',
  refresh: 'Refresh',
  uploadIcon: 'Upload Icon',

  ...menu,
  ...event,
  ...activity,
  ...flow,
  ...release,
};
