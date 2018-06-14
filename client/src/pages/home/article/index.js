import React from 'react';

const ArticleItem = ({article}) => (
  <div className="al-item">
    <div className="cover">
      <div className="title">{article.title}</div>
      <div className="btn"></div>
    </div>
  </div>
  );

export default ({articles = []}) => (
  <div className="wt-article-list">
    {articles.map((article) => (
      <ArticleItem article={article}/>
    ))}
  </div>
);