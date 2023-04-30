export function cleanUrl(url) {
  if (url) {
    // remove https://opensea.io/assets/ and locales from token
    const regex = /https:\/\/opensea.io\/assets\/([a-z]{2}\/)?/g;
    const tokenString = url.trim().replace(regex, '').split('?')[0];
    return tokenString;
  }
  return null;
}
