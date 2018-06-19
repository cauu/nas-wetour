import {observable, computed, reaction} from 'mobx';

/**
 * @todo 
 * 1. 初始化目的地字典
 * 2. 目的地自动完成方法
 * 3. 从text中提取目的地关键字
 */
export default class DestStore {
  @observable dests = [];
}
