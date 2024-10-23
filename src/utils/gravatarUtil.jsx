// helpers/gravatar.js
import md5 from 'md5';

export const getGravatarUrl = (email, size = 200) => {
  if (!email) return null;
  const hash = md5(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};
