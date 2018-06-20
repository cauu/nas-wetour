import { observable, action, reaction, runInAction } from 'mobx';
import { listArticles } from '../services/article';

/**
 * @todo 
 * 1. 获取所有artile
 * 2. article详情
 */
export default class ArticleStore {
  @observable articleList = [];

  @action getAllArticles = async () => {
    const articles = await listArticles();

    runInAction('update, articleList', () => {
      this.articleList.replace(articles);
    });
  }
}
