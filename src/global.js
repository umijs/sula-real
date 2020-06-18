import { Icon } from 'sula';
import {
  LoadingOutlined,
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  CopyOutlined,
  RedoOutlined,
  LogoutOutlined,
  CloudUploadOutlined,
  LinkOutlined,
  RocketOutlined,
  LeftSquareOutlined,
  AuditOutlined,
  CloudDownloadOutlined,
  CloudServerOutlined,
  CaretDownOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import Mock from 'mockjs';

import 'antd/dist/antd.min.css';
import '@antv/graphin/dist/index.css';
import './plugins';

import '../mock/flow.mock';
import '../mock/activity.mock';
import '../mock/event.mock';
import '../mock/login.mock';
import '../mock/release.mock';
import '../mock/charts.mock';

Mock.setup({
  timeout: '500-1200',
});

Icon.iconRegister({
  loading: LoadingOutlined,
  edit: EditOutlined,
  download: DownloadOutlined,
  upload: UploadOutlined,
  create: PlusOutlined,
  eye: EyeOutlined,
  delete: DeleteOutlined, // 删除
  copy: CopyOutlined,
  redo: RedoOutlined, // 回退
  logout: LogoutOutlined,
  link: LinkOutlined,
  rocket: RocketOutlined,
  leftSquare: LeftSquareOutlined,

  cloudUpload: CloudUploadOutlined, // 发布
  cloudDownload: CloudDownloadOutlined, // 下线
  audit: AuditOutlined, // 提交审核
  cloudServer: CloudServerOutlined, // 审核
  caretDown: CaretDownOutlined, // 向下三角形
  ellipsis: EllipsisOutlined, // 三点
});
