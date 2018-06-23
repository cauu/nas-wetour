import { observable, action, reaction, runInAction } from 'mobx';
import showdown from 'showdown';

import { listArticles, getArticleById } from '../services/article';

const converter = new showdown.Converter();

/**
 * @todo 
 * 1. 获取所有artile
 * 2. article详情
 */
export default class ArticleStore {
  @observable articleList = [];
  @observable currArticle = {};
  @observable isLoading = false;

  @action getAllArticles = async () => {
    this.isLoading = true;

    this.articleList = [];

    const articles = await listArticles();

    this.isLoading = false;

    runInAction('update, articleList', () => {
      this.articleList.replace(articles);
    });
  }

  @action getArticleById = async (id) => {
    this.isLoading = true;

    this.currArticle = {};

    const article = await getArticleById(id);

    this.isLoading = false;

    runInAction('update currArticle', () => {
      this.currArticle = article && {
        ...article,
        content: converter.makeHtml(article.content)
      } || {};
    });
  }
}
