import { nebGet } from './common';

async function listArticles() {
  return await nebGet('listArticles', '[]');
}

async function getArticleById(id) {
  return await nebGet('getArticleById', `["${id}"]`);
}

export {
  listArticles,
  getArticleById
};