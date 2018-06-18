import {observable, computed, reaction} from 'mobx';

export default class DestStore {
  @observable dests = [];
}
