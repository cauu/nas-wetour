import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Fill } from 'react-slot-fill';

import './style.less';

@inject('articleStore')
@observer
export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);

    const { id } = props.match.params;
    this.props.articleStore.getArticleById(id);
  }
  render() {
    const { currArticle } = this.props.articleStore;
    return (
      <div className="article-detail-wrapper">
        <div className="title">
          {currArticle.title}
        </div>
        <div className="author">
          {`作者: ${currArticle.author}`}
        </div>
        <div dangerouslySetInnerHTML={{__html: currArticle.content}} className="content">
        </div>
      </div>
    );
  }
}