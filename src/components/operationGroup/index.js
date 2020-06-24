import React from 'react';
import { Space } from 'antd';
import { triggerRenderPlugin } from 'sula/es/rope/triggerPlugin';
import Dropdown from '@/components/dropdown';

function arrCut(arr, cutLength) {
  const arrLength = arr.length;
  let arrBefore = [];
  let arrAfter = [];
  if (arrLength > cutLength) {
    arrBefore = arr.slice(0, cutLength - 1);
    arrAfter = arr.slice(cutLength - 1, arrLength);
  } else {
    arrBefore = [...arr];
  }
  return {
    arrBefore,
    arrAfter,
  };
}

class OperationGroup extends React.Component {
  renderOperating = () => {
    const { config, ctx } = this.props;
    const { actionsRender, max = 4 } = config;
    const renders = actionsRender
      .filter((c) => {
        const { visible } = c || {};
        return !(visible === false);
      })
      .map(({ funcProps, ...others }) => {
        const { visible, ...funcPropsOthers } = funcProps || {};
        return {
          ...funcPropsOthers,
          ...others,
        };
      });

    if (Array.isArray(renders) && renders.length > 0) {
      const { arrBefore, arrAfter } = arrCut(renders, max);
      let arrAfterRender = null;
      const arrBeforeRender = arrBefore.map((item, idx) => {
        return triggerRenderPlugin(ctx, Object.assign({}, item, { key: idx }));
      });

      let finalAfterRender;
      if (arrAfter.length > 0) {
        finalAfterRender = arrAfter.map((c, idx) => {
          const {
            text,
            tooltip,
            confirm,
            props: { type, style },
            action = [],
            ...others
          } = c || {};
          const finalConfig = {
            ...others,
            type: 'button',
            confirm,
            props: {
              key: idx,
              children: text,
              icon: type,
              type: 'text',
              style: {
                paddingLeft: 0,
                ...style,
              },
            },
            action,
          };
          return finalConfig;
        });

        arrAfterRender = (
          <Dropdown
            ctx={ctx}
            config={{ render: finalAfterRender }}
            key={ctx.record.id}
          />
        );
      }
      return [arrBeforeRender, arrAfterRender];
    }
  };

  render() {
    const {
      config: { props = {}, spaceSize = 'small' },
    } = this.props;
    return (
      <Space size={spaceSize} style={props.style || {}}>
        {this.renderOperating()}
      </Space>
    );
  }
}

export default OperationGroup;
