import React from 'react';
import { useModel, useIntl } from 'umi';

// 提供 权限 和 国际化 控制 （umi3权限和国际化采用hooks写法，class组件不能直接使用）
export default Com => {
  return props => {
    const { initialState } = useModel('@@initialState');

    const { currentUser = 'none' } = initialState;
    const intl = useIntl();
    const { formatMessage } = intl;

    return (
      <Com currentUser={currentUser} formatMessage={formatMessage} {...props} />
    );
  };
};
