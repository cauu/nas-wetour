import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import {
  Button,
  Toast,
  List,
  ImagePicker,
  InputItem,
  DatePicker,
  Picker,
  TextareaItem,
  Radio,
  WhiteSpace
} from 'antd-mobile';

import './style.less';

const Item = List.Item;
const RadioItem = Radio.RadioItem;

const themes = [
  {value: 'dive', label: '潜水'},
  {value: 'drive', label: '自驾'},
  {value: 'vehicle', label: '拼车'},
  {value: 'room', label: '拼房'},
];

@createForm()
export default class CreatePlan extends PureComponent {
  state = {
    theme: ''
  }

  onThemeChecked = (value) => {
    this.setState(({theme: prevTheme}) => ({
      theme: prevTheme === value ? '' : value
    }));
  }

  onSubmit = () => {
    const { form } = this.props;

    form.validateFields((err, value) => {
      if(err) {
        const errFields = Object.keys(err);
        Toast.fail(err[errFields[0]].errors[0].message, 2);
      }
      /**
       * @todo
       * 将表单内容提交到nas上
       */
    });
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;
    
    return (
      <div className="wt-cp-list-wrapper">
        <List renderHeader={() => '基本信息'}>
          {
            getFieldDecorator('name', {
              rules: [
                {required: true, message: '请输入昵称'}
              ]
            })(
              <InputItem>
                昵称
              </InputItem>
            )
          }
          {
            getFieldDecorator('contact', {
              rules: [{required: true, message: '请输入联系方式(wx/电话)'}]
            })(
              <InputItem>
                联系方式
              </InputItem>
            )
          }
          {
            getFieldDecorator('startAt', {
              rules: [{required: true, message: '请选择出发日期' }]
            })(
              <DatePicker
                mode="date"
                title="请选择出发日期"
              >
                <Item>出发日期</Item>
              </DatePicker>
            )
          }
          {
            getFieldDecorator('endAt', {
              rules: [{required: true, message: '请选择返程日期'}]
            })(
              <DatePicker
                mode="date"
                title="请选择返程日期"
              >
                <Item>返程日期</Item>
              </DatePicker>
            )
          }
        </List>
        <List renderHeader={() => '主题'}>
          {
            themes.map(({value, label}, index) => (
              <RadioItem
                checked={this.state.theme === value}
                onClick={() => this.onThemeChecked(value)}
                key={value}
              >
                {label}
              </RadioItem>
            ))
          }
        </List>
        <List renderHeader={() => '行程详情'}>
          {
            getFieldDecorator('description', {
              rules: [{ required: true, message: '请填写行程介绍' }]
            })(
              <TextareaItem 
                placeholder="简单介绍一下你的行程"
                rows={3}
              />
            )
          }
        </List>

        <List renderHeader={() => '照片'}>
          <ImagePicker style={{padding: '5px 0px'}} />
        </List>

        <WhiteSpace size="lg" />

        <Button onClick={this.onSubmit} type="primary">
          提交
        </Button>
      </div>
    );
  }
}