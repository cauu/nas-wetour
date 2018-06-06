import React, { PureComponent } from 'react';
import {
  ImagePicker,
  InputItem,
  DatePicker,
  Picker,
  TextareaItem
} from 'antd-mobile';

export default class CreatePlan extends PureComponent {
  render() {
    return (
      <div>
        <ImagePicker />
        <InputItem />
        <DatePicker />
        <Picker />
        <TextareaItem />
      </div>
    );
  }
}