import React from 'react';

const ArticleItem = ({article, onClick}) => (
  <div className="al-item" onClick={onClick}>
    <div className="cover">
      <div className="title">{article.title}</div>
      <div className="btn"></div>
    </div>
  </div>
  );

export default ({articles = [], history}) => (
  <div className="wt-article-list">
    {articles.map((article) => (
      <ArticleItem onClick={() => history.push(`/plan/article/${article.id}`)} article={article}/>
    ))}
  </div>
);