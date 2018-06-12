import { callGet } from './common';

async function listArticles() {
  return await callGet('listArticles', []);
}

export {
  listArticles
};