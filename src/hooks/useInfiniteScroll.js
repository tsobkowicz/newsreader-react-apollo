/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { STORY_INCREMENT, MAX_STRORIES } from '../constants';
import { debounce } from '../utils/debounce';

export const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENT);

  const handleScroll = debounce(() => {
    // if user has scrolled to the bottom of the page
    const scrollDistToBottom = Math.floor(
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop)
    );
    if (scrollDistToBottom > 5 || loading) {
      return false;
    }

    setLoading(true);
  }, 300);

  useEffect(() => {
    if (!loading) return;

    if (count + STORY_INCREMENT >= MAX_STRORIES) {
      setCount(MAX_STRORIES);
    } else {
      setCount(count + STORY_INCREMENT);
    }

    setLoading(false);
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { count };
};
