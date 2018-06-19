import {observable, computed, reaction} from 'mobx';
import _ from 'lodash';

import dests from '../constant/dest.json';

/**
 * @todo 
 * 1. 初始化目的地字典
 * 2. 目的地自动完成方法
 * 3. 从text中提取目的地关键字
 */
export default class DestStore {
  destObj = dests;

  destList = Object.keys(dests).map((pyName) => {
    return dests[pyName];
  });

  hotDest = [{
    name: '热门目的地'
  }];

  /**
   * @desc
   * 获取包含关键字的所有地点,并按parent进行分类
   */
  autoCompleteDest = (input) => {
    const hasInput = (text) => text.includes(input);

    return this.destList.filter(({name, children}) => {
      return hasInput(name) || children.filter((c) => hasInput(c.name)).length > 0;
    }).map((dest) => {
      if(hasInput(dest.name)) {
        return dest;
      } else {
        return {
          ...dest,
          children: dest.children.filter((c) => hasInput(c.name))
        };
      }
    });
  }
}
