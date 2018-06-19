import PlanStore from './plan';
import ArticleStore from './article';
import DestStore from './dest';

// export default class RootStore {
//   @observable planStore = new PlanStore();
//   @observable articleStore = new ArticleStore();
//   @observable destStore = new DestStore();
// }

const store = {
  planStore: new PlanStore(),
  articleStore: new ArticleStore(),
  destStore: new DestStore()
};

export default store;