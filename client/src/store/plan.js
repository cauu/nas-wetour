import { observable, action } from 'mobx';

class Plan {
  @observable planList = [];
}

export default new Plan();
