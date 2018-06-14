import { nebGet } from './common';

async function listArticles() {
  return await nebGet('listArticles', '[]');
}

export {
  listArticles
};