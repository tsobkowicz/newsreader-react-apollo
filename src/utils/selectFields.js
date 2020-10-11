// if pass sth that's undefined, defaults it as empty object
export const selectFields = ({ id, by, url, time, title } = {}) => ({
  id,
  by,
  url,
  time,
  title,
});
