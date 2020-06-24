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
  EllipsisOutlined,
} from '@ant-design/icons';
import Mock from 'mockjs';

import 'antd/dist/antd.min.css';
import './plugins';

import '../mock/index.mock';

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
  delete: DeleteOutlined,
  copy: CopyOutlined,
  redo: RedoOutlined,
  logout: LogoutOutlined,
  link: LinkOutlined,
  rocket: RocketOutlined,
  leftSquare: LeftSquareOutlined,

  cloudUpload: CloudUploadOutlined,
  cloudDownload: CloudDownloadOutlined,
  audit: AuditOutlined,
  cloudServer: CloudServerOutlined,
  caretDown: CaretDownOutlined,
  ellipsis: EllipsisOutlined,
});
