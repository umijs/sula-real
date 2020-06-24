import * as sula from 'sula';
import Dropdown from '@/components/dropdown';
import TimeRangePicker from '@/components/timerangepicker';
import StatusRender from '@/components/statusRender';
import OperationGroup from '@/components/operationGroup';

// sula里还有其他类型插件注册函数
// console.log(sula)
const { registerRenderPlugin, registerFieldPlugin, registerPlugin } = sula;

/** render插件 */
registerRenderPlugin('dropdown')(Dropdown, true);

registerRenderPlugin('statusRender')(StatusRender, true);

registerRenderPlugin('operationgroup')(OperationGroup, true);

/** field插件 */
registerFieldPlugin('timerangepicker')(TimeRangePicker);

/** convertParams */
// registerPlugin('convertParams', 'addIdToParams', ctx => {
//   // convertParams插件，params: {id: xxx} json化
//   const { params } = ctx;
//   const { hash } = window.location;
//   const id = hash.split('/').reverse()[0];
//   return {
//     ...params,
//     id,
//   };
// });
