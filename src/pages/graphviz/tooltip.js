import React from 'react';

export default class GraphTooltip extends React.Component {
  render() {
    const { x, y, children } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          background: '#fff',
          boxShadow: '2px 0 6px rgba(0,21,41,.35)',
          padding: 24,
          borderRadius: 2,
        }}
      >
        {children}
      </div>
    );
  }
}
