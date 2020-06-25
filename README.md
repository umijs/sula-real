# sula-real

## 特点

- 💻 真实还原开发场景，贴近项目开发代码，非理想才最 real
- 🚀 选取前端中台最典型场景开发，基于 sula-templates 高效开发
- 🥗 除 [sula](https://github.com/umijs/sula-real) 外，仅依赖 [@umijs/preset-react](https://umijs.org/plugins/preset-react) 和 [@ant-design/pro-layout](https://github.com/ant-design/ant-design-pro-layout)


## 主题

```js
import { IrisBlue } from './theme';

export default {
  theme: IrisBlue
};
```

<table>
  <tbody>
    <tr>
      <td align="center">
        <a target="_blank" href="https://img.alicdn.com/tfs/TB1fHnUb_M11u4jSZPxXXahcXXa-2876-1414.png">
          <img
            width="256"
            src="https://img.alicdn.com/tfs/TB1fHnUb_M11u4jSZPxXXahcXXa-2876-1414.png"
          />
          <br>
          <strong>IrisBlue</strong>
        </a>
      </td>
    </tr>
  </tbody>
</table>


## 启动

```bash
$ mkdir real-demo

$ cd real-demo

// cnpm i -g degit
$ degit https://github.com/umijs/sula-real.git

$ npm i

$ npm start
```


## 目录

各页面特点

### 登录

Username:  admin(admin权限) or  任意值(其他权限)

password： sula


<img src="https://img.alicdn.com/tfs/TB1NeEYbqNj0u4jSZFyXXXgMVXa-1354-800.png" alt="login" style="zoom:33%;" />


### 图表

基于sula-charts开发的dashboard页面

<img src="https://img.alicdn.com/tfs/TB1xSwxKKT2gK0jSZFvXXXnFXXa-2774-1962.png" alt="charts" style="zoom:20%;" />


### 事件页

#### 列表页

1. 高级搜索 + 上传下载功能 + 按钮权限
2. 弹框表单

<img src="https://img.alicdn.com/tfs/TB1ZiksKHH1gK0jSZFwXXc7aXXa-2418-1558.png" alt="事件列表" style="zoom: 20%;" />

#### 详情页

1. 标签详情页

<img src="https://img.alicdn.com/tfs/TB1PX3mKHr1gK0jSZR0XXbP8XXa-2424-890.png" alt="事件详情" style="zoom:20%;" />

### 流程页

#### 列表页

1. 初始搜索条件
2. 初始分页设置
3. 状态操作组件

<img src="https://img.alicdn.com/tfs/TB1t0ItKUY1gK0jSZFCXXcwqXXa-2426-1544.png" alt="流程列表" style="zoom: 20%;" />

#### 表单页

1. 分组卡片布局
2. 表单远程数据源关联
3. 图片上传
4. 启动编辑按钮

<div>
<img src="https://img.alicdn.com/tfs/TB1v2ZNcj39YK4jSZPcXXXrUFXa-2414-1574.png" alt="流程表单 " style="zoom:20%;" />
</div>

#### 详情页

1. 自定义底部按钮

<img src="https://img.alicdn.com/tfs/TB1BY1RaI4z2K4jSZKPXXXAYpXa-2442-1556.png" alt="image-20200617163655416 " style="zoom:20%;" />

### 活动页

#### 列表页

1. 批量删除
2. 下拉菜单收起操作按钮
3. 搜索条件同步url
4. 过滤插件

<img src="https://img.alicdn.com/tfs/TB1HvEzKKT2gK0jSZFvXXXnFXXa-2426-1488.png" alt="活动列表" style="zoom: 25%;" />

#### 表单页

1. 分步表单
2. 日期插件
3. 表单关联控制 / 组关联
4. 表单任意布局
5. 自定义容器组件

<img src="https://img.alicdn.com/tfs/TB1jPEDKKT2gK0jSZFvXXXnFXXa-2436-1118.png" alt="活动列表" style="zoom: 25%;" />

#### 详情页

1. 分组卡片展示



### 发布页

#### 列表页

1. 分步搜索列表
2. 抽屉表单

<img src="https://img.alicdn.com/tfs/TB1IPImKFY7gK0jSZKzXXaikpXa-2428-1536.png" alt="ste p" style="zoom: 20%;" />

<img src="https://img.alicdn.com/tfs/TB1vuouKUY1gK0jSZFCXXcwqXXa-2470-1820.png" alt="抽屉表单 " style="zoom:20%;" />