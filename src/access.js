// 权限设置 https://umijs.org/zh-CN/plugins/plugin-access
export default function(initialState) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser === 'admin',
  };
}
