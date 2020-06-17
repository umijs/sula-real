import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = TimePicker;

export default class TimeRangePicker extends React.Component {
  onFormatChange = (time, timeString) => {
    const { valueFormat, onChange } = this.props;
    let finalTime = time || [];

    finalTime = finalTime.map((t, i) => {
      let finalT;
      if (valueFormat === 'utc') {
        finalT = t ? t.valueOf() : null;
      } else {
        finalT = timeString[i];
      }
      return finalT;
    });

    if (onChange) {
      onChange(finalTime, timeString);
    }
  };
  render() {
    const { valueFormat, value, ...restProps } = this.props;
    let finalValue = value;
    if (value) {
      finalValue = value.map(v => {
        if (valueFormat === true) {
          return moment(v, restProps.format);
        } else {
          return moment(v);
        }
      });
    }
    return (
      <RangePicker
        {...restProps}
        {...(valueFormat ? { onChange: this.onFormatChange } : {})}
        value={finalValue}
      />
    );
  }
}
