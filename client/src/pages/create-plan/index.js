import React, { PureComponent } from 'react';
import moment from 'moment';
import { createForm } from 'rc-form';
import { Fill } from 'react-slot-fill';
import {
  Button,
  Toast,
  ActivityIndicator,
  List,
  ImagePicker,
  InputItem,
  DatePicker,
  Picker,
  TextareaItem,
  Radio,
  WhiteSpace
} from 'antd-mobile';

import { uploadImg } from '../../services/upload';
import { createPlan } from '../../services/plan';
import { extractDests } from '../../utils';

import './style.less';

const Item = List.Item;
const RadioItem = Radio.RadioItem;

const themes = [
  {value: 'boat', label: '拼船'},
  {value: 'vehicle', label: '拼车'},
  {value: 'house', label: '拼房'},
];

@createForm()
export default class CreatePlan extends PureComponent {
  state = {
    theme: '',
    loading: false,
    files: []
  }

  onThemeChecked = (value) => {
    this.setState(({theme: prevTheme}) => ({
      theme: prevTheme === value ? '' : value
    }));
  }

  onImgPick = async (files, type, index) => {
    if(files.length < this.state.files.length) {
      this.setState({
        files
      });
      return;
    }
    const newFile = files && files.length && files[files.length - 1];
    const uploaded = await uploadImg(newFile.file, newFile.name, (res) => {console.log('uploading', res)});
    this.setState({
      files: [
        ...files.slice(0, files.length - 1),
        {...files[files.length - 1], url: 'http://paga738og.bkt.clouddn.com/' + uploaded.key}
      ]
    });
  }

  onSubmit = () => {
    const { form } = this.props;

    form.validateFields(async (err, value) => {
      if(err) {
        const errFields = Object.keys(err);
        Toast.fail(err[errFields[0]].errors[0].message, 2);
        return;
      }

      this.setState({
        loading: true
      });

      try {
        const result = await createPlan(
          value.title,
          value.name,
          value.contact,
          value.gender,
          moment(value.startAt).format('YYYY-MM-DD'),
          moment(value.endAt).format('YYYY-MM-DD'),
          value.desc,
          extractDests(value.desc).join(',') || '',
          this.state.theme,
          this.state.files.map((f) => f.url).join(',')
        );

        this.setState({
          loading: false
        }, () => {
          Toast.success('行程创建成功', 5, () => {}, true);
        });
      } catch(e) {
        this.setState({
          loading: false
        });
      }
    });
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    return (
      <div className="wt-cp-list-wrapper">
        <ActivityIndicator animating={this.state.loading} toast text="正在提交" />
        <Fill name="TitleBar.Title">
          <div>创建行程</div>
        </Fill>
        <List renderHeader={() => '基本信息'}>
          {
            getFieldDecorator('title', {
              rules: [
                {required: true, message: '请输入行程标题'}
              ]
            })(
              <InputItem placeholder="如:澳洲2日游">
                标题
              </InputItem>
            )
          }
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
              <InputItem placeholder="电话或微信(如tel123/wx321)">
                联系方式
              </InputItem>
            )
          }
          {
            getFieldDecorator('gender', {
              initialValue: ['f'],
              rules: [{required: true, message: '请输入你的性别'}]
            })(
              <Picker
                data={[{label: '女', value: 'f'}, {label: '男', value: 'm'}]}
                title="选择性别"
              >
                <List.Item arrow="horizontal">性别</List.Item>
              </Picker>
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
            getFieldDecorator('desc', {
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
          <ImagePicker
            files={this.state.files}
            style={{padding: '5px 0px'}}
            onChange={this.onImgPick}
          />
        </List>

        <WhiteSpace size="lg" />

        <Button onClick={this.onSubmit} type="primary">
          提交
        </Button>
      </div>
    );
  }
}