import React from 'react';

import Loading from '../../../components/loading';

const defaultCover = 'http://paga738og.bkt.clouddn.com/image/nas-wetour/article-cover-2.jpg%21p5';

const ArticleItem = ({article, onClick}) => (
  <div className="al-item" onClick={onClick}>
    <div className="cover">
      <img src={article.cover || defaultCover} />
      <div className="title">{article.title}</div>
      <div className="btn"></div>
    </div>
  </div>
  );

export default ({articles = [], history, loading}) => (
  <div className="wt-article-list">
    {articles.map((article) => (
      <ArticleItem onClick={() => history.push(`/plan/article/${article.id}`)} article={article}/>
    ))}
    <Loading loading={loading} />
  </div>
);