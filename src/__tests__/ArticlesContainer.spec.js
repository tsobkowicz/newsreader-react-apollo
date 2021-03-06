import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ArticlesContainer } from '../containers/ArticlesContainer';
import { allArticles, noArticles } from '../fixtures';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';
import { GET_ALL_ARTICLES } from '../graphql/get-all-articles';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../hooks/useInfiniteScroll.js');

test('renders the <ArticlesContainer /> with articles', async () => {
  const allArticlesMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES,
      },
      result: {
        data: {
          ...allArticles,
        },
      },
    },
  ];

  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));

  const { getByText, queryByTestId } = render(
    <MockedProvider mocks={allArticlesMocks}>
      <ArticlesContainer />
    </MockedProvider>
  );
  await waitForElement(() => [
    expect(getByText('News Stories')).toBeTruthy(),
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('article-author').textContent).toEqual(
      'Author: Tom S'
    ),
  ]);
});

test('no render articles when there is no articles', async () => {
  const noArticlesMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES,
      },
      result: {
        data: {
          ...noArticles,
        },
      },
    },
  ];

  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));

  const { queryByText, queryByTestId } = render(
    <MockedProvider mocks={noArticlesMocks}>
      <ArticlesContainer />
    </MockedProvider>
  );
  await waitForElement(() => [
    expect(queryByText('News Stories')).toBeTruthy(),
    expect(queryByText('Tarnished: Google Responds')).toBeFalsy(),
    expect(queryByTestId('article-author')).toBeFalsy(),
  ]);
});
