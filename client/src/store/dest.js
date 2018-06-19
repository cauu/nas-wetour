import {observable, computed, reaction} from 'mobx';
import _ from 'lodash';

import dests from '../constant/dest.json';

/**
 * @todo 
 * 1. 初始化目的地字典
 * 2. 目的地自动完成方法
 * 3. 从text中提取目的地关键字
 * 4. 区分国内和国外景点
 */
export default class DestStore {
  @observable destObj = dests;
  @observable destList = _.flatten(
    Object.keys(dests).map((pyName) => {
      return [{...dests[pyName]}].concat(dests[pyName].children);
    })
  );

  autoCompleteDest = (input) => {
    return this.destList.filter(({ pyName, name }) => (pyName.includes(input) || name.includes(input)));
  }
}
