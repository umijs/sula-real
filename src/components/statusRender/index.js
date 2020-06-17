import React from 'react';
import OperationGroup from '../operationGroup';
import StatusView from '../statusView';

import './index.less'

class StatusRender extends React.Component {

  render() {
    const { config } = this.props;
    return (
      <div className="statusBox">
        <StatusView {...config.props}/>
        <OperationGroup {...this.props}/>
      </div>
    );
  }
}

export default StatusRender;
