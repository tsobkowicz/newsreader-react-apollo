/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  ArticleMeta,
  ArticleMetaElement,
  ArticleTitle,
  ArticleWrapper,
} from '../styles/ArticleStyles';
import { mapTime } from '../mappers/mapTime';

export const Article = memo(function Article({ article }) {
  return (
    <ArticleWrapper data-testid="Article">
      <ArticleTitle>
        <a href={article.url}>{article.title}</a>
      </ArticleTitle>
      <ArticleMeta>
        <span data-testid="article-by">
          <ArticleMetaElement color="#000">By:</ArticleMetaElement>{' '}
          {article.author}
        </span>
        <span data-testid="article-time">
          <ArticleMetaElement color="#000">Posted:</ArticleMetaElement>{' '}
          {mapTime(article.time)}
        </span>
      </ArticleMeta>
    </ArticleWrapper>
  );
});

Article.propTypes = {
  article: PropTypes.object.isRequired,
};
